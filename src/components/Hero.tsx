'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const CONTRACT_ADDRESS = 'GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'

export default function Hero() {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(CONTRACT_ADDRESS)
            setCopied(true)
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
                            className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-white/80">Live on Solana</span>
                            <span className="text-xs bg-kfh-coral/20 text-kfh-coral px-2 py-0.5 rounded-full">PUMPFUN</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hero-title text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                        >
                            <span className="gradient-text">KUNG FU</span>
                            <br />
                            <span className="text-white">HAMSTER</span>
                            <br />
                            <span className="gradient-text-alt">$KFH</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl sm:text-2xl text-white/70 mb-8 font-medium"
                        >
                            KFH is <span className="text-kfh-coral font-bold">ACTUALLY</span> viral and
                            <br className="hidden sm:block" /> belongs on <span className="text-kfh-teal font-bold">Pumpfun</span> 🐹🥋
                        </motion.p>

                        {/* Contract Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8"
                        >
                            <p className="text-sm text-white/50 mb-2 uppercase tracking-wider">Contract Address</p>
                            <button
                                onClick={copyToClipboard}
                                className={`glass-card py-3 px-4 text-sm font-mono flex items-center gap-3 mx-auto lg:mx-0 hover:bg-white/10 transition-all group ${copied ? 'copy-success' : ''
                                    }`}
                            >
                                <span className="text-white/80 truncate max-w-[300px]">{CONTRACT_ADDRESS}</span>
                                <span className="text-white/50 group-hover:text-kfh-teal transition-colors">
                                    {copied ? '✓ Copied!' : '📋 Copy'}
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
                                className="neo-button flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Buy on Pump.fun</span>
                                <span className="text-xl">🚀</span>
                            </motion.a>
                            <motion.a
                                href="https://dexscreener.com/solana/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-button neo-button-secondary flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Chart</span>
                                <span className="text-xl">📊</span>
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Hamster Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Glow Ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-kfh-coral/30 animate-pulse" />
                            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-kfh-teal/20" />
                        </div>

                        {/* Main Image */}
                        <motion.div
                            className="relative z-10 kungfu-animate"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                                <Image
                                    src="/images/kfh-hero.png"
                                    alt="Kung Fu Hamster"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                className="absolute -top-4 -right-4 glass-card px-4 py-2 text-sm font-bold"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🥷 Master
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 glass-card px-4 py-2 text-sm font-bold bg-kfh-coral/20"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🔥 VIRAL
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-white/50 text-sm">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1.5 h-3 bg-kfh-coral rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
