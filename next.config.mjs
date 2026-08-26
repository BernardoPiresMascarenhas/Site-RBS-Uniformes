/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    /**
     * AVIF primeiro, WebP como reserva.
     *
     * O fundo do Hero é uma cena quase toda em sombra (88% dos pixels
     * abaixo de luma 40). É exatamente o caso em que o WebP mostra
     * banding nos degradês escuros e o AVIF não: medindo contra o PNG
     * original, o AVIF entrega menos erro nas sombras que o WebP e
     * ainda pesa menos.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
