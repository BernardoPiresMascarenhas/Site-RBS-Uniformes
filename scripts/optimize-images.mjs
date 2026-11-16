#!/usr/bin/env node
/**
 * Gera, no build, as variantes responsivas das imagens do site.
 *
 *   npm run images        (também roda sozinho em `prebuild` e `predev`)
 *
 * Por que existe: o site rodava as fotos pelo Image Optimization da Vercel
 * (`/_next/image`), que cobra por transformação e estourou o limite do plano.
 * Aqui as variantes são geradas uma vez, com `sharp`, e servidas como arquivos
 * estáticos de `public/_img/` — o componente `Photo` monta o `srcset` com elas.
 *
 * O que faz:
 *  1. Descobre as imagens em uso: varre `app/`, `components/` e `lib/` atrás de
 *     caminhos de imagem e lê as pastas que o site lista sozinho (clientes,
 *     bordados, administradoras, fornecedores). Imagens sem uso não são
 *     processadas.
 *  2. Para cada uma, gera só as larguras necessárias para o grupo dela, nunca
 *     acima da resolução original (sem ampliar).
 *  3. Escreve `lib/generated/image-manifest.json` (original → hash + larguras).
 *
 * Os originais em `public/` nunca são alterados nem apagados. Tudo que este
 * script gera (`public/_img/`, o manifesto e o cache) está no `.gitignore`.
 * O cache em `.next/cache` é reaproveitado pela Vercel entre deploys, então
 * só imagens novas ou alteradas são reprocessadas.
 */
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { IMG_DIR, stem } from "../lib/image-path.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, IMG_DIR);
const CACHE = path.join(ROOT, ".next", "cache", "rbs-images");
const MANIFEST = path.join(ROOT, "lib", "generated", "image-manifest.json");

/** Muda quando a receita de compressão muda — invalida o cache e os hashes. */
const RECIPE = "1";

/**
 * Receita de cada grupo de imagens. `ladder` são as larguras candidatas; a
 * maior variante é sempre a largura original (ou `cap`, se menor) e as
 * candidatas acima dela são descartadas, então nada é ampliado.
 * A qualidade é por grupo, escolhida comparando com o original (ver relatório).
 */
const GROUPS = {
  // fotos de produto já em WebP: estágio grande (até ~710 px × DPR), miniaturas e
  // carrossel. A variante do tamanho original é o próprio arquivo, sem recomprimir
  // AVIF na frente (q80 empata ou ganha do WebP q90 em cor, textura e nitidez, com ~20% menos bytes)
  produto: {
    ladder: [480, 640, 750, 1080],
    webp: { quality: 90, effort: 5, smartSubsample: true },
    avif: { quality: 80, effort: 4 },
    keepWebp: true,
  },
  // as poucas fotos de produto que ainda são PNG: qualidade maior, porque o PNG
  // tem cor saturada e o WebP perde um pouco de croma
  produtoPng: {
    ladder: [480, 640, 750, 1080],
    webp: { quality: 94, effort: 5, smartSubsample: true },
    avif: { quality: 80, effort: 4 },
  },
  // fundo escuro e liso — a parte mais sensível a faixas e manchas. AVIF no mesmo
  // nível do que rodava antes (q77), com WebP de alta qualidade para quem não tem AVIF
  hero: {
    ladder: [640, 960, 1280],
    webp: { quality: 95, effort: 6, smartSubsample: true },
    avif: { quality: 78, effort: 6 },
  },
  // cartelas de cor: bordas nítidas entre áreas chapadas. O WebP subamostra a cor
  // e borra essas bordas, então o AVIF (cor inteira) vai na frente e o WebP fica de reserva
  cartela: {
    ladder: [480, 640, 828, 1080],
    webp: { quality: 90, effort: 6, smartSubsample: true },
    avif: { quality: 72, effort: 6 },
  },
  // logo da marca: exibida a ~100–170 px, então nunca passa de 512 px.
  // Quase sem perdas: o WebP comum borra o contorno do desenho
  marca: { ladder: [160, 256, 320, 384], cap: 512, webp: { nearLossless: true, quality: 60, effort: 6 } },
  // foto "Sobre"
  editorial: { ladder: [480, 640, 828], webp: { quality: 94, effort: 5, smartSubsample: true } },
  // fotos de celular dos clientes e matrizes de bordado (JPEG pequeno)
  foto: { ladder: [320, 480, 640, 800], webp: { quality: 88, effort: 5, smartSubsample: true } },
  // logos de parceiros: pequenos, com transparência, bordas nítidas
  logo: { ladder: [160, 320], webp: { lossless: true, effort: 6 } },
};

/**
 * Imagens que devem ficar só em WebP, mesmo no grupo com AVIF (caminho em `public/`).
 * Use se a comparação visual mostrar perda do AVIF numa foto específica.
 */
const WEBP_ONLY = new Set([]);

function groupFor(publicPath, format) {
  if (publicPath.startsWith("/produtos/")) return format === "webp" ? "produto" : "produtoPng";
  if (publicPath.startsWith("/hero/")) return "hero";
  if (publicPath.startsWith("/cor/")) return "cartela";
  if (publicPath.startsWith("/administradoras/") || publicPath.startsWith("/fornecedores/")) return "logo";
  if (publicPath.startsWith("/clientes/") || publicPath.startsWith("/bordados/")) return "foto";
  if (publicPath.startsWith("/logopremium")) return "marca";
  return "editorial";
}

const IMAGE_RE = /\.(png|jpe?g|webp|avif)$/i;
// mesma tolerância de `lib/photos.ts`: vale o nome do arquivo, não a extensão declarada
const EXTENSIONS = [".webp", ".avif", ".jpeg", ".jpg", ".png"];
/** Pastas que o site lista com `readdir` (ver `lib/partners.ts`). */
const LISTED_DIRS = ["clientes", "administradoras", "bordados", "fornecedores"];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return nested.flat();
}

/** Caminhos de imagem citados no código, já resolvidos para arquivos que existem em `public/`. */
async function findUsedImages() {
  const used = new Set();
  const literal = /["'`](\/[^"'`\s$]+?\.(?:png|jpe?g|webp|avif))["'`]/gi;

  for (const dir of ["app", "components", "lib"]) {
    const files = (await walk(path.join(ROOT, dir))).filter((file) => /\.(tsx?|mjs|jsx?)$/.test(file));
    for (const file of files) {
      const code = await readFile(file, "utf8");
      for (const match of code.matchAll(literal)) {
        const declared = match[1];
        if (declared.startsWith(`/${IMG_DIR}/`)) continue;
        const base = declared.replace(/\.[^./]+$/, "");
        const found = [declared, ...EXTENSIONS.map((ext) => base + ext)].find((candidate) =>
          existsSync(path.join(PUBLIC, candidate)),
        );
        if (found) used.add(found);
      }
    }
  }

  for (const dir of LISTED_DIRS) {
    const folder = path.join(PUBLIC, dir);
    if (!existsSync(folder)) continue;
    for (const file of await readdir(folder)) {
      if (IMAGE_RE.test(file)) used.add(`/${dir}/${file}`);
    }
  }

  return [...used].sort();
}

/** Larguras a gerar: as candidatas abaixo do original e o próprio original (ou `cap`). */
function widthsFor(group, sourceWidth) {
  const top = Math.min(sourceWidth, group.cap ?? sourceWidth);
  // candidata a menos de 8% do topo é redundante
  const below = group.ladder.filter((width) => width < top && top - width > top * 0.08);
  return [...below, top];
}

async function ensureVariant({ source, group, meta, width, target, format }) {
  const cached = path.join(CACHE, path.basename(target));
  if (!existsSync(cached)) {
    await mkdir(CACHE, { recursive: true });
    const isOriginalSize = width === meta.width;
    if (format === "webp" && isOriginalSize && meta.format === "webp" && group.keepWebp) {
      // já é WebP na resolução pedida: usa o arquivo como está, sem recomprimir
      await copyFile(source, cached);
    } else {
      const resized = sharp(source).resize({ width, withoutEnlargement: true, kernel: "lanczos3" });
      await (format === "avif" ? resized.avif(group.avif) : resized.webp(group.webp)).toFile(cached);
    }
  }
  await mkdir(path.dirname(target), { recursive: true });
  const same = existsSync(target) && (await stat(target)).size === (await stat(cached)).size;
  if (!same) await copyFile(cached, target);
  return (await stat(target)).size;
}

async function pool(items, size, worker) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (queue.length) await worker(queue.shift());
    }),
  );
}

async function main() {
  const started = Date.now();
  const images = await findUsedImages();
  const manifest = {};
  const expected = new Set();
  const report = { originals: 0, files: { webp: 0, avif: 0 }, bytes: 0, originalBytes: 0 };

  await pool(images, 4, async (publicPath) => {
    const source = path.join(PUBLIC, publicPath);
    const buffer = await readFile(source);
    const meta = await sharp(buffer).metadata();
    const group = GROUPS[groupFor(publicPath, meta.format)];
    if (!meta.width) throw new Error(`Sem largura: ${publicPath}`);

    const hash = createHash("sha1")
      .update(RECIPE)
      .update(JSON.stringify(group))
      .update(buffer)
      .digest("hex")
      .slice(0, 8);
    const widths = widthsFor(group, meta.width);

    const withAvif = group.avif && !WEBP_ONLY.has(decodeURIComponent(publicPath));
    const formats = withAvif ? ["webp", "avif"] : ["webp"];
    for (const format of formats) {
      for (const width of widths) {
        const target = path.join(OUT, `${stem(publicPath)}.${hash}-${width}.${format}`);
        expected.add(path.relative(OUT, target));
        const size = await ensureVariant({ source, group, meta: { width: meta.width, format: meta.format }, width, target, format });
        report.files[format] += 1;
        report.bytes += size;
      }
    }

    // 3º item: existe também a versão AVIF — o `Photo` monta um `<picture>`
    manifest[decodeURIComponent(publicPath)] = withAvif ? [hash, widths, 1] : [hash, widths];
    report.originals += 1;
    report.originalBytes += buffer.length;
  });

  // remove variantes de imagens que não existem mais ou mudaram
  if (existsSync(OUT)) {
    for (const file of await walk(OUT)) {
      if (!expected.has(path.relative(OUT, file))) await rm(file);
    }
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  const json = `${JSON.stringify(sorted)}\n`;
  await mkdir(path.dirname(MANIFEST), { recursive: true });
  const previous = existsSync(MANIFEST) ? await readFile(MANIFEST, "utf8") : "";
  if (previous !== json) await writeFile(MANIFEST, json);

  const mb = (bytes) => (bytes / 1048576).toFixed(1);
  console.log(
    `[images] ${report.originals} originais → ${report.files.webp} variantes WebP + ${report.files.avif} AVIF em public/${IMG_DIR}/ ` +
      `(${mb(report.bytes)} MB; originais: ${mb(report.originalBytes)} MB) em ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
}

main().catch((error) => {
  console.error("[images] falhou:", error);
  process.exit(1);
});
