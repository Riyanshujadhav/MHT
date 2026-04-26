/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        noir: "#0a0a0a",
        surface: "#171717",
        line: "#262626",
        emerald: "#10b981",
        mist: "#a3a3a3",
      },
      boxShadow: {
        emerald: "0 0 0 1px rgba(16, 185, 129, 0.35), 0 18px 44px rgba(16, 185, 129, 0.14)",
      },
      backgroundImage: {
        "emerald-grid":
          "radial-gradient(circle at top, rgba(16,185,129,0.16), transparent 30%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "100% 100%, 42px 42px, 42px 42px",
      },
    },
  },
  plugins: [],
};
