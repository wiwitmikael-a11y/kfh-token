'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { SoundProvider } from '@/contexts/SoundContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <SoundProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </SoundProvider>
        </ThemeProvider>
    )
}
