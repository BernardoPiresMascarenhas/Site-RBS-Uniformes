/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    /**
     * As imagens do site NÃO passam pelo Image Optimization da Vercel (que é
     * cobrado por transformação). Elas são geradas no build por
     * `scripts/optimize-images.mjs` e servidas como arquivos estáticos pelo
     * componente `components/ui/Photo.tsx`.
     *
     * `unoptimized` é a rede de segurança: se alguém voltar a usar `next/image`
     * por engano, a imagem sai sem transformação (não vai para `/_next/image`).
     * Prefira sempre o `Photo`.
     */
    unoptimized: true,
  },

  async headers() {
    return [
      {
        // o nome de cada arquivo leva o hash do conteúdo (lib/image-path.mjs),
        // então ele nunca muda de conteúdo: pode ficar um ano no cache
        source: "/_img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
