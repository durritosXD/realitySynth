/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f0f0e',
        surface: '#1a1a18',
        paper: '#f5f4f0',
        primary: '#1D9E75',
        amber: '#BA7517',
        alert: '#E24B4A',
        info: '#378ADD',
        model: '#534AB7',
        muted: '#888780'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
};
