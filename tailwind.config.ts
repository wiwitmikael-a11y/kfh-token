import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'kfh-coral': '#FF6B6B',
                'kfh-teal': '#4ECDC4',
                'kfh-yellow': '#FFE66D',
                'kfh-mint': '#95E1D3',
                'kfh-navy': '#1A1A2E',
                'kfh-purple': '#667EEA',
                'kfh-pink': '#F5576C',
                'kfh-dark': '#0F0F1A',
            },
            fontFamily: {
                'outfit': ['Outfit', 'sans-serif'],
                'space': ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
                'gradient': 'gradient 8s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(255, 107, 107, 0.8)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            backgroundSize: {
                '300%': '300%',
            },
        },
    },
    plugins: [],
}

export default config
