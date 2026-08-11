import type { Config } from "tailwindcss";

/**
 * Uma única escala de cores semânticas ("brand") alimentada por CSS custom
 * properties. O valor das variáveis é trocado em `app/globals.css` conforme o
 * atributo `data-surface` ("dark" | "light"), o que permite que os mesmos
 * componentes sirvam às seções escuras e claras sem duplicação.
 *
 * As variáveis guardam canais RGB crus (ex.: `252 182 9`) para que os
 * modificadores de opacidade do Tailwind (`bg-brand-primary/20`) funcionem.
 */
const brand = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

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
          "accent-strong": brand("accent-strong"),
          sun: brand("sun"),
          "sun-soft": brand("sun-soft"),
          red: brand("red"),
          green: brand("green"),
          "green-soft": brand("green-soft"),
          gray: brand("gray"),
        },
        /* Paletas literais — úteis para gradientes e artes decorativas. */
        /* Ouro envelhecido: menos saturado que o da arte da logo, para não
           dominar o layout em áreas grandes. */
        premium: {
          black: "#050505",
          ink: "#0C0B09",
          gold: "#C9A227",
          "gold-light": "#E3CE94",
          "gold-glow": "#EFE2B6",
          "gold-deep": "#846A1C",
          red: "#D62026",
          "red-deep": "#8E0209",
          /* Verde da montanha do hero — o acento secundário da marca. */
          emerald: "#0A7A44",
          "emerald-light": "#2FA76B",
          "emerald-glow": "#7FCFA5",
          "emerald-deep": "#013C1E",
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
        gold: "0 0 0 1px rgba(201,162,39,0.28), 0 16px 36px -20px rgba(201,162,39,0.4)",
      },
      backgroundImage: {
        /* Gradiente do ouro fixo (blocos sempre escuros). Nas seções que
           alternam claro/escuro use `--sheen`, que acompanha a superfície. */
        "gold-sheen":
          "linear-gradient(100deg,#9C7F26 0%,#C9A227 28%,#E7D5A0 50%,#C9A227 72%,#846A1C 100%)",
        /* Mesmo brilho, na versão esmeralda — botões e selos verdes. */
        "emerald-sheen":
          "linear-gradient(100deg,#013C1E 0%,#0A7A44 30%,#2FA76B 52%,#0A7A44 74%,#04502C 100%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slow-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.22,1,.36,1) both",
        "slow-spin": "slow-spin 60s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
