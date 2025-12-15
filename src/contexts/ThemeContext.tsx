'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem('kfh-theme') as Theme
        if (saved) {
            setThemeState(saved)
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setThemeState(prefersDark ? 'dark' : 'light')
        }
    }, [])

    useEffect(() => {
        if (mounted) {
            document.documentElement.classList.remove('dark', 'light')
            document.documentElement.classList.add(theme)
            localStorage.setItem('kfh-theme', theme)
        }
    }, [theme, mounted])

    const toggleTheme = useCallback(() => {
        setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
    }, [])

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme)
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
