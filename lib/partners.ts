import { readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

/**
 * Clientes, administradoras, bordados e fornecedores lidos direto das pastas
 * em `public/`.
 *
 * Para incluir uma foto ou um logo, basta soltar o arquivo em
 * `public/clientes/`, `public/administradoras/`, `public/bordados/` ou
 * `public/fornecedores/` e refazer
 * o build — nenhuma linha de código muda. A ordem segue o nome do arquivo.
 *
 * ⚠️ Usa `node:fs` e `sharp` — só pode ser chamado de Server Component.
 */

export interface PartnerImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const IMAGENS = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Nome de cada fornecedor, para o texto alternativo do logo. Alguns arquivos
 * têm nome sem sentido (ex.: um código), por isso o nome vem daqui. Arquivo
 * novo sem entrada aqui usa o próprio nome do arquivo.
 */
const NOMES_FORNECEDORES: Record<string, string> = {
  "0cc9f33a-232a-479c-aade-72c4c6d35e86.png": "Santanense",
  "2d894ae6-3858-4851-adef-afb12d9db2a1.png": "Santista Têxtil",
  "Cedro_logo04-05-1.png": "Cedro Têxtil",
  "mariano.png": "Mariano Calçados de Segurança",
  "valença.png": "Valença",
  "wedgesoftworks-1448932011.png": "Soft Works",
};

/** Mesmo papel de `NOMES_FORNECEDORES`, para as administradoras parceiras. */
const NOMES_ADMINISTRADORAS: Record<string, string> = {
  "casa2-2.png": "Casa+ Administradora de Condomínios",
  "gente-5-600x600.png": "Gente Administração de Condomínios",
  "gw-4.png": "GW Administração de Condomínios",
  "logo-opala2-3.png": "Opala Administradora de Condomínios",
  "ouro-velho-5.png": "Ouro Velho Administradora",
  "pacto.png": "Pacto Administradora",
  "prosind2-2.png": "Prosind Condomínios",
};

function nomeDoArquivo(file: string) {
  return file
    .replace(IMAGENS, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

async function lerPasta(
  pasta: string,
  alt: (file: string, index: number) => string,
): Promise<PartnerImage[]> {
  const dir = path.join(process.cwd(), "public", pasta);

  let files: string[];
  try {
    files = (await readdir(dir)).filter((file) => IMAGENS.test(file)).sort();
  } catch {
    // pasta ausente: a seção simplesmente não mostra esse bloco
    return [];
  }

  return Promise.all(
    files.map(async (file, index) => {
      const { width = 600, height = 450 } = await sharp(path.join(dir, file)).metadata();

      return {
        // nomes com acento/espaço (ex.: "valença.png") precisam ir codificados na URL
        src: `/${pasta}/${encodeURIComponent(file)}`,
        width,
        height,
        alt: alt(file, index),
      };
    }),
  );
}

/** Fotos dos condomínios atendidos (`public/clientes/`). */
export function getClientPhotos() {
  return lerPasta("clientes", (_file, index) => `Condomínio atendido pela RBS Uniformes — foto ${index + 1}`);
}

/** Logos das administradoras parceiras (`public/administradoras/`). */
export function getAdministrators() {
  return lerPasta(
    "administradoras",
    (file) => `Logo ${NOMES_ADMINISTRADORAS[file] ?? nomeDoArquivo(file)}`,
  );
}

/** Matrizes de bordado já produzidas (`public/bordados/`). */
export function getEmbroideryPhotos() {
  return lerPasta("bordados", (_file, index) => `Matriz de bordado computadorizado — exemplo ${index + 1}`);
}

/** Logos dos fornecedores (`public/fornecedores/`). */
export function getSuppliers() {
  return lerPasta(
    "fornecedores",
    (file) => `Logo ${NOMES_FORNECEDORES[file] ?? nomeDoArquivo(file)}`,
  );
}
