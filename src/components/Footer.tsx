'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const CONTRACT_ADDRESS = 'GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'

const footerLinks = [
    {
        title: 'Community',
        links: [
            { name: 'X Community', url: 'https://x.com/i/communities/2000356522157564334' },
            { name: 'Dexscreener', url: 'https://dexscreener.com/solana/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump' },
            { name: 'Pump.fun', url: 'https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { name: 'Tokenomics', url: '#tokenomics' },
            { name: 'PFP Generator', url: '#pfp' },
            { name: 'About', url: '#about' },
        ],
    },
]

export default function Footer() {
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
        <footer className="relative pt-24 pb-8 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-dark to-black" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kfh-coral/30 to-transparent" />

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 text-4xl opacity-10 animate-float">🐹</div>
            <div className="absolute top-20 right-20 text-3xl opacity-10 animate-float-delayed">🥋</div>
            <div className="absolute bottom-40 left-1/4 text-2xl opacity-10 animate-float">💎</div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-kfh-coral to-kfh-pink flex items-center justify-center text-3xl shadow-lg">
                                🐹
                            </div>
                            <div>
                                <h3 className="text-2xl font-black gradient-text">KFH</h3>
                                <p className="text-white/60 text-sm">Kung Fu Hamster</p>
                            </div>
                        </div>
                        <p className="text-white/60 mb-6 max-w-md">
                            The most viral meme token on Solana. Join the kung fu hamster army and
                            let's take KFH to the moon together! 🚀
                        </p>

                        {/* Contract Address */}
                        <div className="mb-6">
                            <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Contract Address</p>
                            <button
                                onClick={copyToClipboard}
                                className={`glass-card py-2 px-4 text-xs font-mono flex items-center gap-2 hover:bg-white/10 transition-all ${copied ? 'copy-success' : ''
                                    }`}
                            >
                                <span className="text-white/70 truncate">{CONTRACT_ADDRESS}</span>
                                <span className="text-white/50">
                                    {copied ? '✓' : '📋'}
                                </span>
                            </button>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <motion.a
                                href="https://x.com/i/communities/2000356522157564334"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass-card flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                𝕏
                            </motion.a>
                            <motion.a
                                href="https://dexscreener.com/solana/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass-card flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                📊
                            </motion.a>
                            <motion.a
                                href="https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass-card flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                🚀
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Links */}
                    {footerLinks.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                        >
                            <h4 className="font-bold text-white mb-4">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target={link.url.startsWith('http') ? '_blank' : undefined}
                                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="text-white/60 hover:text-kfh-coral transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="border-t border-white/10 pt-8 mb-8"
                >
                    <div className="glass-card p-4 text-center">
                        <p className="text-white/40 text-xs leading-relaxed">
                            ⚠️ <strong>Disclaimer:</strong> $KFH is a meme token with no intrinsic value or expectation of financial return.
                            There is no formal team or roadmap. The token is created for entertainment purposes only.
                            Always do your own research (DYOR) before investing in any cryptocurrency.
                        </p>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm"
                >
                    <p>© 2024 Kung Fu Hamster. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        Made with <span className="text-kfh-coral animate-pulse">❤️</span> by the KFH Community
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}
