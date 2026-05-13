// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  safelist: [
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-primary)",
          primaryHover:
            "var(--color-primary-hover)",
          primaryLight:
            "var(--color-primary-light)",

          textPrimary:
            "var(--color-text-primary)",

          textSecondary:
            "var(--color-text-secondary)",

          textMuted:
            "var(--color-text-muted)",

          border: "var(--color-border)",
          card: "var(--color-card)",
          page: "var(--color-page)",

          success: "var(--color-success)",
          warning: "var(--color-warning)",
          error: "var(--color-error)",
        },
      },

      borderRadius: {
        card: "12px",
        button: "8px",
      },

      animation: {
        fadeIn:
          "fadeIn 150ms ease-out",

        slideDown:
          "slideDown 200ms ease-out",
      },

      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        slideDown: {
          from: {
            opacity: "0",
            transform:
              "translateY(-8px)",
          },

          to: {
            opacity: "1",
            transform:
              "translateY(0)",
          },
        },
      },

      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "Inter",
          "sans-serif",
        ],
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;