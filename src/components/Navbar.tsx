'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import SoundToggle from './SoundToggle'
import LanguageSwitcher from './LanguageSwitcher'

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Chart', href: '#chart' },
    { name: 'Memes', href: '#memes' },
    { name: 'Community', href: '#community' },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card-strong py-3' : 'py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="flex items-center gap-3 group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-kfh-coral to-kfh-pink flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:shadow-kfh-coral/50 transition-shadow">
                                🐹
                            </div>
                            <span className="font-bold text-xl sm:text-2xl gradient-text font-space">KFH</span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="text-white/70 hover:text-white font-medium transition-colors relative group text-sm"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-kfh-coral to-kfh-teal group-hover:w-full transition-all duration-300" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2">
                            {/* Settings Toggles - Hidden on mobile */}
                            <div className="hidden md:flex items-center gap-2">
                                <ThemeToggle />
                                <SoundToggle />
                                <LanguageSwitcher />
                            </div>

                            {/* Buy Button */}
                            <motion.a
                                href="https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:block neo-button text-sm py-2 px-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Buy $KFH 🥋
                            </motion.a>

                            {/* Mobile Menu Button */}
                            <motion.button
                                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.span
                                    className="w-6 h-0.5 bg-white rounded-full"
                                    animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                                />
                                <motion.span
                                    className="w-6 h-0.5 bg-white rounded-full"
                                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                                />
                                <motion.span
                                    className="w-6 h-0.5 bg-white rounded-full"
                                    animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 pt-20 px-4 lg:hidden"
                    >
                        <div className="glass-card-strong p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="block text-lg font-medium text-white/80 hover:text-white py-3 border-b border-white/10"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}

                            {/* Mobile Toggles */}
                            <div className="flex items-center justify-center gap-4 py-4 border-b border-white/10">
                                <ThemeToggle />
                                <SoundToggle />
                                <LanguageSwitcher />
                            </div>

                            <motion.a
                                href="https://pump.fun/coin/GQx3p7aTHLQHDqzFR3c1QSk1Qhy2hz4YbAnkjdXtpump"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block neo-button text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                Buy $KFH 🥋
                            </motion.a>

                            {/* Developer Credit - Mobile */}
                            <motion.a
                                href="https://x.com/MikaelAthar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 pt-4 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className="text-white/50">Developed by</span>
                                <span className="text-kfh-coral font-medium">@MikaelAthar</span>
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
