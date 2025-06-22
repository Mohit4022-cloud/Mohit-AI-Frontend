import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // AI Calls specific colors from design guide
        "ai-blue": "#2563EB",
        "ai-green": "#16A34A", 
        "ai-amber": "#F59E0B",
        "ai-red": "#DC2626",
        "ai-gray": "#6B7280",
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      width: {
        'call-card': '340px',
      },
      minWidth: {
        'call-card': '340px',
        'transcript': '400px',
      },
      height: {
        'call-card': '120px',
      },
      spacing: {
        'status-indicator': '24px',
      },
      borderWidth: {
        'status': '2px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // AI status animations
        "pulse-ring": {
          "0%": { 
            transform: "scale(0.8)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(0.8)",
            opacity: "1",
          },
        },
        "rotate-gear": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "sound-wave": {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1)" },
        },
        "sound-wave-delayed": {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-ring": "pulse-ring 1.5s ease-in-out infinite",
        "rotate-gear": "rotate-gear 2s linear infinite",
        "sound-wave": "sound-wave 0.5s ease-in-out infinite",
        "sound-wave-delayed": "sound-wave-delayed 0.5s ease-in-out infinite 0.1s",
      },
      screens: {
        // AI Calls specific breakpoints
        'ai-mobile': '640px',
        'ai-tablet': '1024px',
        'ai-desktop': '1280px',
      },
      gridTemplateColumns: {
        // 60/40 split for AI Calls layout
        'ai-split': '60% 40%',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;