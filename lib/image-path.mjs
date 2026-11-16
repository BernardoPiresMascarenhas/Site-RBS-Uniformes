/**
 * Convenção de nomes das imagens geradas — compartilhada entre o script de
 * build (`scripts/optimize-images.mjs`) e o componente `Photo`, para os dois
 * sempre chegarem na mesma URL.
 *
 * Cada imagem de `public/` vira `public/_img/<pasta>/<nome>.<hash>-<largura>.<ext>`.
 * O hash muda quando o arquivo original (ou a receita de compressão) muda, então
 * os arquivos podem ser servidos como `immutable` sem risco de cache velho.
 */

export const IMG_DIR = "_img";

/** Nome seguro para URL: minúsculo, sem acento, só `a-z 0-9 . _ -`. */
export function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** `/produtos/Camisa Polo.webp` → `produtos/camisa-polo` (pasta preservada, sem extensão). */
export function stem(publicPath) {
  const clean = publicPath.replace(/^\/+/, "").replace(/\.[^./]+$/, "");
  return clean.split("/").map(slugify).join("/");
}

/** URL de uma variante gerada. */
export function variantUrl(publicPath, hash, width, ext = "webp") {
  return `/${IMG_DIR}/${stem(publicPath)}.${hash}-${width}.${ext}`;
}
