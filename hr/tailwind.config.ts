import type { Config } from 'tailwindcss';

/**
 * Hoopoe Spatial Intelligence theme — tokens straight from DESIGN_GUIDE.md §3.B
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#0A0E14',
          surface: '#11161F',
          elevated: '#1A2230',
        },
        stroke: '#2A3344',
        text: {
          hi: '#F2F4F8',
          mid: '#A8B0BE',
          low: '#6B7385',
        },
        brand: {
          orange: '#F39C2A',
        },
        acc: {
          green: '#6FE36A',
          magenta: '#E45BCB',
          cyan: '#4FD3E3',
          yellow: '#F4D03F',
          red: '#FF5C5C',
        },
      },
      fontFamily: {
        sans: ['"Thmanyah Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Thmanyah Serif Display"', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(243,156,42,.35), 0 0 1px rgba(243,156,42,.8)',
        'glow-green': '0 0 24px rgba(111,227,106,.35)',
        'glow-magenta': '0 0 24px rgba(228,91,203,.35)',
        'glow-cyan': '0 0 24px rgba(79,211,227,.35)',
        'glow-yellow': '0 0 24px rgba(244,208,63,.35)',
        card: '0 16px 40px rgba(0,0,0,.45)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(255,255,255,.04) 1px, transparent 1.2px)',
      },
      backgroundSize: {
        dot: '22px 22px',
      },
    },
  },
  plugins: [],
} satisfies Config;
