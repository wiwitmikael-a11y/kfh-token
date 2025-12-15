'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PriceData {
    price: string
    priceChange24h: number
    marketCap: string
    volume24h: string
}

export default function PriceTicker() {
    const [priceData, setPriceData] = useState<PriceData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                // Using Dexscreener API
                const response = await fetch(
                    'https://api.dexscreener.com/latest/dex/tokens/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump'
                )

                if (!response.ok) throw new Error('Failed to fetch')

                const data = await response.json()

                if (data.pairs && data.pairs.length > 0) {
                    const pair = data.pairs[0]
                    setPriceData({
                        price: parseFloat(pair.priceUsd || '0').toFixed(8),
                        priceChange24h: parseFloat(pair.priceChange?.h24 || '0'),
                        marketCap: pair.marketCap ? formatNumber(pair.marketCap) : 'N/A',
                        volume24h: pair.volume?.h24 ? formatNumber(pair.volume.h24) : 'N/A',
                    })
                }
                setError(false)
            } catch (err) {
                console.error('Price fetch error:', err)
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPrice()
        const interval = setInterval(fetchPrice, 30000) // Update every 30 seconds

        return () => clearInterval(interval)
    }, [])

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(2)}M`
        } else if (num >= 1000) {
            return `$${(num / 1000).toFixed(2)}K`
        }
        return `$${num.toFixed(2)}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 hidden lg:block"
        >
            <div className="glass-card px-6 py-3 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🐹</span>
                    <span className="font-bold text-white">$KFH</span>
                </div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-4 h-4 spinner" />
                            <span className="text-white/60 text-sm">Loading...</span>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-white/60 text-sm"
                        >
                            Price unavailable
                        </motion.div>
                    ) : priceData ? (
                        <motion.div
                            key="data"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-6 text-sm"
                        >
                            {/* Price */}
                            <div>
                                <span className="text-white/60">Price: </span>
                                <span className="font-bold text-white">${priceData.price}</span>
                            </div>

                            {/* 24h Change */}
                            <div>
                                <span className="text-white/60">24h: </span>
                                <span className={`font-bold ${priceData.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {priceData.priceChange24h >= 0 ? '+' : ''}{priceData.priceChange24h.toFixed(2)}%
                                </span>
                            </div>

                            {/* Market Cap */}
                            <div>
                                <span className="text-white/60">MCap: </span>
                                <span className="font-bold text-kfh-teal">{priceData.marketCap}</span>
                            </div>

                            {/* Volume */}
                            <div>
                                <span className="text-white/60">Vol: </span>
                                <span className="font-bold text-kfh-yellow">{priceData.volume24h}</span>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                {/* Live Indicator */}
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/40">LIVE</span>
                </div>
            </div>
        </motion.div>
    )
}
