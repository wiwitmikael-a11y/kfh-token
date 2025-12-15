'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useSound } from '@/contexts/SoundContext'

const CONTRACT_ADDRESS = 'GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'
const WEBSITE_URL = 'kfhamster.vercel.app'

// Background grids
const backgroundGrids = [
    { id: 'anime', name: 'Anime', src: '/images/pfp/backgrounds/grid-anime.jpg', items: ['Konoha', 'Sunny', 'Kame', 'AoT', 'UA', 'Fuji', 'City', 'Palace', 'Poke'] },
    { id: 'fantasy', name: 'Fantasy', src: '/images/pfp/backgrounds/grid-fantasy.jpg', items: ['Neon', 'Magic', 'Space', 'Sakura', 'Dojo', 'Beach', 'Cave', 'Rain', 'Epic'] },
    { id: 'kfh', name: 'KFH', src: '/images/pfp/backgrounds/grid-kfh.jpg', items: ['Synth', 'Moon', 'Dojo', 'Gate', 'Sol', 'Coins', 'Grad', 'HODL', 'Neon'] },
]

// Hamster grids - All PNG with transparent backgrounds
const hamsterGrids = [
    { id: 'jobs', name: 'Jobs', src: '/images/pfp/hamsters/grid-jobs.png', items: ['Chef', 'Doc', 'Fire', 'Farm', 'Art', 'Rock', 'Det', 'Run', 'Sci'] },
    { id: 'costumes', name: 'Costume', src: '/images/pfp/hamsters/grid-costumes.png', items: ['Super', 'Denim', 'Tux', 'Stripe', 'Floral', 'Astro', 'Bee', 'Knit', 'King'] },
    { id: 'anime', name: 'Anime', src: '/images/pfp/hamsters/grid-anime.png', items: ['Naru', 'Goku', 'Luffy', 'Sailor', 'Pika', 'Toto', 'Tan', 'Jojo', 'Deku'] },
]

export default function PFPGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedBgGrid, setSelectedBgGrid] = useState(2)
    const [selectedBgIndex, setSelectedBgIndex] = useState(0)
    const [selectedHamsterGrid, setSelectedHamsterGrid] = useState(0)
    const [selectedHamsterIndex, setSelectedHamsterIndex] = useState(0)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)
    const [hamsterImage, setHamsterImage] = useState<HTMLImageElement | null>(null)
    const { playPop, playClick, playSuccess, playWhoosh } = useSound()

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

    const generatePFP = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || !bgImage || !hamsterImage) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 512
        canvas.width = size
        canvas.height = size

        const bgCellW = bgImage.width / 3, bgCellH = bgImage.height / 3
        const bgRow = Math.floor(selectedBgIndex / 3), bgCol = selectedBgIndex % 3
        const hamCellW = hamsterImage.width / 3, hamCellH = hamsterImage.height / 3
        const hamRow = Math.floor(selectedHamsterIndex / 3), hamCol = selectedHamsterIndex % 3

        ctx.clearRect(0, 0, size, size)

        // Layer 1: Background
        ctx.drawImage(bgImage, bgCol * bgCellW, bgRow * bgCellH, bgCellW, bgCellH, 0, 0, size, size)

        // Layer 2: Hamster (rendered directly without black bg removal)
        const margin = 35
        const hamSize = size - margin * 2
        ctx.drawImage(hamsterImage, hamCol * hamCellW, hamRow * hamCellH, hamCellW, hamCellH, margin, margin + 15, hamSize, hamSize)

        // Layer 3: Neo-Pop Anime Frame
        drawAnimeFrame(ctx, size)

        setPreviewUrl(canvas.toDataURL('image/png'))
    }, [bgImage, hamsterImage, selectedBgIndex, selectedHamsterIndex])

    const drawAnimeFrame = (ctx: CanvasRenderingContext2D, size: number) => {
        const border = 10
        const radius = 20

        // === OUTER FRAME - Thick white stroke with coral shadow ===
        ctx.save()
        ctx.shadowColor = '#FF6B6B'
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 4
        ctx.shadowOffsetY = 4
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = border
        ctx.beginPath()
        ctx.roundRect(border / 2, border / 2, size - border, size - border, radius)
        ctx.stroke()
        ctx.restore()

        // Inner coral stroke
        ctx.strokeStyle = '#FF6B6B'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.roundRect(border + 4, border + 4, size - border * 2 - 8, size - border * 2 - 8, radius - 4)
        ctx.stroke()

        // === TOP BANNER ===
        const bannerH = 42
        const bannerY = border + 2

        // Banner background with gradient
        const bannerGrad = ctx.createLinearGradient(0, bannerY, 0, bannerY + bannerH)
        bannerGrad.addColorStop(0, '#FF6B6B')
        bannerGrad.addColorStop(1, '#F5576C')
        ctx.fillStyle = bannerGrad
        ctx.beginPath()
        ctx.roundRect(border + 2, bannerY, size - border * 2 - 4, bannerH, [radius - 6, radius - 6, 0, 0])
        ctx.fill()

        // Banner stroke
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 3
        ctx.stroke()

        // Token name with thick stroke effect
        ctx.font = 'bold 22px "Arial Black", Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Text stroke (outline)
        ctx.strokeStyle = '#1A1A2E'
        ctx.lineWidth = 5
        ctx.strokeText('KUNG FU HAMSTER', size / 2, bannerY + bannerH / 2 + 1)

        // Text fill
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText('KUNG FU HAMSTER', size / 2, bannerY + bannerH / 2 + 1)

        // $KFH badge
        const badgeW = 50, badgeH = 24
        const badgeX = size - border - badgeW - 8
        const badgeY2 = bannerY + (bannerH - badgeH) / 2

        ctx.fillStyle = '#FFE66D'
        ctx.beginPath()
        ctx.roundRect(badgeX, badgeY2, badgeW, badgeH, 6)
        ctx.fill()
        ctx.strokeStyle = '#1A1A2E'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.font = 'bold 12px Arial'
        ctx.fillStyle = '#1A1A2E'
        ctx.fillText('$KFH', badgeX + badgeW / 2, badgeY2 + badgeH / 2 + 1)

        // === BOTTOM INFO BAR ===
        const bottomH = 48
        const bottomY = size - border - bottomH - 2

        // Bottom background
        const bottomGrad = ctx.createLinearGradient(0, bottomY, 0, bottomY + bottomH)
        bottomGrad.addColorStop(0, 'rgba(26, 26, 46, 0.95)')
        bottomGrad.addColorStop(1, 'rgba(15, 15, 26, 0.98)')
        ctx.fillStyle = bottomGrad
        ctx.beginPath()
        ctx.roundRect(border + 2, bottomY, size - border * 2 - 4, bottomH, [0, 0, radius - 6, radius - 6])
        ctx.fill()

        // Bottom stroke
        ctx.strokeStyle = '#4ECDC4'
        ctx.lineWidth = 2
        ctx.stroke()

        // Website URL - larger, more visible
        ctx.font = 'bold 14px Arial'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#4ECDC4'
        ctx.fillText('🌐 ' + WEBSITE_URL, size / 2, bottomY + 16)

        // CA - auto-fit to frame width
        const caText = 'CA: ' + CONTRACT_ADDRESS
        const maxWidth = size - border * 2 - 24

        // Find the right font size to fit
        let fontSize = 11
        ctx.font = `bold ${fontSize}px monospace`
        while (ctx.measureText(caText).width > maxWidth && fontSize > 6) {
            fontSize--
            ctx.font = `bold ${fontSize}px monospace`
        }

        ctx.fillStyle = '#FFE66D'
        ctx.fillText(caText, size / 2, bottomY + 35)

        // === DECORATIVE CORNERS ===
        const cornerLen = 12
        ctx.strokeStyle = '#FFE66D'
        ctx.lineWidth = 3

        // Top-left corner (below banner)
        const cornerTop = bannerY + bannerH + 4
        ctx.beginPath()
        ctx.moveTo(border + 6, cornerTop + cornerLen)
        ctx.lineTo(border + 6, cornerTop)
        ctx.lineTo(border + 6 + cornerLen, cornerTop)
        ctx.stroke()

        // Top-right corner (below banner)
        ctx.beginPath()
        ctx.moveTo(size - border - 6 - cornerLen, cornerTop)
        ctx.lineTo(size - border - 6, cornerTop)
        ctx.lineTo(size - border - 6, cornerTop + cornerLen)
        ctx.stroke()

        // Bottom-left corner (above info bar)
        const cornerBot = bottomY - 4
        ctx.beginPath()
        ctx.moveTo(border + 6, cornerBot - cornerLen)
        ctx.lineTo(border + 6, cornerBot)
        ctx.lineTo(border + 6 + cornerLen, cornerBot)
        ctx.stroke()

        // Bottom-right corner (above info bar)
        ctx.beginPath()
        ctx.moveTo(size - border - 6 - cornerLen, cornerBot)
        ctx.lineTo(size - border - 6, cornerBot)
        ctx.lineTo(size - border - 6, cornerBot - cornerLen)
        ctx.stroke()
    }

    const randomGenerate = () => {
        setSelectedBgGrid(Math.floor(Math.random() * 3))
        setSelectedBgIndex(Math.floor(Math.random() * 9))
        setSelectedHamsterGrid(Math.floor(Math.random() * 3))
        setSelectedHamsterIndex(Math.floor(Math.random() * 9))
    }

    useEffect(() => {
        if (bgImage && hamsterImage) {
            const timer = setTimeout(generatePFP, 50)
            return () => clearTimeout(timer)
        }
    }, [bgImage, hamsterImage, selectedBgIndex, selectedHamsterIndex, generatePFP])

    const downloadPFP = () => {
        if (!previewUrl) return
        const link = document.createElement('a')
        link.download = `KFH-PFP-${Date.now()}.png`
        link.href = previewUrl
        link.click()
    }

    return (
        <section id="pfp" className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-navy via-kfh-dark to-kfh-navy" />

            <div className="relative max-w-5xl mx-auto px-4">
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
                    <p className="text-white/50 text-sm mt-2">27 × 27 = 729 unique combinations!</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 flex flex-col items-center"
                    >
                        <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-kfh-coral/20">
                            <canvas ref={canvasRef} width={512} height={512} className="w-full h-full" />
                        </div>

                        <div className="flex gap-3 mt-5">
                            <motion.button onClick={randomGenerate} className="neo-button text-sm py-2 px-5" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                🎲 Random
                            </motion.button>
                            <motion.button onClick={downloadPFP} disabled={!previewUrl} className="neo-button-secondary neo-button text-sm py-2 px-5" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                📥 Download
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 space-y-4"
                    >
                        {/* Background */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-white">🖼️ Background</span>
                                <div className="flex gap-1">
                                    {backgroundGrids.map((g, i) => (
                                        <button key={g.id} onClick={() => { setSelectedBgGrid(i); setSelectedBgIndex(0); }}
                                            className={`px-2 py-1 text-xs font-bold rounded transition-all ${selectedBgGrid === i ? 'bg-kfh-coral text-white' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}>
                                            {g.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-9 gap-1">
                                {backgroundGrids[selectedBgGrid].items.map((name, idx) => (
                                    <button key={idx} onClick={() => setSelectedBgIndex(idx)} title={name}
                                        className={`aspect-square rounded text-[9px] font-bold transition-all ${selectedBgIndex === idx ? 'bg-kfh-coral text-white ring-2 ring-white' : 'bg-white/10 text-white/40 hover:bg-white/20'}`}>
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hamster */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-white">🐹 Hamster</span>
                                <div className="flex gap-1">
                                    {hamsterGrids.map((g, i) => (
                                        <button key={g.id} onClick={() => { setSelectedHamsterGrid(i); setSelectedHamsterIndex(0); }}
                                            className={`px-2 py-1 text-xs font-bold rounded transition-all ${selectedHamsterGrid === i ? 'bg-kfh-teal text-white' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}>
                                            {g.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-9 gap-1">
                                {hamsterGrids[selectedHamsterGrid].items.map((name, idx) => (
                                    <button key={idx} onClick={() => setSelectedHamsterIndex(idx)} title={name}
                                        className={`aspect-square rounded text-[9px] font-bold transition-all ${selectedHamsterIndex === idx ? 'bg-kfh-teal text-white ring-2 ring-white' : 'bg-white/10 text-white/40 hover:bg-white/20'}`}>
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs text-white/40 text-center">💡 Tip: Jobs hamsters have perfect transparency!</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
