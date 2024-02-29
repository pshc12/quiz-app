import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0px 4px 48px rgba(0, 0, 0, 1)',
        'glow-sm': '0px 4px 12px rgba(0, 0, 0, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-main':
          'linear-gradient(125deg, rgba(0,90,100,0.5) 30.9254386713%, rgba(70,0,100,0.6) 60.9254386713%)',
      },
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
      animation: {
        shrink: 'shrink 2s ease-in-out infinite',
      },
      keyframes: {
        shrink: {
          '0%, 40%, 100%': { transform: 'scale(0.4)' },
          '20%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
