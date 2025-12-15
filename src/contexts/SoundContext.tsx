'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react'

interface SoundContextType {
    soundEnabled: boolean
    toggleSound: () => void
    playPunch: () => void
    playGong: () => void
    playSwoosh: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

// Web Audio API sound generators
class SoundGenerator {
    private audioContext: AudioContext | null = null

    private getContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        }
        return this.audioContext
    }

    // Punch sound - short percussive hit
    playPunch() {
        const ctx = this.getContext()
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'square'
        oscillator.frequency.setValueAtTime(150, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1)

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.1)
    }

    // Gong sound - resonant metallic hit
    playGong() {
        const ctx = this.getContext()
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(220, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.8)

        gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.8)

        // Add harmonics
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(440, ctx.currentTime)
        osc2.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.6)
        gain2.gain.setValueAtTime(0.2, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6)
        osc2.start(ctx.currentTime)
        osc2.stop(ctx.currentTime + 0.6)
    }

    // Swoosh sound - noise sweep
    playSwoosh() {
        const ctx = this.getContext()
        const bufferSize = ctx.sampleRate * 0.15
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
        }

        const source = ctx.createBufferSource()
        const gainNode = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        source.buffer = buffer
        filter.type = 'highpass'
        filter.frequency.setValueAtTime(1000, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.15)

        source.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

        source.start(ctx.currentTime)
    }
}

export function SoundProvider({ children }: { children: ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(false)
    const soundGeneratorRef = useRef<SoundGenerator | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem('kfh-sound')
        if (saved !== null) {
            setSoundEnabled(saved === 'true')
        }
        soundGeneratorRef.current = new SoundGenerator()
    }, [])

    useEffect(() => {
        localStorage.setItem('kfh-sound', String(soundEnabled))
    }, [soundEnabled])

    const toggleSound = useCallback(() => {
        setSoundEnabled(prev => !prev)
    }, [])

    const playPunch = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) {
            soundGeneratorRef.current.playPunch()
        }
    }, [soundEnabled])

    const playGong = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) {
            soundGeneratorRef.current.playGong()
        }
    }, [soundEnabled])

    const playSwoosh = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) {
            soundGeneratorRef.current.playSwoosh()
        }
    }, [soundEnabled])

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound, playPunch, playGong, playSwoosh }}>
            {children}
        </SoundContext.Provider>
    )
}

export function useSound() {
    const context = useContext(SoundContext)
    if (!context) {
        throw new Error('useSound must be used within SoundProvider')
    }
    return context
}
