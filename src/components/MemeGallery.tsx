'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Community memes with anonymous authors
const initialMemes = [
    {
        id: '1',
        title: 'Domain Expansion: Infinite Hamster',
        imageUrl: '/images/memes/meme-domain-expansion.jpg',
        author: 'Anonymous Warrior',
        votes: 89,
        createdAt: Date.now() - 3600000,
    },
    {
        id: '2',
        title: 'Manga Style KFH',
        imageUrl: '/images/memes/meme-manga-style.jpg',
        author: 'Mystery Degen',
        votes: 67,
        createdAt: Date.now() - 7200000,
    },
    {
        id: '3',
        title: 'Karate Master in Action',
        imageUrl: '/images/memes/meme-karate-master.jpg',
        author: 'Diamond Paws',
        votes: 112,
        createdAt: Date.now() - 1800000,
    },
    {
        id: '4',
        title: 'Ninja Turtle x KFH Crossover',
        imageUrl: '/images/memes/meme-ninja-turtle.jpg',
        author: 'Anonymous',
        votes: 95,
        createdAt: Date.now() - 86400000,
    },
    {
        id: '5',
        title: 'The Original Kung Fu Stance',
        imageUrl: '/images/memes/meme-kungfu-stance.png',
        author: 'KFH OG',
        votes: 156,
        createdAt: Date.now() - 43200000,
    },
    {
        id: '6',
        title: 'Rainbow Heaven Ascension',
        imageUrl: '/images/memes/meme-rainbow-heaven.png',
        author: 'Moon Walker',
        votes: 78,
        createdAt: Date.now() - 172800000,
    },
    {
        id: '7',
        title: 'Bruce Lee Reincarnation',
        imageUrl: '/images/memes/meme-bruce-lee.jpg',
        author: 'Anonymous Legend',
        votes: 134,
        createdAt: Date.now() - 5400000,
    },
    {
        id: '8',
        title: 'HADOUKEN! Lightning Strike',
        imageUrl: '/images/memes/meme-hadouken.png',
        author: 'Street Fighter Fan',
        votes: 201,
        createdAt: Date.now() - 9000000,
    },
    {
        id: '9',
        title: 'Anime Sensei Mode',
        imageUrl: '/images/memes/meme-anime-sensei.png',
        author: 'Degen Master',
        votes: 145,
        createdAt: Date.now() - 14400000,
    },
    {
        id: '10',
        title: 'KFH vs Minecraft Epic Battle',
        imageUrl: '/images/memes/meme-minecraft-battle.png',
        author: 'Block Warrior',
        votes: 167,
        createdAt: Date.now() - 21600000,
    },
]

type SortType = 'hot' | 'new' | 'top'

interface Meme {
    id: string
    title: string
    imageUrl: string
    author: string
    votes: number
    createdAt: number
}

export default function MemeGallery() {
    const [memes, setMemes] = useState<Meme[]>(initialMemes)
    const [sortBy, setSortBy] = useState<SortType>('hot')
    const [votedMemes, setVotedMemes] = useState<Set<string>>(new Set())
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)

    // Load votes from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('kfh-meme-votes')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setVotedMemes(new Set(parsed.voted || []))
                // Merge saved vote counts
                if (parsed.memeCounts) {
                    setMemes(prev => prev.map(meme => ({
                        ...meme,
                        votes: parsed.memeCounts[meme.id] ?? meme.votes
                    })))
                }
            } catch {
                // Invalid data, ignore
            }
        }
    }, [])

    // Save votes to localStorage
    const saveVotes = useCallback((newVoted: Set<string>, newMemes: Meme[]) => {
        const memeCounts: Record<string, number> = {}
        newMemes.forEach(m => { memeCounts[m.id] = m.votes })
        localStorage.setItem('kfh-meme-votes', JSON.stringify({
            voted: Array.from(newVoted),
            memeCounts
        }))
    }, [])

    const handleVote = useCallback((memeId: string, direction: 'up' | 'down') => {
        if (votedMemes.has(memeId)) return // Already voted

        const newVoted = new Set(votedMemes)
        newVoted.add(memeId)
        setVotedMemes(newVoted)

        const newMemes = memes.map(meme => {
            if (meme.id === memeId) {
                return {
                    ...meme,
                    votes: meme.votes + (direction === 'up' ? 1 : -1)
                }
            }
            return meme
        })
        setMemes(newMemes)
        saveVotes(newVoted, newMemes)
    }, [memes, votedMemes, saveVotes])

    const sortedMemes = [...memes].sort((a, b) => {
        switch (sortBy) {
            case 'hot':
                // Hot = votes / age (higher score for newer high-vote memes)
                const ageA = (Date.now() - a.createdAt) / 3600000
                const ageB = (Date.now() - b.createdAt) / 3600000
                return (b.votes / Math.max(ageB, 1)) - (a.votes / Math.max(ageA, 1))
            case 'new':
                return b.createdAt - a.createdAt
            case 'top':
                return b.votes - a.votes
            default:
                return 0
        }
    })

    const handleSubmitMeme = () => {
        const text = encodeURIComponent('Check out my KFH meme! 🐹🥋\n\n#KFH #KungFuHamster #Solana #Memecoin')
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
    }

    return (
        <section id="memes" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-dark via-kfh-navy to-kfh-dark" />
            <div className="absolute inset-0 bg-diagonal" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-kfh-coral/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-kfh-yellow/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-kfh-coral font-bold uppercase tracking-wider text-sm">🎨 Meme Gallery</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        <span className="gradient-text">Community</span> Memes
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        The best KFH memes from our community. Vote for your favorites! 🔥
                    </p>
                </motion.div>

                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-between gap-4 mb-8"
                >
                    {/* Sort Tabs */}
                    <div className="flex gap-2">
                        {(['hot', 'new', 'top'] as SortType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setSortBy(type)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide transition-all border-2 ${sortBy === type
                                        ? 'bg-kfh-coral text-white border-white shadow-[4px_4px_0_#1A1A2E]'
                                        : 'bg-transparent text-white/60 border-white/20 hover:border-kfh-coral hover:text-white'
                                    }`}
                            >
                                {type === 'hot' && '🔥 Hot'}
                                {type === 'new' && '✨ New'}
                                {type === 'top' && '👑 Top'}
                            </button>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        onClick={handleSubmitMeme}
                        className="neo-button text-sm py-2 px-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Submit Meme 📤
                    </motion.button>
                </motion.div>

                {/* Meme Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedMemes.map((meme, index) => (
                        <motion.div
                            key={meme.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="neo-card overflow-hidden group"
                        >
                            {/* Image */}
                            <div
                                className="aspect-square relative cursor-pointer overflow-hidden"
                                onClick={() => setSelectedMeme(meme)}
                            >
                                <Image
                                    src={meme.imageUrl}
                                    alt={meme.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-white font-bold text-sm">👆 Click to expand</span>
                                </div>

                                {/* Vote badge */}
                                <div className="absolute top-2 right-2 bg-kfh-coral text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                                    {meme.votes} 🔥
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-bold text-white mb-1 truncate text-sm">{meme.title}</h3>
                                <p className="text-xs text-white/50 mb-3">by {meme.author}</p>

                                {/* Vote Buttons */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            onClick={() => handleVote(meme.id, 'up')}
                                            disabled={votedMemes.has(meme.id)}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-all border-2 ${votedMemes.has(meme.id)
                                                    ? 'bg-kfh-coral/20 text-kfh-coral border-kfh-coral/30 cursor-not-allowed'
                                                    : 'bg-transparent border-white/20 hover:bg-kfh-coral hover:border-kfh-coral hover:text-white'
                                                }`}
                                            whileHover={!votedMemes.has(meme.id) ? { scale: 1.1 } : {}}
                                            whileTap={!votedMemes.has(meme.id) ? { scale: 0.9 } : {}}
                                        >
                                            ▲
                                        </motion.button>
                                        <span className={`font-bold text-lg ${meme.votes > 0 ? 'text-kfh-coral' : 'text-white/60'}`}>
                                            {meme.votes}
                                        </span>
                                        <motion.button
                                            onClick={() => handleVote(meme.id, 'down')}
                                            disabled={votedMemes.has(meme.id)}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-all border-2 ${votedMemes.has(meme.id)
                                                    ? 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
                                                    : 'bg-transparent border-white/20 hover:bg-kfh-teal hover:border-kfh-teal hover:text-white'
                                                }`}
                                            whileHover={!votedMemes.has(meme.id) ? { scale: 1.1 } : {}}
                                            whileTap={!votedMemes.has(meme.id) ? { scale: 0.9 } : {}}
                                        >
                                            ▼
                                        </motion.button>
                                    </div>
                                    <span className="text-xs text-white/40 font-medium">
                                        {votedMemes.has(meme.id) ? '✓ Voted' : 'Vote!'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-white/50 mb-4">Got a fire KFH meme? Share it with the community!</p>
                    <motion.button
                        onClick={handleSubmitMeme}
                        className="neo-button-secondary neo-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Share Your Meme on X 🐦
                    </motion.button>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedMeme && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                        onClick={() => setSelectedMeme(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-3xl w-full neo-card overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src={selectedMeme.imageUrl}
                                    alt={selectedMeme.title}
                                    fill
                                    className="object-contain bg-black"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{selectedMeme.title}</h3>
                                <p className="text-white/60 mb-4">by {selectedMeme.author}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-kfh-coral font-bold text-xl">
                                        🔥 {selectedMeme.votes} votes
                                    </span>
                                    <button
                                        onClick={() => setSelectedMeme(null)}
                                        className="neo-button text-sm py-2 px-6"
                                    >
                                        Close ✕
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
