import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
    title: 'KFH - Kung Fu Hamster | The Most Viral Meme Token on Solana',
    description: 'KFH is ACTUALLY viral and belongs on Pumpfun! Join the Kung Fu Hamster community - the cutest martial arts master on Solana blockchain.',
    keywords: ['KFH', 'Kung Fu Hamster', 'Solana', 'Pumpfun', 'meme token', 'crypto', 'NFT', 'memecoin'],
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
    verification: {
        google: 'google-site-verification-code',
    },
}

// JSON-LD Structured Data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kung Fu Hamster (KFH)',
    description: 'The Most Viral Meme Token on Solana blockchain',
    url: 'https://kfh-token.vercel.app',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://kfh-token.vercel.app/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#1A1A2E" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/images/kfh-hero.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="antialiased">
                <Providers>
                    <div className="noise-overlay" />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
