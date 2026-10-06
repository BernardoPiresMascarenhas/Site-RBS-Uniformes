import type { Config } from "tailwindcss";

/**
 * Cores semânticas ("brand") alimentadas por CSS custom properties. O valor
 * das variáveis é trocado em `app/globals.css` conforme o atributo
 * `data-surface` ("light" | "dark"), o que permite que os mesmos componentes
 * sirvam às seções claras e às verde-escuras sem duplicação.
 *
 * "rbs" é a paleta fixa da marca, para os poucos pontos que não devem mudar
 * com a superfície (barra utilitária, véus do hero, estrelas).
 *
 * As variáveis guardam canais RGB crus (ex.: `8 115 63`) para que os
 * modificadores de opacidade do Tailwind (`bg-brand-primary/20`) funcionem.
 */
const brand = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;
const rbs = (name: string) => `rgb(var(--rbs-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: brand("bg"),
          "bg-alt": brand("bg-alt"),
          surface: brand("surface"),
          "surface-2": brand("surface-2"),
          border: brand("border"),
          text: brand("text"),
          heading: brand("heading"),
          muted: brand("muted"),
          primary: brand("primary"),
          "primary-hover": brand("primary-hover"),
          "on-primary": brand("on-primary"),
          accent: brand("accent"),
          green: brand("green"),
          "green-soft": brand("green-soft"),
          yellow: brand("yellow"),
          "yellow-soft": brand("yellow-soft"),
          red: brand("red"),
          "red-soft": brand("red-soft"),
        },
        rbs: {
          green: rbs("green"),
          "green-hover": rbs("green-hover"),
          "green-dark": rbs("green-dark"),
          "green-deep": rbs("green-deep"),
          "green-light": rbs("green-light"),
          "green-soft": rbs("green-soft"),
          "green-mint": rbs("green-mint"),
          cream: rbs("cream"),
          offwhite: rbs("offwhite"),
          ink: rbs("ink"),
          red: rbs("red"),
          "red-light": rbs("red-light"),
          "red-soft": rbs("red-soft"),
          yellow: rbs("yellow"),
          "yellow-hover": rbs("yellow-hover"),
          "yellow-ink": rbs("yellow-ink"),
          "yellow-soft": rbs("yellow-soft"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        brand: "var(--radius-brand)",
        "brand-lg": "var(--radius-brand-lg)",
      },
      boxShadow: {
        brand: "var(--shadow-brand)",
        "brand-lg": "var(--shadow-brand-lg)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1.1s cubic-bezier(.22,1,.36,1) both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
