import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ant: {
          // Backgrounds
          'bg-container': 'var(--ant-color-bg-container)',
          'bg-elevated': 'var(--ant-color-bg-elevated)',
          'bg-layout': 'var(--ant-color-bg-layout)',
          // Text
          text: 'var(--ant-color-text)',
          'text-secondary': 'var(--ant-color-text-secondary)',
          'text-tertiary': 'var(--ant-color-text-tertiary)',
          // Primary
          primary: 'var(--ant-color-primary)',
          'primary-hover': 'var(--ant-color-primary-hover)',
          'primary-active': 'var(--ant-color-primary-active)',
          // Border
          border: 'var(--ant-color-border)',
          // Hover state
          'bg-text-hover': 'var(--ant-color-bg-text-hover)',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
