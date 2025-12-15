'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 glass-card flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {theme === 'dark' ? '🌙' : '☀️'}
            </motion.span>
        </motion.button>
    )
}
