import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Tokenomics from '@/components/Tokenomics'
import ChartEmbed from '@/components/ChartEmbed'
import MemeGallery from '@/components/MemeGallery'
import PFPGenerator from '@/components/PFPGenerator'
import Community from '@/components/Community'
import Footer from '@/components/Footer'
import PriceTicker from '@/components/PriceTicker'

export default function Home() {
    return (
        <main className="relative">
            <Navbar />
            <Hero />
            <About />
            <Tokenomics />
            <ChartEmbed />
            <MemeGallery />
            <PFPGenerator />
            <Community />
            <Footer />
            <PriceTicker />
        </main>
    )
}
