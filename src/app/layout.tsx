import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'KFH - Kung Fu Hamster | The Most Viral Meme Token on Solana',
    description: 'KFH is ACTUALLY viral and belongs on Pumpfun! Join the Kung Fu Hamster community - the cutest martial arts master on Solana blockchain.',
    keywords: ['KFH', 'Kung Fu Hamster', 'Solana', 'Pumpfun', 'meme token', 'crypto', 'NFT'],
    authors: [{ name: 'KFH Community' }],
    openGraph: {
        title: 'KFH - Kung Fu Hamster',
        description: 'The Most Viral Meme Token on Solana! 🐹🥋',
        type: 'website',
        locale: 'en_US',
        siteName: 'Kung Fu Hamster',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'KFH - Kung Fu Hamster',
        description: 'The Most Viral Meme Token on Solana! 🐹🥋',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#1A1A2E" />
            </head>
            <body className="antialiased">
                <div className="noise-overlay" />
                {children}
            </body>
        </html>
    )
}
