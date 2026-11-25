import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "section-mobile": "var(--section-space-mobile)",
        "section-tablet": "var(--section-space-tablet)",
        "section-desktop": "var(--section-space-desktop)",
      },
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          primaryHover: "var(--brand-primary-hover)",
          text: "var(--brand-text)",
          muted: "var(--brand-muted)",
          bg: "var(--brand-bg)",
          surface: "var(--brand-surface)",
          dark: "var(--brand-dark)",
          deepDark: "var(--brand-deep-dark)",
          border: "var(--brand-border)",
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
        "lead-mobile": ["1.125rem", { lineHeight: "1.65", fontWeight: "300" }],
        "lead-tablet": ["1.375rem", { lineHeight: "1.65", fontWeight: "300" }],
        "display-mobile": ["2.5rem", { lineHeight: "1.08", fontWeight: "700" }],
        "display-tablet": ["3.5rem", { lineHeight: "1.08", fontWeight: "700" }],
        "display-desktop": ["4.5rem", { lineHeight: "1.08", fontWeight: "700" }],
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
      borderRadius: {
        button: "0px",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        panel: "var(--shadow-panel)",
      },
    },
  },
  plugins: [],
};
export default config;
