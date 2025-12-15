'use client'

import { motion } from 'framer-motion'
import { useSound } from '@/contexts/SoundContext'

export default function SoundToggle() {
    const { soundEnabled, bgmEnabled, toggleSound, toggleBgm, playClick, playSuccess } = useSound()

    const handleSfxClick = () => {
        toggleSound()
        if (!soundEnabled) {
            setTimeout(() => playSuccess(), 100)
        }
    }

    const handleBgmClick = () => {
        toggleBgm()
        playClick()
    }

    return (
        <div className="flex items-center gap-1">
            {/* SFX Toggle */}
            <motion.button
                onClick={handleSfxClick}
                className="w-10 h-10 neo-card flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={soundEnabled ? 'Disable SFX' : 'Enable SFX'}
            >
                <motion.span
                    key={soundEnabled ? 'on' : 'off'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                    {soundEnabled ? '🔊' : '🔇'}
                </motion.span>
            </motion.button>

            {/* BGM Toggle */}
            <motion.button
                onClick={handleBgmClick}
                className="w-10 h-10 neo-card flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={bgmEnabled ? 'Stop BGM' : 'Play BGM'}
            >
                <motion.span
                    key={bgmEnabled ? 'playing' : 'stopped'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: bgmEnabled ? [0, 10, -10, 0] : 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        rotate: { repeat: bgmEnabled ? Infinity : 0, duration: 0.5 }
                    }}
                >
                    {bgmEnabled ? '🎵' : '🎶'}
                </motion.span>
            </motion.button>
        </div>
    )
}
