module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#070B14',
          surface: '#0D1220',
          glass: 'rgba(255,255,255,0.03)',
        },
        accent: {
          cyan: '#00E5C8',
          blue: '#3B7EF8',
        },
        text: {
          primary: '#F0F4FF',
          muted: '#6B7A99',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--rot))' },
          '50%': { transform: 'translateY(-20px) rotate(var(--rot))' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,200,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,229,200,0.6)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    }
  }
}
