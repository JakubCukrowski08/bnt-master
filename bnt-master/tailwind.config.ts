import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Rygorystyczny system odstępów (nadpisuje domyślny)
    spacing: {
      0: "0",
      px: "1px",
      1: "0.25rem",  // 4px
      2: "0.5rem",   // 8px
      3: "0.75rem",  // 12px
      4: "1rem",     // 16px
      6: "1.5rem",   // 24px
      8: "2rem",     // 32px
      12: "3rem",    // 48px
      16: "4rem",    // 64px
      24: "6rem",    // 96px
      32: "8rem",    // 128px
      // Zmienne sekcji
      "section-mobile": "3rem",  // 48px
      "section-tablet": "4rem",  // 64px
      "section-desktop": "6rem", // 96px (lub 8rem / 128px)
    },
    extend: {
      colors: {
        brand: {
          primary: "#1E3A5F", // Zgaszony, korporacyjny stalowy granat
          primaryHover: "#0F2942", // Głębszy odcień na hover
          text: "#18181B",
          muted: "#52525B",
          bg: "#FFFFFF",
          surface: "#F4F4F5",
          dark: "#18181B",
          deepDark: "#0A0E14", // Asymetryczne czarne/techniczne tło
          border: "#E4E4E7",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        // H1
        "h1-mobile": ["2rem", { lineHeight: "1.1", fontWeight: "700" }],     // 32px
        "h1-tablet": ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }],   // 40px
        "h1-desktop": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],  // 56px
        // H2
        "h2-mobile": ["1.625rem", { lineHeight: "1.15", fontWeight: "600" }], // 26px
        "h2-tablet": ["2rem", { lineHeight: "1.15", fontWeight: "600" }],     // 32px
        "h2-desktop": ["2.5rem", { lineHeight: "1.15", fontWeight: "600" }],  // 40px
        // H3
        "h3-mobile": ["1.25rem", { lineHeight: "1.2", fontWeight: "600" }],   // 20px
        "h3-tablet": ["1.5rem", { lineHeight: "1.2", fontWeight: "600" }],    // 24px
        "h3-desktop": ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }],  // 28px
        // H4
        "h4-mobile": ["1.125rem", { lineHeight: "1.3", fontWeight: "600" }],  // 18px
        "h4-tablet": ["1.125rem", { lineHeight: "1.3", fontWeight: "600" }],  // 18px
        "h4-desktop": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],  // 20px
        // Body
        "body-mobile": ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }], // 15px
        "body-desktop": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],     // 16px
        "body-medium": ["1rem", { lineHeight: "1.6", fontWeight: "500" }],      // 16px medium
        // Small
        "small-mobile": ["0.8125rem", { lineHeight: "1.4", fontWeight: "400" }], // 13px
        "small-desktop": ["0.875rem", { lineHeight: "1.4", fontWeight: "400" }],  // 14px
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'marquee-left': 'marqueeLeft 40s linear infinite',
        slowPulse: 'slowPulse 3s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
