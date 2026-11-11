import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c1512",
        moss: {
          50: "#eefbf3",
          100: "#d6f5e3",
          200: "#b0e9cb",
          300: "#7bd6ab",
          400: "#45bd87",
          500: "#22a26c",
          600: "#158256",
          700: "#126847",
          800: "#12533a",
          900: "#104431",
        },
        sand: "#f7f6f2",
        /* Dark app palette (member area / admin). */
        night: "#070b14",
        panel: "#101a2e",
        accent: "#2f7bff",
        cyan: "#49d2ff",
        mist: "#b7c3d6",
        foam: "#f4f7fb",
        faint: "#8ea0b8",
        warn: "#f5c16c",
        danger: "#f87b7b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 24px 60px -34px rgba(12, 21, 18, 0.45)",
        glow: "0 12px 34px -12px rgba(47, 123, 255, 0.6)",
      },
      borderRadius: {
        app: "22px",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 380ms cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
