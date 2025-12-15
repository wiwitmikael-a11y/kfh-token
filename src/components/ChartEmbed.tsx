'use client'

import { motion } from 'framer-motion'

const CONTRACT_ADDRESS = 'GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'

export default function ChartEmbed() {
    return (
        <section id="chart" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-dark via-kfh-navy to-kfh-dark" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kfh-teal/50 to-transparent" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/3 right-0 w-72 h-72 bg-kfh-teal/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-kfh-purple/10 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-kfh-teal font-bold uppercase tracking-wider text-sm">Live Chart</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        <span className="gradient-text">$KFH</span> Price Chart
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Track KFH price action in real-time. Powered by DexScreener.
                    </p>
                </motion.div>

                {/* Chart Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-card-strong overflow-hidden"
                >
                    {/* DexScreener Embed */}
                    <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                        <iframe
                            src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&theme=dark&trades=0&info=0`}
                            className="absolute inset-0 w-full h-full border-0"
                            title="KFH DexScreener Chart"
                            loading="lazy"
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-white/50">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span>Live Data</span>
                        </div>
                        <a
                            href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-kfh-teal hover:text-kfh-coral transition-colors flex items-center gap-2"
                        >
                            View on DexScreener
                            <span>→</span>
                        </a>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                    <div className="glass-card p-4 text-center">
                        <div className="text-2xl mb-1">📊</div>
                        <div className="text-xs text-white/50 uppercase">DEX</div>
                        <div className="text-sm font-bold text-white">Raydium</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-2xl mb-1">⛓️</div>
                        <div className="text-xs text-white/50 uppercase">Chain</div>
                        <div className="text-sm font-bold text-white">Solana</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-2xl mb-1">🔥</div>
                        <div className="text-xs text-white/50 uppercase">Launch</div>
                        <div className="text-sm font-bold text-white">Pump.fun</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-2xl mb-1">✅</div>
                        <div className="text-xs text-white/50 uppercase">Status</div>
                        <div className="text-sm font-bold text-kfh-teal">Verified</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
