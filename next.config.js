/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dd.dexscreener.com'],
        unoptimized: true,
    },
    // Remove 'output: export' for Vercel dynamic deployment with API calls
    trailingSlash: true,
}

module.exports = nextConfig
