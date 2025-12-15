'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react'

interface SoundContextType {
    soundEnabled: boolean
    bgmEnabled: boolean
    toggleSound: () => void
    toggleBgm: () => void
    playClick: () => void
    playHover: () => void
    playSuccess: () => void
    playPunch: () => void
    playGong: () => void
    playSwoosh: () => void
    playPop: () => void
    playCoin: () => void
    playWhoosh: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

// Web Audio API sound generators - Fresh & Fun theme
class SoundGenerator {
    private audioContext: AudioContext | null = null
    private isBgmPlaying: boolean = false
    private bgmInterval: number | null = null

    private getContext(): AudioContext {
        if (!this.audioContext || this.audioContext.state === 'closed') {
            this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume()
        }
        return this.audioContext
    }

    // Click sound - bright digital blip (LOUDER)
    playClick() {
        const ctx = this.getContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(880, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.06)

        gain.gain.setValueAtTime(0.4, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.06)
    }

    // Hover sound - subtle sparkle (LOUDER)
    playHover() {
        const ctx = this.getContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(1400, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04)

        gain.gain.setValueAtTime(0.25, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.04)
    }

    // Success sound - happy ascending arpeggio (LOUDER & BRIGHTER)
    playSuccess() {
        const ctx = this.getContext()
        const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.type = 'sine'
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)

            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08)
            gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + i * 0.08 + 0.02)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15)

            osc.start(ctx.currentTime + i * 0.08)
            osc.stop(ctx.currentTime + i * 0.08 + 0.15)
        })
    }

    // Pop sound - bubbly pop (LOUDER)
    playPop() {
        const ctx = this.getContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(600, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1)

        gain.gain.setValueAtTime(0.5, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.1)
    }

    // Coin sound - SUPER bright arcade coin (MUCH LOUDER)
    playCoin() {
        const ctx = this.getContext()

        // First note
        const osc1 = ctx.createOscillator()
        const gain1 = ctx.createGain()
        osc1.connect(gain1)
        gain1.connect(ctx.destination)
        osc1.type = 'square'
        osc1.frequency.setValueAtTime(987.77, ctx.currentTime) // B5
        gain1.gain.setValueAtTime(0.3, ctx.currentTime)
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
        osc1.start(ctx.currentTime)
        osc1.stop(ctx.currentTime + 0.1)

        // Second note (higher)
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.type = 'square'
        osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.1) // E6
        gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.1)
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
        osc2.start(ctx.currentTime + 0.1)
        osc2.stop(ctx.currentTime + 0.25)
    }

    // Whoosh sound - fast swoosh (LOUDER)
    playWhoosh() {
        const ctx = this.getContext()
        const bufferSize = ctx.sampleRate * 0.2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize
            data[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * 0.7
        }

        const source = ctx.createBufferSource()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        source.buffer = buffer
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(800, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + 0.1)
        filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2)

        source.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        gain.gain.setValueAtTime(0.4, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

        source.start(ctx.currentTime)
    }

    // Punch sound - martial arts hit (LOUDER)
    playPunch() {
        const ctx = this.getContext()
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'square'
        oscillator.frequency.setValueAtTime(180, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12)

        gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.12)
    }

    // Gong sound - kung fu gong (LOUDER)
    playGong() {
        const ctx = this.getContext()
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(220, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 1)

        gainNode.gain.setValueAtTime(0.6, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 1)

        // Harmonics
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(440, ctx.currentTime)
        osc2.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.8)
        gain2.gain.setValueAtTime(0.3, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8)
        osc2.start(ctx.currentTime)
        osc2.stop(ctx.currentTime + 0.8)
    }

    // Swoosh sound - ninja swoosh (LOUDER)
    playSwoosh() {
        const ctx = this.getContext()
        const bufferSize = ctx.sampleRate * 0.18
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
        filter.frequency.setValueAtTime(1500, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(5000, ctx.currentTime + 0.18)

        source.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18)

        source.start(ctx.currentTime)
    }

    // BGM - CHEERFUL UPBEAT 8-bit style loop
    startBgm() {
        if (this.isBgmPlaying) return

        const ctx = this.getContext()
        this.isBgmPlaying = true

        // Cheerful melody notes (happy major key)
        const melody = [
            523.25, 587.33, 659.25, 783.99, // C D E G (ascending happy)
            783.99, 659.25, 587.33, 523.25, // G E D C (descending)
            523.25, 659.25, 783.99, 1046.50, // C E G C (arpeggio up)
            783.99, 659.25, 523.25, 392.00, // G E C G (down)
        ]

        let noteIndex = 0
        const tempo = 200 // ms per note

        const playNote = () => {
            if (!this.isBgmPlaying) return

            const freq = melody[noteIndex % melody.length]

            // Main melody oscillator
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.type = 'square' // 8-bit style
            osc.frequency.value = freq

            gain.gain.setValueAtTime(0.12, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.15)

            // Bass note on every 4th beat
            if (noteIndex % 4 === 0) {
                const bass = ctx.createOscillator()
                const bassGain = ctx.createGain()
                bass.connect(bassGain)
                bassGain.connect(ctx.destination)
                bass.type = 'triangle'
                bass.frequency.value = freq / 4
                bassGain.gain.setValueAtTime(0.15, ctx.currentTime)
                bassGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
                bass.start(ctx.currentTime)
                bass.stop(ctx.currentTime + 0.3)
            }

            // Percussion on every 2nd beat
            if (noteIndex % 2 === 0) {
                const percBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate)
                const percData = percBuffer.getChannelData(0)
                for (let i = 0; i < percData.length; i++) {
                    percData[i] = (Math.random() * 2 - 1) * (1 - i / percData.length)
                }
                const perc = ctx.createBufferSource()
                const percGain = ctx.createGain()
                const percFilter = ctx.createBiquadFilter()
                perc.buffer = percBuffer
                percFilter.type = 'highpass'
                percFilter.frequency.value = 6000
                perc.connect(percFilter)
                percFilter.connect(percGain)
                percGain.connect(ctx.destination)
                percGain.gain.value = 0.08
                perc.start(ctx.currentTime)
            }

            noteIndex++
        }

        // Start the loop
        playNote()
        this.bgmInterval = window.setInterval(playNote, tempo)
    }

    stopBgm() {
        this.isBgmPlaying = false
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval)
            this.bgmInterval = null
        }
    }
}

export function SoundProvider({ children }: { children: ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(false)
    const [bgmEnabled, setBgmEnabled] = useState(false)
    const soundGeneratorRef = useRef<SoundGenerator | null>(null)

    useEffect(() => {
        const savedSound = localStorage.getItem('kfh-sound')
        const savedBgm = localStorage.getItem('kfh-bgm')
        if (savedSound !== null) setSoundEnabled(savedSound === 'true')
        if (savedBgm !== null) setBgmEnabled(savedBgm === 'true')
        soundGeneratorRef.current = new SoundGenerator()
    }, [])

    useEffect(() => {
        localStorage.setItem('kfh-sound', String(soundEnabled))
    }, [soundEnabled])

    useEffect(() => {
        localStorage.setItem('kfh-bgm', String(bgmEnabled))
        if (bgmEnabled && soundGeneratorRef.current) {
            soundGeneratorRef.current.startBgm()
        } else if (soundGeneratorRef.current) {
            soundGeneratorRef.current.stopBgm()
        }
    }, [bgmEnabled])

    const toggleSound = useCallback(() => setSoundEnabled(prev => !prev), [])
    const toggleBgm = useCallback(() => setBgmEnabled(prev => !prev), [])

    const playClick = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playClick()
    }, [soundEnabled])

    const playHover = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playHover()
    }, [soundEnabled])

    const playSuccess = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playSuccess()
    }, [soundEnabled])

    const playPunch = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playPunch()
    }, [soundEnabled])

    const playGong = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playGong()
    }, [soundEnabled])

    const playSwoosh = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playSwoosh()
    }, [soundEnabled])

    const playPop = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playPop()
    }, [soundEnabled])

    const playCoin = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playCoin()
    }, [soundEnabled])

    const playWhoosh = useCallback(() => {
        if (soundEnabled && soundGeneratorRef.current) soundGeneratorRef.current.playWhoosh()
    }, [soundEnabled])

    return (
        <SoundContext.Provider value={{
            soundEnabled, bgmEnabled, toggleSound, toggleBgm,
            playClick, playHover, playSuccess, playPunch, playGong, playSwoosh, playPop, playCoin, playWhoosh
        }}>
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
