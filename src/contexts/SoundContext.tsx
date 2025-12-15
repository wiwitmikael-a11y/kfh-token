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

// Web Audio API sound generators
class SoundGenerator {
    private audioContext: AudioContext | null = null
    private bgmOscillators: OscillatorNode[] = []
    private bgmGains: GainNode[] = []
    private isBgmPlaying: boolean = false

    private getContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        }
        return this.audioContext
    }

    // Click sound - quick digital blip
    playClick() {
        const ctx = this.getContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05)

        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.05)
    }

    // Hover sound - subtle high-pitched tick
    playHover() {
        const ctx = this.getContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(1200, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.03)

        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.03)
    }

    // Success sound - cheerful ascending notes
    playSuccess() {
        const ctx = this.getContext()
        const notes = [523.25, 659.25, 783.99] // C5, E5, G5

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.type = 'sine'
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)

            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1)
            gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.1 + 0.02)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.15)

            osc.start(ctx.currentTime + i * 0.1)
            osc.stop(ctx.currentTime + i * 0.1 + 0.15)
        })
    }

    // Pop sound - fun bubbly pop
    playPop() {
        const ctx = this.getContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(400, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08)

        gain.gain.setValueAtTime(0.25, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.08)
    }

    // Coin sound - arcade coin collect
    playCoin() {
        const ctx = this.getContext()
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.type = 'square'
        osc2.type = 'square'

        osc1.frequency.setValueAtTime(987.77, ctx.currentTime) // B5
        osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08) // E6

        gain.gain.setValueAtTime(0.1, ctx.currentTime)
        gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.08)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

        osc1.start(ctx.currentTime)
        osc1.stop(ctx.currentTime + 0.08)
        osc2.start(ctx.currentTime + 0.08)
        osc2.stop(ctx.currentTime + 0.2)
    }

    // Whoosh sound - fast movement
    playWhoosh() {
        const ctx = this.getContext()
        const bufferSize = ctx.sampleRate * 0.2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize
            data[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * 0.5
        }

        const source = ctx.createBufferSource()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        source.buffer = buffer
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(500, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1)
        filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.2)

        source.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

        source.start(ctx.currentTime)
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

    // BGM - Fun lo-fi chill beat
    startBgm() {
        if (this.isBgmPlaying) return

        const ctx = this.getContext()
        this.isBgmPlaying = true

        // Master gain
        const masterGain = ctx.createGain()
        masterGain.gain.value = 0.08
        masterGain.connect(ctx.destination)

        // Bass pattern
        const playBass = () => {
            if (!this.isBgmPlaying) return

            const bassNotes = [65.41, 73.42, 82.41, 73.42] // C2, D2, E2, D2
            const noteIndex = Math.floor((ctx.currentTime * 2) % 4)

            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(masterGain)

            osc.type = 'sine'
            osc.frequency.value = bassNotes[noteIndex]

            gain.gain.setValueAtTime(0.3, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)

            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.4)

            setTimeout(playBass, 500)
        }

        // Chord pad
        const playPad = () => {
            if (!this.isBgmPlaying) return

            const chords = [
                [261.63, 329.63, 392.00], // C major
                [293.66, 369.99, 440.00], // D minor
                [329.63, 415.30, 493.88], // E minor
                [293.66, 369.99, 440.00], // D minor
            ]
            const chordIndex = Math.floor((ctx.currentTime / 2) % 4)

            chords[chordIndex].forEach(freq => {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                const filter = ctx.createBiquadFilter()

                osc.connect(filter)
                filter.connect(gain)
                gain.connect(masterGain)

                osc.type = 'triangle'
                osc.frequency.value = freq

                filter.type = 'lowpass'
                filter.frequency.value = 800

                gain.gain.setValueAtTime(0.1, ctx.currentTime)
                gain.gain.setValueAtTime(0.1, ctx.currentTime + 1.8)
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2)

                osc.start(ctx.currentTime)
                osc.stop(ctx.currentTime + 2)
            })

            setTimeout(playPad, 2000)
        }

        // Hi-hat pattern
        const playHiHat = () => {
            if (!this.isBgmPlaying) return

            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate)
            const data = buffer.getChannelData(0)
            for (let i = 0; i < data.length; i++) {
                data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
            }

            const source = ctx.createBufferSource()
            const gain = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            source.buffer = buffer
            filter.type = 'highpass'
            filter.frequency.value = 8000

            source.connect(filter)
            filter.connect(gain)
            gain.connect(masterGain)

            gain.gain.value = 0.15

            source.start(ctx.currentTime)

            setTimeout(playHiHat, 250)
        }

        // Start all patterns
        playBass()
        setTimeout(playPad, 100)
        setTimeout(playHiHat, 200)
    }

    stopBgm() {
        this.isBgmPlaying = false
        this.bgmOscillators.forEach(osc => {
            try { osc.stop() } catch { /* Already stopped */ }
        })
        this.bgmOscillators = []
        this.bgmGains = []
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
