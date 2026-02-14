/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode via class strategy
    theme: {
        extend: {
            colors: {
                charcoal: '#1a1a1a', // Custom dark background color
                'charcoal-light': '#2d2d2d',
            },
        },
    },
    plugins: [],
}
