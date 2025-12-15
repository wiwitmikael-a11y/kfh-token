'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
    {
        icon: '🐹',
        title: 'The Viral Legend',
        description: 'Born from the legendary kung fu hamster meme that took the internet by storm. KFH is not just a token, it\'s a movement!',
    },
    {
        icon: '🥋',
        title: 'Master of Memes',
        description: 'With its iconic martial arts stance, KFH has become the symbol of strength and determination in the meme coin world.',
    },
    {
        icon: '🚀',
        title: 'Community Driven',
        description: 'Built by the community, for the community. Join thousands of KFH warriors in our mission to the moon!',
    },
    {
        icon: '💎',
        title: 'Diamond Paws',
        description: 'True KFH holders never sell. We train our paws to hold through any market conditions. WAGMI!',
    },
]

export default function About() {
    return (
        <section id="about" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-dots opacity-20" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kfh-coral/50 to-transparent" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-kfh-purple/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-kfh-teal/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-kfh-coral font-bold uppercase tracking-wider text-sm">About KFH</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        <span className="gradient-text">The Legend</span> of the
                        <br />Kung Fu Hamster
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        From a simple meme to a global phenomenon. KFH isn&apos;t just a token - it&apos;s a lifestyle.
                        Join the martial arts master of Solana!
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Decorative Ring */}
                            <div className="absolute inset-4 border-4 border-dashed border-kfh-coral/30 rounded-3xl animate-spin-slow" />

                            {/* Main Card */}
                            <div className="glass-card p-6 h-full flex items-center justify-center shine-effect">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/images/kfh-about.png"
                                        alt="Kung Fu Hamster Story"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                className="absolute -top-4 -right-4 glass-card px-4 py-3"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <div className="text-2xl font-bold gradient-text">1000x</div>
                                <div className="text-xs text-white/50">Potential</div>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 glass-card px-4 py-3"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🔥</span>
                                    <div>
                                        <div className="text-sm font-bold text-kfh-coral">VIRAL</div>
                                        <div className="text-xs text-white/50">Trending</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Story Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold mb-6">
                            <span className="text-kfh-yellow">🥋</span> The Origin Story
                        </h3>
                        <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                            <p>
                                It all started with a single image - a tiny hamster standing in a perfect kung fu stance,
                                paws raised, ready to take on the world. The internet fell in love instantly.
                            </p>
                            <p>
                                Now, <span className="text-kfh-coral font-semibold">Kung Fu Hamster (KFH)</span> has evolved
                                from a beloved meme into the most exciting community-driven token on Solana. Our little
                                warrior embodies the spirit of every degen who refuses to give up!
                            </p>
                            <p>
                                <span className="text-kfh-teal font-semibold">KFH is ACTUALLY viral</span> - and it belongs
                                right here on Pumpfun where legends are born! 🚀
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="glass-card px-6 py-4 text-center">
                                <div className="text-2xl font-bold gradient-text">100%</div>
                                <div className="text-xs text-white/50 uppercase">Community Owned</div>
                            </div>
                            <div className="glass-card px-6 py-4 text-center">
                                <div className="text-2xl font-bold gradient-text">0%</div>
                                <div className="text-xs text-white/50 uppercase">Tax</div>
                            </div>
                            <div className="glass-card px-6 py-4 text-center">
                                <div className="text-2xl font-bold gradient-text">🔒</div>
                                <div className="text-xs text-white/50 uppercase">LP Burned</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 card-hover group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-2 text-white group-hover:text-kfh-coral transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
