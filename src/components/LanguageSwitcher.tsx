'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, Language } from '@/contexts/LanguageContext'

const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)

    const currentLang = languages.find(l => l.code === language) || languages[0]

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 glass-card flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Change Language"
            >
                {currentLang.flag}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-12 right-0 z-50 glass-card-strong p-2 min-w-[140px]"
                        >
                            {languages.map((lang) => (
                                <motion.button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${language === lang.code
                                            ? 'bg-kfh-coral/20 text-kfh-coral'
                                            : 'hover:bg-white/10 text-white/80'
                                        }`}
                                    whileHover={{ x: 4 }}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className="text-sm font-medium">{lang.name}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
