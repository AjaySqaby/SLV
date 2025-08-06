/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        primary: "var(--primary)",
        'primary-text': "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        cyan: "var(--secondary)",
        purple: {
          300: "#d8b4fe",
          500: "#a855f7",
          600: "#9333ea",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        "card-border": "var(--card-border)",
        heading: "var(--heading)",
        "button-bg": "var(--button-bg)",
        "button-hover": "var(--button-hover)",
        "button-text": "var(--button-text)",
        blue: "var(--blue)",
        green: "var(--green)",
        purple: "var(--purple)",
        amber: "var(--amber)",
        red: "var(--red)",
        teal: "var(--teal)",
        orange: "var(--orange)",
        pink: "var(--pink)",
        "gray-50": "var(--gray-50)",
        "gray-100": "var(--gray-100)",
        "gray-300": "var(--gray-300)",
        "gray-400": "var(--gray-400)",
        "gray-700": "var(--gray-700)",

      },
    },
  },
  plugins: [],
};
