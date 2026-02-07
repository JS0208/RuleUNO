/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "neon-green": "#39FF14",
        "neon-yellow": "#FFE700",
        "neon-red": "#FF003C",
        "cyber-blue": "#00F0FF",
        "overlay": "rgba(0, 0, 0, 0.9)",
      },
      fontFamily: {
        oswald: ["Oswald", "Impact", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "pulse-glow": "pulse-glow 1.2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        glitch: {
          "0%": { transform: "translate(0)", filter: "none" },
          "20%": { transform: "translate(-2px, 2px)", filter: "none" },
          "40%": { transform: "translate(2px, -2px)", filter: "none" },
          "60%": { transform: "translate(-2px, -2px)", filter: "none" },
          "80%": { transform: "translate(2px, 2px)", filter: "none" },
          "100%": { transform: "translate(0)", filter: "none" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.8", boxShadow: "0 0 20px currentColor" },
          "50%": { opacity: "1", boxShadow: "0 0 40px currentColor" },
        },
      },
      boxShadow: {
        "neon-green": "0 0 5px #39FF14, 0 0 20px #39FF14, 0 0 40px #39FF14",
        "neon-yellow": "0 0 5px #FFE700, 0 0 20px #FFE700, 0 0 40px #FFE700",
        "neon-red": "0 0 5px #FF003C, 0 0 20px #FF003C, 0 0 40px #FF003C",
        "cyber-blue": "0 0 5px #00F0FF, 0 0 20px #00F0FF",
      },
    },
  },
  plugins: [],
}
