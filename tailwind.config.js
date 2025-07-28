/** @type {import('tailwindcss').Config} */

const config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "test-color": "#ff0000",
            },
            fontFamily: {
                helvetica: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
                courier: ["Courier New", "monospace"],
            },
        },
    },
    plugins: [],
};

export default config;
