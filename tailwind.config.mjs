/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0B',
        surface: '#141413',
        border: '#252420',
        parchment: '#E8E5DE',
        muted: '#6B6860',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E8E5DE',
            a: { color: '#E8E5DE', textDecoration: 'underline' },
            h1: { color: '#E8E5DE', fontFamily: '"Cormorant Garamond", Georgia, serif' },
            h2: { color: '#E8E5DE', fontFamily: '"Cormorant Garamond", Georgia, serif' },
            h3: { color: '#E8E5DE', fontFamily: '"Cormorant Garamond", Georgia, serif' },
            strong: { color: '#E8E5DE' },
            code: { color: '#E8E5DE' },
            blockquote: { color: '#6B6860', borderLeftColor: '#252420' },
          },
        },
      },
    },
  },
  plugins: [],
};
