'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Asset configurations with proper positioning for 512x512 canvas
// Base model is centered, accessories positioned relative to it

const backgrounds = [
    { id: 'none', name: 'None', src: null, gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' },
    { id: 'dojo', name: 'Dojo', src: '/images/pfp/backgrounds/dojo.png', gradient: null },
    { id: 'neon', name: 'Neon City', src: '/images/pfp/backgrounds/neon-city.png', gradient: null },
    { id: 'matrix', name: 'Matrix', src: '/images/pfp/backgrounds/matrix.png', gradient: null },
    { id: 'sunset', name: 'Sunset', src: '/images/pfp/backgrounds/sunset.png', gradient: null },
    { id: 'fire', name: 'Fire', src: '/images/pfp/backgrounds/fire.png', gradient: null },
    { id: 'galaxy', name: 'Galaxy', src: '/images/pfp/backgrounds/galaxy.png', gradient: null },
]

const headAccessories = [
    { id: 'none', name: 'None', src: null, offsetX: 0, offsetY: 0, scale: 1 },
    { id: 'headband', name: 'Headband', src: '/images/pfp/heads/headband.png', offsetX: 0, offsetY: -80, scale: 0.5 },
    { id: 'sunglasses', name: 'Sunglasses', src: '/images/pfp/heads/sunglasses.png', offsetX: 0, offsetY: -20, scale: 0.4 },
    { id: 'crown', name: 'Crown', src: '/images/pfp/heads/crown.png', offsetX: 0, offsetY: -100, scale: 0.5 },
]

const faceAccessories = [
    { id: 'none', name: 'None', src: null, offsetX: 0, offsetY: 0, scale: 1 },
    { id: 'ninja-mask', name: 'Ninja Mask', src: '/images/pfp/accessories/ninja-mask.png', offsetX: 0, offsetY: 40, scale: 0.5 },
    { id: 'laser-eyes', name: 'Laser Eyes', src: '/images/pfp/accessories/laser-eyes.png', offsetX: 0, offsetY: -10, scale: 0.6 },
]

const clothes = [
    { id: 'none', name: 'None', src: null, offsetX: 0, offsetY: 0, scale: 1 },
    { id: 'karate-gi', name: 'Karate Gi', src: '/images/pfp/clothes/karate-gi.png', offsetX: 0, offsetY: 100, scale: 0.7 },
]

const frames = [
    { id: 'none', name: 'None', style: 'none' },
    { id: 'gold', name: 'Gold', style: '8px solid #FFD700' },
    { id: 'neon-pink', name: 'Neon Pink', style: '8px solid #FF6B6B' },
    { id: 'cyber-blue', name: 'Cyber Blue', style: '8px solid #4ECDC4' },
    { id: 'purple', name: 'Purple Glow', style: '8px solid #667EEA' },
    { id: 'rainbow', name: 'Rainbow', style: 'rainbow' },
]

export default function PFPGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedBg, setSelectedBg] = useState(0)
    const [selectedHead, setSelectedHead] = useState(0)
    const [selectedFace, setSelectedFace] = useState(0)
    const [selectedClothes, setSelectedClothes] = useState(0)
    const [selectedFrame, setSelectedFrame] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [loadedImages, setLoadedImages] = useState<Map<string, HTMLImageElement>>(new Map())

    // Preload all images
    useEffect(() => {
        const imagesToLoad: string[] = [
            '/images/kfh-pfp.png', // Base model
            ...backgrounds.filter(b => b.src).map(b => b.src!),
            ...headAccessories.filter(h => h.src).map(h => h.src!),
            ...faceAccessories.filter(f => f.src).map(f => f.src!),
            ...clothes.filter(c => c.src).map(c => c.src!),
        ]

        const loadImage = (src: string): Promise<[string, HTMLImageElement]> => {
            return new Promise((resolve) => {
                const img = new Image()
                img.crossOrigin = 'anonymous'
                img.onload = () => resolve([src, img])
                img.onerror = () => resolve([src, img]) // Still resolve to not block
                img.src = src
            })
        }

        Promise.all(imagesToLoad.map(loadImage)).then((results) => {
            const imageMap = new Map(results)
            setLoadedImages(imageMap)
        })
    }, [])

    const generatePFP = useCallback(async () => {
        setIsGenerating(true)

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 512
        canvas.width = size
        canvas.height = size

        // Clear canvas
        ctx.clearRect(0, 0, size, size)

        // 1. Draw Background
        const bg = backgrounds[selectedBg]
        if (bg.src && loadedImages.has(bg.src)) {
            const bgImg = loadedImages.get(bg.src)!
            ctx.drawImage(bgImg, 0, 0, size, size)
        } else if (bg.gradient) {
            // Fallback gradient
            const gradient = ctx.createLinearGradient(0, 0, size, size)
            gradient.addColorStop(0, '#1A1A2E')
            gradient.addColorStop(1, '#16213E')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, size, size)
        }

        // 2. Draw Clothes (behind base model body)
        const clothe = clothes[selectedClothes]
        if (clothe.src && loadedImages.has(clothe.src)) {
            const clotheImg = loadedImages.get(clothe.src)!
            const clotheSize = size * clothe.scale
            const clotheX = (size - clotheSize) / 2 + clothe.offsetX
            const clotheY = (size - clotheSize) / 2 + clothe.offsetY
            ctx.drawImage(clotheImg, clotheX, clotheY, clotheSize, clotheSize)
        }

        // 3. Draw Base Model (KFH Hamster - transparent PNG)
        const baseModelSrc = '/images/kfh-pfp.png'
        if (loadedImages.has(baseModelSrc)) {
            const baseImg = loadedImages.get(baseModelSrc)!
            // Center the base model and make it take ~80% of canvas
            const baseSize = size * 0.85
            const baseX = (size - baseSize) / 2
            const baseY = (size - baseSize) / 2 + 20 // Slight offset down
            ctx.drawImage(baseImg, baseX, baseY, baseSize, baseSize)
        }

        // 4. Draw Head Accessories (on top of head)
        const head = headAccessories[selectedHead]
        if (head.src && loadedImages.has(head.src)) {
            const headImg = loadedImages.get(head.src)!
            const headSize = size * head.scale
            const headX = (size - headSize) / 2 + head.offsetX
            const headY = (size - headSize) / 2 + head.offsetY
            ctx.drawImage(headImg, headX, headY, headSize, headSize)
        }

        // 5. Draw Face Accessories (on face area)
        const face = faceAccessories[selectedFace]
        if (face.src && loadedImages.has(face.src)) {
            const faceImg = loadedImages.get(face.src)!
            const faceSize = size * face.scale
            const faceX = (size - faceSize) / 2 + face.offsetX
            const faceY = (size - faceSize) / 2 + face.offsetY
            ctx.drawImage(faceImg, faceX, faceY, faceSize, faceSize)
        }

        // 6. Draw Frame
        const frame = frames[selectedFrame]
        if (frame.style !== 'none') {
            ctx.lineWidth = 8
            if (frame.style === 'rainbow') {
                const rainbowGradient = ctx.createLinearGradient(0, 0, size, size)
                rainbowGradient.addColorStop(0, '#FF6B6B')
                rainbowGradient.addColorStop(0.2, '#FFE66D')
                rainbowGradient.addColorStop(0.4, '#4ECDC4')
                rainbowGradient.addColorStop(0.6, '#667EEA')
                rainbowGradient.addColorStop(0.8, '#F5576C')
                rainbowGradient.addColorStop(1, '#FF6B6B')
                ctx.strokeStyle = rainbowGradient
            } else {
                ctx.strokeStyle = frame.style.split(' ')[2] || '#FFD700'
            }
            ctx.strokeRect(4, 4, size - 8, size - 8)
        }

        // 7. Add KFH watermark
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.font = 'bold 20px Arial'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'bottom'
        ctx.fillText('$KFH', size - 16, size - 12)

        // Generate final image
        const dataUrl = canvas.toDataURL('image/png')
        setGeneratedImage(dataUrl)
        setIsGenerating(false)
    }, [selectedBg, selectedHead, selectedFace, selectedClothes, selectedFrame, loadedImages])

    // Auto-regenerate when selections change
    useEffect(() => {
        if (loadedImages.size > 0) {
            generatePFP()
        }
    }, [selectedBg, selectedHead, selectedFace, selectedClothes, selectedFrame, loadedImages, generatePFP])

    const downloadPFP = () => {
        if (!generatedImage) return
        const link = document.createElement('a')
        link.download = 'kfh-pfp.png'
        link.href = generatedImage
        link.click()
    }

    const shareToTwitter = () => {
        const text = encodeURIComponent('Just created my Kung Fu Hamster PFP! 🐹🥋\n\n$KFH is ACTUALLY viral!\n\n#KFH #KungFuHamster #Solana #Pumpfun')
        const url = encodeURIComponent('https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump')
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
    }

    return (
        <section id="pfp" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-kfh-navy via-kfh-dark to-kfh-navy" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kfh-purple/50 to-transparent" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-kfh-pink/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-kfh-purple/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-kfh-purple font-bold uppercase tracking-wider text-sm">PFP Generator</span>
                    <h2 className="section-title text-4xl sm:text-5xl font-black mt-4 mb-6">
                        Create Your <span className="gradient-text">KFH Avatar</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Stand out as a true KFH warrior! Layer backgrounds, accessories, and outfits
                        to create your unique profile picture.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="glass-card-strong p-6 sm:p-8">
                            <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                <span>🖼️</span> Preview
                            </h3>

                            {/* Canvas Preview */}
                            <div className="relative aspect-square max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl">
                                <canvas
                                    ref={canvasRef}
                                    className="w-full h-full"
                                    style={{ imageRendering: 'crisp-edges' }}
                                />

                                {/* Loading Overlay */}
                                <AnimatePresence>
                                    {isGenerating && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-black/50 flex items-center justify-center"
                                        >
                                            <div className="w-12 h-12 spinner" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 justify-center">
                                <motion.button
                                    onClick={downloadPFP}
                                    disabled={!generatedImage || isGenerating}
                                    className="neo-button disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Download PNG 📥
                                </motion.button>
                                <motion.button
                                    onClick={shareToTwitter}
                                    className="neo-button neo-button-secondary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Share on X 𝕏
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2 space-y-4"
                    >
                        {/* Background Selection */}
                        <div className="glass-card p-5">
                            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                <span>🎨</span> Background
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {backgrounds.map((bg, index) => (
                                    <motion.button
                                        key={bg.id}
                                        onClick={() => setSelectedBg(index)}
                                        className={`aspect-square rounded-lg overflow-hidden transition-all ${selectedBg === index
                                                ? 'ring-2 ring-kfh-coral scale-105'
                                                : 'hover:ring-1 hover:ring-white/30'
                                            }`}
                                        style={{
                                            background: bg.gradient || undefined,
                                        }}
                                        whileHover={{ scale: selectedBg === index ? 1.05 : 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {bg.src ? (
                                            <img src={bg.src} alt={bg.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-white/60">
                                                {bg.name}
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Head Accessory Selection */}
                        <div className="glass-card p-5">
                            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                <span>👒</span> Head Accessory
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {headAccessories.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setSelectedHead(index)}
                                        className={`aspect-square rounded-lg glass-card overflow-hidden transition-all flex items-center justify-center ${selectedHead === index
                                                ? 'ring-2 ring-kfh-teal'
                                                : 'hover:ring-1 hover:ring-white/30'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.src ? (
                                            <img src={item.src} alt={item.name} className="w-3/4 h-3/4 object-contain" />
                                        ) : (
                                            <span className="text-xs text-white/60">None</span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Face Accessory Selection */}
                        <div className="glass-card p-5">
                            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                <span>😎</span> Face Accessory
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {faceAccessories.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setSelectedFace(index)}
                                        className={`aspect-square rounded-lg glass-card overflow-hidden transition-all flex items-center justify-center ${selectedFace === index
                                                ? 'ring-2 ring-kfh-yellow'
                                                : 'hover:ring-1 hover:ring-white/30'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.src ? (
                                            <img src={item.src} alt={item.name} className="w-3/4 h-3/4 object-contain" />
                                        ) : (
                                            <span className="text-xs text-white/60">None</span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Clothes Selection */}
                        <div className="glass-card p-5">
                            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                <span>👔</span> Outfit
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {clothes.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setSelectedClothes(index)}
                                        className={`aspect-square rounded-lg glass-card overflow-hidden transition-all flex items-center justify-center ${selectedClothes === index
                                                ? 'ring-2 ring-kfh-purple'
                                                : 'hover:ring-1 hover:ring-white/30'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.src ? (
                                            <img src={item.src} alt={item.name} className="w-3/4 h-3/4 object-contain" />
                                        ) : (
                                            <span className="text-xs text-white/60">None</span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Frame Selection */}
                        <div className="glass-card p-5">
                            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                <span>🖼️</span> Frame
                            </h3>
                            <div className="grid grid-cols-6 gap-2">
                                {frames.map((frame, index) => (
                                    <motion.button
                                        key={frame.id}
                                        onClick={() => setSelectedFrame(index)}
                                        className={`aspect-square rounded-lg glass-card transition-all ${selectedFrame === index
                                                ? 'ring-2 ring-kfh-coral'
                                                : 'hover:ring-1 hover:ring-white/30'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div
                                            className="w-full h-full rounded flex items-center justify-center"
                                            style={{
                                                border: frame.style === 'none' ? '2px dashed rgba(255,255,255,0.3)'
                                                    : frame.style === 'rainbow' ? '3px solid transparent'
                                                        : frame.style.replace('8px', '3px'),
                                                background: frame.style === 'rainbow' ? 'linear-gradient(135deg, #FF6B6B, #FFE66D, #4ECDC4, #667EEA)' : 'transparent',
                                                backgroundClip: frame.style === 'rainbow' ? 'padding-box, border-box' : undefined,
                                            }}
                                        >
                                            <span className="text-[10px] text-white/60">{frame.name.split(' ')[0]}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Regenerate Button */}
                        <motion.button
                            onClick={generatePFP}
                            disabled={isGenerating}
                            className="w-full neo-button disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isGenerating ? 'Generating...' : 'Regenerate PFP 🔄'}
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
