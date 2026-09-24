import { existsSync } from "node:fs";
import path from "node:path";

import type { PhotoModel, ShowcaseModel, UniformModel } from "@/lib/services";

/**
 * Extensões aceitas, na ordem de preferência. A extensão declarada em
 * `lib/services.ts` é só a primeira tentativa: vale o nome do arquivo, não o
 * formato, para que soltar um `.jpeg` onde se esperava `.webp` funcione.
 */
const EXTENSOES = [".webp", ".avif", ".jpeg", ".jpg", ".png"];

/** Procura o arquivo da foto em `public/`, ignorando a extensão declarada. */
function encontrarFoto(photo: string): string | null {
  const semExtensao = photo.replace(/\.[^./]+$/, "");
  const candidatas = [photo, ...EXTENSOES.map((ext) => semExtensao + ext)];

  for (const candidata of candidatas) {
    if (existsSync(path.join(process.cwd(), "public", candidata))) {
      return candidata;
    }
  }

  return null;
}

/**
 * Resolve a foto de capa de uma linha (`Service.cover`), quando declarada.
 *
 * Mesma tolerância de `resolveModelPhotos`: vale o nome do arquivo, não a
 * extensão declarada, e um arquivo ausente devolve `null` — o chamador cai na
 * capa padrão (a foto do primeiro modelo) sem quebrar.
 *
 * ⚠️ Usa `node:fs` — só pode ser chamado de Server Component.
 */
export function resolveCover(cover?: string): string | null {
  return cover ? encontrarFoto(cover) : null;
}

/**
 * Confere, no build, quais fotos de modelo já existem em `public/`.
 *
 * Isso deixa o site tolerante a uma entrega parcial das imagens: cada modelo
 * cujo arquivo ainda não chegou continua exibindo o mockup desenhado, sem
 * quebrar a página nem exigir alteração de código. Basta soltar o arquivo em
 * `public/produtos/` (com o nome declarado em `lib/services.ts`) e refazer o
 * build para a foto entrar no lugar.
 *
 * ⚠️ Usa `node:fs` — só pode ser chamado de Server Component.
 */
export function resolveModelPhotos(models: UniformModel[]): ShowcaseModel[] {
  return models.map((model) => ({
    ...model,
    photo: encontrarFoto(model.photo),
  }));
}

/**
 * Só os modelos que já têm foto em `public/` — a página de serviço esconde os
 * demais. Os textos continuam em `lib/services.ts`: basta soltar a foto com o
 * nome declarado e refazer o build para o modelo voltar a aparecer.
 *
 * ⚠️ Usa `node:fs` — só pode ser chamado de Server Component.
 */
export function resolvePhotoModels(models: UniformModel[]): PhotoModel[] {
  return resolveModelPhotos(models).filter(
    (model): model is PhotoModel => model.photo !== null,
  );
}
