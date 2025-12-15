'use client'

import { motion } from 'framer-motion'
import { useSound } from '@/contexts/SoundContext'

export default function SoundToggle() {
    const { soundEnabled, toggleSound, playPunch } = useSound()

    const handleClick = () => {
        toggleSound()
        if (!soundEnabled) {
            // Play a sound when enabling to give feedback
            setTimeout(() => {
                playPunch()
            }, 100)
        }
    }

    return (
        <motion.button
            onClick={handleClick}
            className="w-10 h-10 glass-card flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
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
    )
}
