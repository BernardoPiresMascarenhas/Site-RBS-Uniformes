import * as ReactDOM from "react-dom";
import type { CSSProperties, ImgHTMLAttributes } from "react";

import manifestJson from "@/lib/generated/image-manifest.json";
import { variantUrl } from "@/lib/image-path.mjs";

/**
 * Imagem responsiva servida a partir de arquivos pré-gerados no build
 * (`scripts/optimize-images.mjs`), sem passar pelo Image Optimization da
 * Vercel — nenhuma requisição a `/_next/image`, nenhuma transformação cobrada.
 *
 * Mantém a API de `next/image` que o site usa (`fill`, `sizes`, `priority`,
 * `loading`…), mas monta o `srcset` a partir do que existe de fato em disco:
 * cada descritor `w` é a largura REAL do arquivo, e nenhuma variante é
 * ampliada além da resolução original.
 *
 * Imagem fora do manifesto (não deveria acontecer: o script varre o código)
 * cai no arquivo original, sem `srcset` — funciona, só não é otimizada.
 */

/**
 * hash e larguras (em ordem crescente) das variantes geradas de cada original;
 * o 3º item, quando existe, avisa que há também a versão AVIF (só o hero).
 */
type Entry = [hash: string, widths: number[], avif?: 1];
const manifest = manifestJson as unknown as Record<string, Entry>;

/** Pastas de `public/` lidas com `encodeURIComponent` (ex.: `valença.png`). */
function manifestKey(src: string) {
  try {
    return decodeURIComponent(src);
  } catch {
    return src;
  }
}

export interface PhotoSources {
  /** Maior variante — fallback para quem não entende `srcset`. */
  src: string;
  srcSet?: string;
  /** `srcset` em AVIF, quando a imagem tem essa versão. */
  avifSrcSet?: string;
}

/** `src`/`srcset` das variantes de uma imagem de `public/`. */
export function photoSources(src: string): PhotoSources {
  const key = manifestKey(src);
  const entry = manifest[key];

  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Photo] "${src}" não está em lib/generated/image-manifest.json — rode \`npm run images\`.`);
    }
    return { src };
  }

  const [hash, widths, avif] = entry;
  const list = (ext: string) =>
    widths.map((width) => `${variantUrl(key, hash, width, ext)} ${width}w`).join(", ");

  return {
    src: variantUrl(key, hash, widths[widths.length - 1]),
    srcSet: list("webp"),
    avifSrcSet: avif ? list("avif") : undefined,
  };
}

type NativeProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height" | "loading" | "onLoad" | "alt"
>;

export interface PhotoProps extends NativeProps {
  /** Caminho em `public/` (ex.: `/produtos/camisa.webp`). */
  src: string;
  alt: string;
  /** Preenche o pai posicionado (como `fill` do next/image). */
  fill?: boolean;
  width?: number;
  height?: number;
  /** Imagem da primeira dobra: carrega já, com prioridade alta e `<link rel="preload">`. */
  priority?: boolean;
  loading?: "eager" | "lazy";
  /** Disparado quando a imagem termina de carregar — inclusive se ela terminou antes da hidratação. */
  onLoad?: () => void;
}

const FILL: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

export function Photo({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  loading,
  fetchPriority,
  onLoad,
  style,
  ...rest
}: PhotoProps) {
  const sources = photoSources(src);
  // sem `sizes` o navegador assume 100vw e pegaria sempre a maior variante;
  // sem `fill`, a largura declarada é o tamanho em que a imagem aparece
  const resolvedSizes = sources.srcSet ? sizes ?? (fill ? "100vw" : width ? `${width}px` : "100vw") : undefined;

  if (priority) {
    // o `preload` só existe no React com Server Components (o do App Router)
    const preload = (ReactDOM as unknown as { preload?: (href: string, options: object) => void }).preload;
    // com AVIF, só ele é pré-carregado (e só por quem o entende): quem cai no
    // WebP baixa a imagem normalmente, sem pré-carregar o formato errado
    preload?.(sources.avifSrcSet ? sources.src.replace(/\.webp$/, ".avif") : sources.src, {
      as: "image",
      type: sources.avifSrcSet ? "image/avif" : undefined,
      imageSrcSet: sources.avifSrcSet ?? sources.srcSet,
      imageSizes: resolvedSizes,
      fetchPriority: "high",
    });
  }

  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- o `srcset` já vem pronto, não há o que o next/image otimize
    <img
      {...rest}
      alt={alt}
      src={sources.src}
      srcSet={sources.srcSet}
      sizes={resolvedSizes}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : loading ?? "lazy"}
      fetchPriority={priority ? "high" : fetchPriority}
      decoding="async"
      style={{
        ...(fill ? FILL : null),
        // as variantes são arredondadas ao pixel (ex.: 160×107 em vez de 160×106,67); sem
        // isso, `width: auto` seguiria o arredondamento do arquivo e não a proporção da arte
        ...(!fill && width && height ? { aspectRatio: `${width} / ${height}` } : null),
        color: "transparent",
        ...style,
      }}
      onLoad={onLoad ? () => onLoad() : undefined}
      // a foto pode terminar de carregar antes de o React hidratar: o evento
      // `load` já passou, então confere o estado na montagem
      ref={
        onLoad
          ? (img) => {
              if (img?.complete && img.naturalWidth > 0) onLoad();
            }
          : undefined
      }
    />
  );

  return sources.avifSrcSet ? (
    <picture>
      <source type="image/avif" srcSet={sources.avifSrcSet} sizes={resolvedSizes} />
      {image}
    </picture>
  ) : (
    image
  );
}
