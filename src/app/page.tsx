import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Tokenomics from '@/components/Tokenomics'
import PFPGenerator from '@/components/PFPGenerator'
import Community from '@/components/Community'
import Footer from '@/components/Footer'
import PriceTicker from '@/components/PriceTicker'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <PriceTicker />
            <Hero />
            <About />
            <Tokenomics />
            <PFPGenerator />
            <Community />
            <Footer />
        </main>
    )
}
