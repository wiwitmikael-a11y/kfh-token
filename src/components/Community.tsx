'use client'

import { motion } from 'framer-motion'

const socialLinks = [
    {
        name: 'X Community',
        description: 'Join our viral community on X',
        icon: '𝕏',
        url: 'https://x.com/i/communities/2000356522157564334',
        color: 'from-gray-700 to-gray-900',
        hoverColor: 'hover:shadow-white/20',
    },
    {
        name: 'Dexscreener',
        description: 'Track live price & charts',
        icon: '📊',
        url: 'https://dexscreener.com/solana/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump',
        color: 'from-green-600 to-green-800',
        hoverColor: 'hover:shadow-green-500/30',
    },
    {
        name: 'Pump.fun',
        description: 'Buy KFH on Pumpfun',
        icon: '🚀',
        url: 'https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump',
        color: 'from-kfh-coral to-kfh-pink',
        hoverColor: 'hover:shadow-kfh-coral/30',
    },
]

const stats = [
    { label: 'Community Members', value: '10K+', icon: '👥' },
    { label: 'Holders', value: 'Growing', icon: '📈' },
    { label: 'Memes Created', value: '∞', icon: '🎨' },
]

export default function Community() {
    return (
        <section id="community" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kfh-yellow/50 to-transparent" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-kfh-coral/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-kfh-teal/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-kfh-yellow font-bold uppercase tracking-wider text-sm">Community</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        Join the <span className="gradient-text">KFH Army</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Connect with fellow kung fu hamster warriors. Share memes, discuss strategies,
                        and be part of the most viral community on Solana!
                    </p>
                </motion.div>

                {/* Social Links Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`glass-card p-8 text-center card-hover group cursor-pointer shadow-lg ${link.hoverColor}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                                {link.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-kfh-coral transition-colors">
                                {link.name}
                            </h3>
                            <p className="text-white/60 text-sm mb-4">{link.description}</p>
                            <div className="flex items-center justify-center gap-2 text-kfh-teal text-sm font-medium">
                                <span>Visit</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Stats Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card-strong p-8"
                >
                    <div className="grid sm:grid-cols-3 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            >
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Meme Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 overflow-hidden"
                >
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-6xl mx-8 opacity-30">
                                🐹 🥋 💎 🚀 🔥
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <div className="glass-card inline-block p-8 max-w-2xl">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready to become a <span className="text-kfh-coral">KFH Warrior</span>?
                        </h3>
                        <p className="text-white/60 mb-6">
                            Don't miss out on the most viral meme token on Solana.
                            Join the community and let's take KFH to the moon together! 🚀
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <motion.a
                                href="https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Buy $KFH Now 🥋
                            </motion.a>
                            <motion.a
                                href="https://x.com/i/communities/2000356522157564334"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-button neo-button-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Join Community 👥
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
