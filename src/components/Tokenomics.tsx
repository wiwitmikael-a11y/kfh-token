'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Tokenomics() {
    const { t } = useLanguage()

    const tokenomicsData = [
        { labelKey: 'tokenomics.supply', value: '1B', icon: '💰' },
        { labelKey: 'tokenomics.taxLabel', value: '0%', icon: '✨' },
        { labelKey: 'tokenomics.lpStatus', valueKey: 'tokenomics.burned', icon: '🔒' },
        { labelKey: 'tokenomics.contract', valueKey: 'tokenomics.renounced', icon: '📜' },
    ]

    return (
        <section id="tokenomics" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-dark via-kfh-navy to-kfh-dark" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kfh-teal/50 to-transparent" />

            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 right-20 text-6xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                ⚙️
            </motion.div>
            <motion.div
                className="absolute bottom-20 left-20 text-5xl opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
                💎
            </motion.div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-kfh-coral/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-kfh-purple/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-kfh-teal font-bold uppercase tracking-wider text-sm">{t('tokenomics.label')}</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        <span className="gradient-text">{t('tokenomics.title')}</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        {t('tokenomics.desc')}
                    </p>
                </motion.div>

                {/* Main Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {tokenomicsData.map((item, index) => (
                        <motion.div
                            key={item.labelKey}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 text-center card-hover group gradient-border"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                                {item.valueKey ? t(item.valueKey) : item.value}
                            </div>
                            <div className="text-white/60 text-sm uppercase tracking-wider">{t(item.labelKey)}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Distribution Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="glass-card-strong p-8 sm:p-12">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Donut Chart */}
                            <div className="relative">
                                <div className="relative w-64 h-64 mx-auto">
                                    {/* Outer Ring */}
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="12"
                                        />
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="12"
                                            strokeLinecap="round"
                                            strokeDasharray="251.2"
                                            initial={{ strokeDashoffset: 251.2 }}
                                            whileInView={{ strokeDashoffset: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 2, ease: 'easeOut' }}
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#FF6B6B" />
                                                <stop offset="50%" stopColor="#FFE66D" />
                                                <stop offset="100%" stopColor="#4ECDC4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Center Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 1 }}
                                        >
                                            <span className="text-5xl">🐹</span>
                                        </motion.div>
                                        <div className="text-3xl font-black gradient-text mt-2">100%</div>
                                        <div className="text-white/60 text-sm">{t('about.community')}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white">
                                    {t('tokenomics.title')}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-kfh-coral to-kfh-pink" />
                                        <span className="text-white/80">{t('tokenomics.communityNote')}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-kfh-teal" />
                                        <span className="text-white/80">No team allocation</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-kfh-yellow" />
                                        <span className="text-white/80">No presale or VC backing</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-kfh-purple" />
                                        <span className="text-white/80">LP tokens permanently burned</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="glass-card p-4 flex items-center gap-4">
                                        <span className="text-3xl">🔥</span>
                                        <div>
                                            <div className="font-bold text-kfh-coral">100% Safe</div>
                                            <div className="text-sm text-white/60">Contract renounced, LP burned</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-white/60 mb-6">{t('community.ready')}</p>
                    <motion.a
                        href="https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-button inline-flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{t('community.buyNow')}</span>
                        <span className="text-xl">🥋</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
