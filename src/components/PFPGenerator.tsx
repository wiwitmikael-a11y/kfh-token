'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const CONTRACT_ADDRESS = 'GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'

// Background grids
const backgroundGrids = [
    { id: 'anime', name: 'Anime', src: '/images/pfp/backgrounds/grid-anime.jpg', items: ['Konoha', 'Sunny Go', 'Kame House', 'AoT', 'UA High', 'Fuji', 'City', 'Palace', 'Pokemon'] },
    { id: 'fantasy', name: 'Fantasy', src: '/images/pfp/backgrounds/grid-fantasy.jpg', items: ['Neon', 'Magic', 'Space', 'Sakura', 'Dojo', 'Beach', 'Cave', 'Rain', 'Epic'] },
    { id: 'kfh', name: 'KFH', src: '/images/pfp/backgrounds/grid-kfh.jpg', items: ['Synth', 'Moon', 'Dojo', 'Gate', 'Sol', 'Coins', 'Grad', 'HODL', 'Neon'] },
]

// Hamster grids - Note: Jobs has transparent bg, others need chroma key
const hamsterGrids = [
    { id: 'jobs', name: 'Jobs', src: '/images/pfp/hamsters/grid-jobs.png', items: ['Chef', 'Doc', 'Fire', 'Farm', 'Art', 'Rock', 'Det', 'Run', 'Sci'], hasBlackBg: false },
    { id: 'costumes', name: 'Costumes', src: '/images/pfp/hamsters/grid-costumes.jpg', items: ['Super', 'Denim', 'Tux', 'Stripe', 'Floral', 'Astro', 'Bee', 'Knit', 'King'], hasBlackBg: true },
    { id: 'anime', name: 'Anime', src: '/images/pfp/hamsters/grid-anime.jpg', items: ['Naru', 'Goku', 'Luffy', 'Sailor', 'Pika', 'Toto', 'Tan', 'Jojo', 'Deku'], hasBlackBg: true },
]

export default function PFPGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedBgGrid, setSelectedBgGrid] = useState(2) // Start with KFH theme
    const [selectedBgIndex, setSelectedBgIndex] = useState(0)
    const [selectedHamsterGrid, setSelectedHamsterGrid] = useState(0) // Start with Jobs (transparent)
    const [selectedHamsterIndex, setSelectedHamsterIndex] = useState(0)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)
    const [hamsterImage, setHamsterImage] = useState<HTMLImageElement | null>(null)

    // Load images
    useEffect(() => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => setBgImage(img)
        img.src = backgroundGrids[selectedBgGrid].src
    }, [selectedBgGrid])

    useEffect(() => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => setHamsterImage(img)
        img.src = hamsterGrids[selectedHamsterGrid].src
    }, [selectedHamsterGrid])

    // Remove black background from image data
    const removeBlackBackground = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
        const imageData = ctx.getImageData(x, y, w, h)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            // If pixel is very dark (close to black), make it transparent
            const brightness = (r + g + b) / 3
            if (brightness < 25) {
                data[i + 3] = 0 // Set alpha to 0 (transparent)
            } else if (brightness < 50) {
                // Fade out near-black pixels
                data[i + 3] = Math.floor((brightness - 25) * 10)
            }
        }

        ctx.putImageData(imageData, x, y)
    }

    // Generate PFP
    const generatePFP = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || !bgImage || !hamsterImage) return

        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        const size = 512
        canvas.width = size
        canvas.height = size

        // Calculate crop positions
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

        // Layer 1: Background (full)
        ctx.drawImage(bgImage, bgCol * bgCellW, bgRow * bgCellH, bgCellW, bgCellH, 0, 0, size, size)

        // Layer 2: Hamster
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = size
        tempCanvas.height = size
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true })

        if (tempCtx) {
            const hamsterMargin = 40
            const hamsterSize = size - hamsterMargin * 2

            tempCtx.drawImage(
                hamsterImage,
                hamCol * hamCellW, hamRow * hamCellH, hamCellW, hamCellH,
                hamsterMargin, hamsterMargin + 10, hamsterSize, hamsterSize
            )

            // Remove black background if needed
            if (hamsterGrids[selectedHamsterGrid].hasBlackBg) {
                removeBlackBackground(tempCtx, 0, 0, size, size)
            }

            ctx.drawImage(tempCanvas, 0, 0)
        }

        // Layer 3: Clean frame
        drawFrame(ctx, size)

        setPreviewUrl(canvas.toDataURL('image/png'))
    }, [bgImage, hamsterImage, selectedBgIndex, selectedHamsterIndex, selectedHamsterGrid])

    // Draw clean trading card frame
    const drawFrame = (ctx: CanvasRenderingContext2D, size: number) => {
        const border = 8
        const radius = 16

        // Outer white glow
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
        ctx.shadowBlur = 10
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = border
        ctx.beginPath()
        ctx.roundRect(border / 2, border / 2, size - border, size - border, radius)
        ctx.stroke()
        ctx.shadowBlur = 0

        // Inner accent
        ctx.strokeStyle = '#FF6B6B'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.roundRect(border + 2, border + 2, size - border * 2 - 4, size - border * 2 - 4, radius - 2)
        ctx.stroke()

        // Top badge
        const badgeW = 180
        const badgeH = 32
        const badgeX = (size - badgeW) / 2
        const badgeY = 12

        // Badge background
        ctx.fillStyle = '#FF6B6B'
        ctx.beginPath()
        ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 8)
        ctx.fill()

        // Badge text
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 14px "Space Grotesk", Arial'
        ctx.textAlign = 'center'
        ctx.fillText('KUNG FU HAMSTER', size / 2, badgeY + 21)

        // Bottom CA bar
        const caBarH = 28
        const caBarY = size - border - caBarH - 4

        // CA background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        ctx.beginPath()
        ctx.roundRect(border + 4, caBarY, size - border * 2 - 8, caBarH, 6)
        ctx.fill()

        // CA text
        ctx.fillStyle = '#4ECDC4'
        ctx.font = '9px monospace'
        ctx.textAlign = 'center'
        const shortCA = CONTRACT_ADDRESS.slice(0, 12) + '...' + CONTRACT_ADDRESS.slice(-8)
        ctx.fillText('CA: ' + shortCA, size / 2, caBarY + 18)

        // $KFH corner badge
        ctx.fillStyle = '#FFE66D'
        ctx.beginPath()
        ctx.roundRect(size - 60, 12, 48, 24, 6)
        ctx.fill()
        ctx.fillStyle = '#1A1A2E'
        ctx.font = 'bold 12px Arial'
        ctx.fillText('$KFH', size - 36, 28)
    }

    // Random
    const randomGenerate = () => {
        setSelectedBgGrid(Math.floor(Math.random() * 3))
        setSelectedBgIndex(Math.floor(Math.random() * 9))
        setSelectedHamsterGrid(Math.floor(Math.random() * 3))
        setSelectedHamsterIndex(Math.floor(Math.random() * 9))
    }

    // Auto-generate
    useEffect(() => {
        if (bgImage && hamsterImage) {
            const timer = setTimeout(generatePFP, 50)
            return () => clearTimeout(timer)
        }
    }, [bgImage, hamsterImage, selectedBgIndex, selectedHamsterIndex, generatePFP])

    // Download
    const downloadPFP = () => {
        if (!previewUrl) return
        const link = document.createElement('a')
        link.download = `KFH-PFP-${Date.now()}.png`
        link.href = previewUrl
        link.click()
    }

    // Grid button component
    const GridButton = ({ name, selected, onClick }: { name: string; selected: boolean; onClick: () => void }) => (
        <button
            onClick={onClick}
            className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${selected
                    ? 'bg-kfh-coral text-white shadow-[2px_2px_0_#1A1A2E]'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
        >
            {name}
        </button>
    )

    return (
        <section id="pfp" className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-navy via-kfh-dark to-kfh-navy" />

            <div className="relative max-w-5xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <span className="text-kfh-purple font-bold uppercase tracking-wider text-xs">🎨 PFP GENERATOR</span>
                    <h2 className="text-2xl sm:text-3xl font-black mt-2">
                        <span className="gradient-text">Create Your Trading Card</span>
                    </h2>
                    <p className="text-white/50 text-sm mt-2">729 unique combinations!</p>
                </motion.div>

                {/* Main content - side by side on desktop, stacked on mobile */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 flex flex-col items-center"
                    >
                        <div className="relative w-full max-w-[320px] aspect-square rounded-xl overflow-hidden border-2 border-kfh-coral/50">
                            <canvas
                                ref={canvasRef}
                                width={512}
                                height={512}
                                className="w-full h-full"
                            />
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 mt-4">
                            <motion.button
                                onClick={randomGenerate}
                                className="neo-button text-sm py-2 px-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🎲 Random
                            </motion.button>
                            <motion.button
                                onClick={downloadPFP}
                                disabled={!previewUrl}
                                className="neo-button-secondary neo-button text-sm py-2 px-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                📥 Download
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Controls - compact */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 space-y-4"
                    >
                        {/* Background */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-white flex items-center gap-2">🖼️ Background</span>
                                <div className="flex gap-1">
                                    {backgroundGrids.map((g, i) => (
                                        <GridButton key={g.id} name={g.name} selected={selectedBgGrid === i} onClick={() => { setSelectedBgGrid(i); setSelectedBgIndex(0); }} />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-9 gap-1">
                                {backgroundGrids[selectedBgGrid].items.map((name, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedBgIndex(idx)}
                                        className={`aspect-square rounded text-[8px] font-bold transition-all ${selectedBgIndex === idx
                                                ? 'bg-kfh-coral text-white ring-2 ring-white'
                                                : 'bg-white/10 text-white/50 hover:bg-white/20'
                                            }`}
                                        title={name}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hamster */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-white flex items-center gap-2">🐹 Hamster</span>
                                <div className="flex gap-1">
                                    {hamsterGrids.map((g, i) => (
                                        <GridButton key={g.id} name={g.name} selected={selectedHamsterGrid === i} onClick={() => { setSelectedHamsterGrid(i); setSelectedHamsterIndex(0); }} />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-9 gap-1">
                                {hamsterGrids[selectedHamsterGrid].items.map((name, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedHamsterIndex(idx)}
                                        className={`aspect-square rounded text-[8px] font-bold transition-all ${selectedHamsterIndex === idx
                                                ? 'bg-kfh-teal text-white ring-2 ring-white'
                                                : 'bg-white/10 text-white/50 hover:bg-white/20'
                                            }`}
                                        title={name}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tip */}
                        <p className="text-xs text-white/40 text-center">
                            💡 Jobs hamsters have transparent backgrounds for best results!
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
