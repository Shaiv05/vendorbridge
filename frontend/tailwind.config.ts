import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))", glow: "hsl(var(--primary-glow))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        violet: { DEFAULT: "hsl(var(--violet))", foreground: "hsl(var(--violet-foreground))" },
        success: { DEFAULT: "hsl(var(--success))", foreground: "hsl(var(--success-foreground))" },
        warning: { DEFAULT: "hsl(var(--warning))", foreground: "hsl(var(--warning-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: { DEFAULT: "hsl(var(--sidebar))", foreground: "hsl(var(--sidebar-foreground))", accent: "hsl(var(--sidebar-accent))", border: "hsl(var(--sidebar-border))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 100%)",
        "gradient-hero": "linear-gradient(135deg, hsl(248 65% 48%) 0%, hsl(265 70% 58%) 50%, hsl(285 65% 60%) 100%)",
        "gradient-mesh": "radial-gradient(at 20% 20%, hsl(265 70% 60% / 0.35) 0px, transparent 50%), radial-gradient(at 80% 10%, hsl(220 70% 60% / 0.30) 0px, transparent 50%), radial-gradient(at 70% 80%, hsl(305 60% 62% / 0.30) 0px, transparent 50%)",
      },
      boxShadow: {
        elegant: "0 10px 40px -10px hsl(248 65% 48% / 0.25)",
        glow: "0 0 50px hsl(265 70% 60% / 0.35)",
        card: "0 1px 3px hsl(248 30% 15% / 0.04), 0 4px 12px hsl(248 30% 15% / 0.05)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-20px)" } },
      },
      animation: { "fade-in": "fade-in 0.3s ease-out", float: "float 6s ease-in-out infinite" },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
