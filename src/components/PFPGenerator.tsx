'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const CONTRACT_ADDRESS = 'GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'

// Background grids (3x3 = 9 each, 3 grids = 27 total)
const backgroundGrids = [
    {
        id: 'anime',
        name: 'Anime Worlds',
        src: '/images/pfp/backgrounds/grid-anime.jpg',
        items: ['Konoha', 'Sunny Go', 'Kame House', 'AoT Town', 'UA High', 'Mt Fuji', 'City', 'Palace', 'Pokemon Center'],
    },
    {
        id: 'fantasy',
        name: 'Fantasy',
        src: '/images/pfp/backgrounds/grid-fantasy.jpg',
        items: ['Neon City', 'Cathedral', 'Space', 'Sakura', 'Dojo', 'Beach', 'Dungeon', 'Rain City', 'Sword Field'],
    },
    {
        id: 'kfh',
        name: 'KFH Theme',
        src: '/images/pfp/backgrounds/grid-kfh.jpg',
        items: ['Synthwave', 'Moon', 'KFH Dojo', 'Gate', 'Solana Dojo', 'SOL Coins', 'Gradient', 'HODL', 'Neon'],
    },
]

// Hamster grids (3x3 = 9 each, 3 grids = 27 total)
const hamsterGrids = [
    {
        id: 'jobs',
        name: 'Jobs',
        src: '/images/pfp/hamsters/grid-jobs.png',
        items: ['Chef', 'Doctor', 'Firefighter', 'Farmer', 'Artist', 'Rocker', 'Detective', 'Athlete', 'Scientist'],
    },
    {
        id: 'costumes',
        name: 'Costumes',
        src: '/images/pfp/hamsters/grid-costumes.jpg',
        items: ['Superman', 'Denim', 'Tuxedo', 'Striped', 'Floral', 'Astronaut', 'Bee', 'Sweater', 'King'],
    },
    {
        id: 'anime',
        name: 'Anime',
        src: '/images/pfp/hamsters/grid-anime.jpg',
        items: ['Naruto', 'Goku', 'Luffy', 'Sailor Moon', 'Pikachu', 'Totoro', 'Tanjiro', 'Jotaro', 'Deku'],
    },
]

export default function PFPGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedBgGrid, setSelectedBgGrid] = useState(0)
    const [selectedBgIndex, setSelectedBgIndex] = useState(0)
    const [selectedHamsterGrid, setSelectedHamsterGrid] = useState(0)
    const [selectedHamsterIndex, setSelectedHamsterIndex] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    // Load images
    const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)
    const [hamsterImage, setHamsterImage] = useState<HTMLImageElement | null>(null)

    // Load background grid image
    useEffect(() => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => setBgImage(img)
        img.src = backgroundGrids[selectedBgGrid].src
    }, [selectedBgGrid])

    // Load hamster grid image
    useEffect(() => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => setHamsterImage(img)
        img.src = hamsterGrids[selectedHamsterGrid].src
    }, [selectedHamsterGrid])

    // Generate PFP
    const generatePFP = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || !bgImage || !hamsterImage) return

        setIsGenerating(true)
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 512
        canvas.width = size
        canvas.height = size

        // Calculate crop positions (3x3 grid)
        const bgCellW = bgImage.width / 3
        const bgCellH = bgImage.height / 3
        const bgRow = Math.floor(selectedBgIndex / 3)
        const bgCol = selectedBgIndex % 3

        const hamCellW = hamsterImage.width / 3
        const hamCellH = hamsterImage.height / 3
        const hamRow = Math.floor(selectedHamsterIndex / 3)
        const hamCol = selectedHamsterIndex % 3

        // Clear canvas
        ctx.clearRect(0, 0, size, size)

        // Layer 1: Background
        ctx.drawImage(
            bgImage,
            bgCol * bgCellW, bgRow * bgCellH, bgCellW, bgCellH,
            0, 0, size, size
        )

        // Layer 2: Hamster (centered, slightly smaller)
        const hamsterScale = 0.85
        const hamsterSize = size * hamsterScale
        const hamsterOffset = (size - hamsterSize) / 2
        ctx.drawImage(
            hamsterImage,
            hamCol * hamCellW, hamRow * hamCellH, hamCellW, hamCellH,
            hamsterOffset, hamsterOffset + 20, hamsterSize, hamsterSize
        )

        // Layer 3: Frame (Neo-pop trading card style)
        drawFrame(ctx, size)

        // Generate preview URL
        const url = canvas.toDataURL('image/png')
        setPreviewUrl(url)
        setIsGenerating(false)
    }, [bgImage, hamsterImage, selectedBgIndex, selectedHamsterIndex])

    // Draw trading card frame
    const drawFrame = (ctx: CanvasRenderingContext2D, size: number) => {
        const borderWidth = 12
        const cornerRadius = 20

        // Outer border - thick coral stroke
        ctx.strokeStyle = '#FF6B6B'
        ctx.lineWidth = borderWidth
        ctx.beginPath()
        ctx.roundRect(borderWidth / 2, borderWidth / 2, size - borderWidth, size - borderWidth, cornerRadius)
        ctx.stroke()

        // Inner accent line
        ctx.strokeStyle = '#FFE66D'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.roundRect(borderWidth + 4, borderWidth + 4, size - borderWidth * 2 - 8, size - borderWidth * 2 - 8, cornerRadius - 4)
        ctx.stroke()

        // Top banner
        const bannerHeight = 50
        ctx.fillStyle = 'rgba(255, 107, 107, 0.95)'
        ctx.beginPath()
        ctx.roundRect(borderWidth, borderWidth, size - borderWidth * 2, bannerHeight, [cornerRadius - 6, cornerRadius - 6, 0, 0])
        ctx.fill()

        // Token name
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 24px "Space Grotesk", sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('KUNG FU HAMSTER', size / 2, borderWidth + 34)

        // $KFH badge
        ctx.fillStyle = '#FFE66D'
        ctx.font = 'bold 16px "Space Grotesk", sans-serif'
        ctx.fillText('$KFH', size - 50, borderWidth + 32)

        // Bottom banner for CA
        const bottomBannerY = size - borderWidth - 40
        ctx.fillStyle = 'rgba(26, 26, 46, 0.95)'
        ctx.beginPath()
        ctx.roundRect(borderWidth, bottomBannerY, size - borderWidth * 2, 40, [0, 0, cornerRadius - 6, cornerRadius - 6])
        ctx.fill()

        // CA text
        ctx.fillStyle = '#4ECDC4'
        ctx.font = '10px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('CA: ' + CONTRACT_ADDRESS.slice(0, 20) + '...', size / 2, bottomBannerY + 25)

        // Decorative corners
        const cornerSize = 15
        ctx.fillStyle = '#FFE66D'
        // Top left
        ctx.fillRect(borderWidth - 2, borderWidth + bannerHeight - 2, cornerSize, 4)
        ctx.fillRect(borderWidth - 2, borderWidth + bannerHeight - 2, 4, cornerSize)
        // Top right
        ctx.fillRect(size - borderWidth - cornerSize + 2, borderWidth + bannerHeight - 2, cornerSize, 4)
        ctx.fillRect(size - borderWidth - 2, borderWidth + bannerHeight - 2, 4, cornerSize)
        // Bottom left
        ctx.fillRect(borderWidth - 2, bottomBannerY - cornerSize + 2, 4, cornerSize)
        ctx.fillRect(borderWidth - 2, bottomBannerY - 2, cornerSize, 4)
        // Bottom right
        ctx.fillRect(size - borderWidth - 2, bottomBannerY - cornerSize + 2, 4, cornerSize)
        ctx.fillRect(size - borderWidth - cornerSize + 2, bottomBannerY - 2, cornerSize, 4)
    }

    // Random generate
    const randomGenerate = () => {
        setSelectedBgGrid(Math.floor(Math.random() * 3))
        setSelectedBgIndex(Math.floor(Math.random() * 9))
        setSelectedHamsterGrid(Math.floor(Math.random() * 3))
        setSelectedHamsterIndex(Math.floor(Math.random() * 9))
    }

    // Auto-generate when selections change
    useEffect(() => {
        if (bgImage && hamsterImage) {
            const timer = setTimeout(generatePFP, 100)
            return () => clearTimeout(timer)
        }
    }, [bgImage, hamsterImage, selectedBgIndex, selectedHamsterIndex, generatePFP])

    // Download PFP
    const downloadPFP = () => {
        if (!previewUrl) return
        const link = document.createElement('a')
        link.download = `KFH-PFP-${Date.now()}.png`
        link.href = previewUrl
        link.click()
    }

    return (
        <section id="pfp" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-navy via-kfh-dark to-kfh-navy" />
            <div className="absolute inset-0 bg-dots" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-kfh-purple font-bold uppercase tracking-wider text-sm">🎨 PFP Generator</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        Create Your <span className="gradient-text">KFH Trading Card</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Mix and match 27 backgrounds with 27 hamster variants! 729 unique combinations! 🔥
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="neo-card p-4 mb-6">
                            <canvas
                                ref={canvasRef}
                                width={512}
                                height={512}
                                className="w-full max-w-[400px] aspect-square rounded-lg"
                            />
                        </div>

                        <div className="flex gap-4 flex-wrap justify-center">
                            <motion.button
                                onClick={randomGenerate}
                                className="neo-button-secondary neo-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🎲 Random
                            </motion.button>
                            <motion.button
                                onClick={downloadPFP}
                                disabled={!previewUrl}
                                className="neo-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                📥 Download
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Background Selection */}
                        <div className="neo-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">🖼️</span> Background
                            </h3>

                            {/* Grid Tabs */}
                            <div className="flex gap-2 mb-4">
                                {backgroundGrids.map((grid, i) => (
                                    <button
                                        key={grid.id}
                                        onClick={() => { setSelectedBgGrid(i); setSelectedBgIndex(0); }}
                                        className={`px-3 py-1 rounded-lg text-sm font-bold border-2 transition-all ${selectedBgGrid === i
                                                ? 'bg-kfh-coral text-white border-white'
                                                : 'bg-transparent text-white/60 border-white/20 hover:border-kfh-coral'
                                            }`}
                                    >
                                        {grid.name}
                                    </button>
                                ))}
                            </div>

                            {/* 3x3 Grid Selector */}
                            <div className="grid grid-cols-3 gap-2">
                                {backgroundGrids[selectedBgGrid].items.map((name, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedBgIndex(idx)}
                                        className={`aspect-square rounded-lg text-xs font-bold p-2 border-2 transition-all ${selectedBgIndex === idx
                                                ? 'bg-kfh-coral/30 border-kfh-coral text-white'
                                                : 'bg-white/5 border-white/10 text-white/60 hover:border-kfh-coral/50'
                                            }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hamster Selection */}
                        <div className="neo-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">🐹</span> Hamster
                            </h3>

                            {/* Grid Tabs */}
                            <div className="flex gap-2 mb-4">
                                {hamsterGrids.map((grid, i) => (
                                    <button
                                        key={grid.id}
                                        onClick={() => { setSelectedHamsterGrid(i); setSelectedHamsterIndex(0); }}
                                        className={`px-3 py-1 rounded-lg text-sm font-bold border-2 transition-all ${selectedHamsterGrid === i
                                                ? 'bg-kfh-teal text-white border-white'
                                                : 'bg-transparent text-white/60 border-white/20 hover:border-kfh-teal'
                                            }`}
                                    >
                                        {grid.name}
                                    </button>
                                ))}
                            </div>

                            {/* 3x3 Grid Selector */}
                            <div className="grid grid-cols-3 gap-2">
                                {hamsterGrids[selectedHamsterGrid].items.map((name, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedHamsterIndex(idx)}
                                        className={`aspect-square rounded-lg text-xs font-bold p-2 border-2 transition-all ${selectedHamsterIndex === idx
                                                ? 'bg-kfh-teal/30 border-kfh-teal text-white'
                                                : 'bg-white/5 border-white/10 text-white/60 hover:border-kfh-teal/50'
                                            }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="neo-card-yellow neo-card p-4 text-center">
                            <p className="text-sm text-white/80">
                                <span className="font-bold text-kfh-yellow">729</span> unique combinations available!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
