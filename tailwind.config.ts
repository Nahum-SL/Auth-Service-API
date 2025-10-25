import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "dark-custom": "#1a1a2e",
            },
            fontFamily: {
                sans: ["var(--font-raleway-sans)", "sans-serif"],
            },
            keyframes: {
                slide: {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
                },
                fadeInUp: {
                "0%": { opacity: 0, transform: "translateY(30px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
                },
                fadeIn: {
                "0%": { opacity: "0" },
                "100%": { opacity: "1" },
                },
            },
            animation: {
                fadeInUp: "fadeInUp 0.8s ease-out forwards",
                fadeIn: "fadeIn 0.8s ease-out forwards",
            },
        },
    },
    plugins: [],
};

export default config;
