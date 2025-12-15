'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useSound } from '@/contexts/SoundContext'
import { useLanguage } from '@/contexts/LanguageContext'

const CONTRACT_ADDRESS = 'GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'
const VIRAL_TWEET_URL = 'https://x.com/animalkyat/status/2000094283437916458'

export default function Hero() {
    const [copied, setCopied] = useState(false)
    const { playCoin } = useSound()
    const { t } = useLanguage()

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(CONTRACT_ADDRESS)
            setCopied(true)
            playCoin()
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 text-6xl floating-element"
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
                🥋
            </motion.div>
            <motion.div
                className="absolute top-40 right-20 text-5xl floating-element-delayed"
                animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
                ⭐
            </motion.div>
            <motion.div
                className="absolute bottom-40 left-20 text-4xl floating-element-slow"
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
                🔥
            </motion.div>
            <motion.div
                className="absolute bottom-20 right-10 text-5xl"
                animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                💎
            </motion.div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kfh-coral/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-kfh-purple/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kfh-teal/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 neo-card px-4 py-2 mb-6"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-white/80">{t('hero.badge')}</span>
                            <span className="text-xs bg-kfh-coral/20 text-kfh-coral px-2 py-0.5 rounded-full">PUMPFUN</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hero-title text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                        >
                            <span className="gradient-text">{t('hero.title1')}</span>
                            <br />
                            <span className="text-white">{t('hero.title2')}</span>
                            <br />
                            <span className="gradient-text-alt">$KFH</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg sm:text-xl text-white/70 mb-8 max-w-lg"
                        >
                            {t('hero.tagline')} 🥋
                        </motion.p>

                        {/* Contract Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8"
                        >
                            <p className="text-sm text-white/50 mb-2">{t('hero.ca')}</p>
                            <button
                                onClick={copyToClipboard}
                                className={`neo-card px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all w-full sm:w-auto ${copied ? 'copy-success' : ''}`}
                            >
                                <code className="text-xs sm:text-sm text-kfh-teal font-mono truncate max-w-[200px] sm:max-w-none">
                                    {CONTRACT_ADDRESS}
                                </code>
                                <span className="text-white/60 text-sm whitespace-nowrap">
                                    {copied ? `✓ ${t('hero.copied')}` : `📋 ${t('hero.copy')}`}
                                </span>
                            </button>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                href="https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('hero.buyPump')} 🚀
                            </motion.a>
                            <motion.a
                                href="https://dexscreener.com/solana/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-button-outline neo-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('hero.viewChart')} 📊
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Viral Hamster Image with Aura */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Glowing Aura Effect */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-r from-kfh-coral/30 via-kfh-yellow/20 to-kfh-teal/30 blur-3xl"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-kfh-coral/20 blur-2xl"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-kfh-coral/40"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-kfh-teal/30"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>

                        {/* Main Image - Viral Tweet Image */}
                        <motion.div
                            className="relative z-10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <a
                                href={VIRAL_TWEET_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative group"
                            >
                                <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl overflow-hidden border-4 border-white shadow-2xl shadow-kfh-coral/30 group-hover:border-kfh-coral transition-colors">
                                    <Image
                                        src="/images/kfh-viral.png"
                                        alt="Kung Fu Hamster - Viral Tweet"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <motion.div
                                    className="absolute -top-3 -right-3 bg-kfh-coral text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-white"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    🔥 11M+ Views
                                </motion.div>
                            </a>

                            <motion.a
                                href={VIRAL_TWEET_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg border border-white/20 hover:bg-kfh-coral transition-colors whitespace-nowrap"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                See Original Tweet
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-white/50 text-sm">{t('hero.scroll')}</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1.5 h-3 bg-kfh-coral rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    )
}
