import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral base — no green tint baked into "black" or "gray" the
        // way the old obsidian/graphite/textSecondary tokens had. Green
        // exists in exactly one place: `accent`.
        black: "#000000",
        ink: "#0A0A0A",
        panel: "#111113",
        panelHover: "#161618",
        line: "#1F1F22",
        white: "#FAFAFA",
        text: "#EDEDED",
        textMuted: "#9A9AA0",
        textFaint: "#5C5C63",
        accent: "#22C55E",
        accentHover: "#16A34A",
        uhred: "#C8102E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        // Editorial display face — headline-scale type only (Hero h1,
        // opt-in Heading titles). Never body copy. See DESIGN.md.
        display: ["var(--font-display)", "Familjen Grotesk", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
        full: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
