'use client'

import { motion } from 'framer-motion'

export default function PFPGenerator() {
    return (
        <section id="pfp" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-navy via-kfh-dark to-kfh-navy" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kfh-purple/50 to-transparent" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-kfh-pink/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-kfh-purple/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="text-kfh-purple font-bold uppercase tracking-wider text-sm">PFP Generator</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        Create Your <span className="gradient-text">KFH Avatar</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg mb-12">
                        Stand out as a true KFH warrior! Layer backgrounds, accessories, and outfits
                        to create your unique profile picture.
                    </p>
                </motion.div>

                {/* Coming Soon Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-card-strong p-12 text-center"
                >
                    {/* Animated Icon */}
                    <motion.div
                        className="text-8xl mb-8"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        🎨
                    </motion.div>

                    {/* Coming Soon Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-6"
                    >
                        <span className="w-2 h-2 bg-kfh-yellow rounded-full animate-pulse" />
                        <span className="text-xl font-bold gradient-text">COMING SOON</span>
                        <span className="w-2 h-2 bg-kfh-yellow rounded-full animate-pulse" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                        PFP Generator is Under Construction 🛠️
                    </h3>
                    <p className="text-white/60 max-w-md mx-auto mb-8">
                        We're cooking up something special! Soon you'll be able to create custom
                        KFH profile pictures with unique backgrounds, accessories, and outfits.
                    </p>

                    {/* Features Preview */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        <div className="glass-card p-4">
                            <span className="text-3xl mb-2 block">🖼️</span>
                            <span className="text-sm text-white/60">Custom Backgrounds</span>
                        </div>
                        <div className="glass-card p-4">
                            <span className="text-3xl mb-2 block">👒</span>
                            <span className="text-sm text-white/60">Head Accessories</span>
                        </div>
                        <div className="glass-card p-4">
                            <span className="text-3xl mb-2 block">👔</span>
                            <span className="text-sm text-white/60">Outfits & More</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <p className="text-white/40 text-sm">
                        Follow our community for updates! 🚀
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
