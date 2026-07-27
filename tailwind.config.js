/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.15)",
          hover: "rgba(255, 255, 255, 0.12)",
        },
        success: "#22c55e",
        danger:  "#ef4444",
        bg: {
          base:    "#0f172a",
          surface: "#1e293b",
          card:    "#1a2744",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
        glow:  "0 0 20px rgba(59, 130, 246, 0.3)",
      },
      borderRadius: {
        xl:  "1rem",
        "2xl": "1.5rem",
      },
      animation: {
        "fade-in":   "fadeIn 0.4s ease-out",
        "slide-up":  "slideUp 0.4s ease-out",
        "pulse-slow":"pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}