import { useState, useEffect } from 'react'
import { Store, TrendingUp } from 'lucide-react'
import { ChevronUp, SearchCode, Menu, X, Linkedin } from 'lucide-react'

import Footer from '@/src/presentation/components/footer/footer'
import { Button } from '@/src/components/ui/button'

const NewLanding = () => {
  const words = [
    'On-Chain Data',
    'Narratives Tracking',
    'AI Agents',
    'DeFi Opportunities',
    'Yield Strategies',
    'Market Sentiment',
    'Agentic Economy',
    'Decentralized Analytics',
    'Web3 Hottest Trends'
  ]
  const partners = [
    { name: 'ICP', image: '/partners/icp.png' },
    { name: 'Inteli', image: '/partners/inteli.webp' },
    { name: 'LMU', image: '/partners/lmu.png' },
    { name: 'UCLA Blockchain', image: '/partners/ucla-blockchain.png' },
    { name: 'UCLA Economics', image: '/partners/ucla.png' },
    { name: 'Coinstore', image: '/partners/coinstore.webp' },
    { name: 'Dfinity', image: '/partners/dfinity.png' },
    { name: 'Blockchain Expo', image: '/partners/blockchain-expo.webp' },
    { name: 'Hiro', image: '/partners/hiro.png' },
    { name: 'Stacks', image: '/partners/stacks.jpg' },
    { name: 'ICP Latam', image: '/partners/icp-latam.png' },
    { name: 'ICP México', image: '/partners/icp-mexico.jpg' },
    { name: 'Labitconf', image: '/partners/labitconf.png' },
    { name: 'Superteam', image: '/partners/superteam.png' },
    { name: 'Tokenize', image: '/partners/tokenize.webp' },
    { name: 'Ibiza', image: '/partners/ibiza.jpg' }
  ]

  const [currentWord, setCurrentWord] = useState(0)

  const cities = [
    { name: 'Los Angeles', x: 30, y: 31 },
    { name: 'Porto Rico', x: 60, y: 44.4 },
    { name: 'São Paulo', x: 75.5, y: 75.1 },
  ]

  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const teamMembers = [
    {
      name: 'Alex Nascimento',
      role: 'Founder',
      image: '/team/alex_w&b.jpeg',
      linkedin: 'https://linkedin.com/in/nascimentoalex'
    },
    {
      name: 'Gustavo Torrecilha',
      role: 'VP',
      image: '/team/gustavo_w&b.jpg',
      linkedin: 'https://linkedin.com/in/gustavo-torrecilha'
    },
    {
      name: 'Hugo Noyma',
      role: 'Blockchain Engineer',
      image: '/team/hugo_w&b.jpg',
      linkedin: 'https://linkedin.com/in/hugo-noyma'
    },
    {
      name: 'Felipe Saadi',
      role: 'Full-stack developer',
      image: '/team/felipe_w&b.jpg',
      linkedin: 'https://linkedin.com/in/felipe-saadi'
    },
    {
      name: 'Maria Helena',
      role: 'Research & Compliance',
      image: '/team/maria_w&b.jpg',
      linkedin: 'https://linkedin.com/in/mariahelenarocha'
    },
    {
      name: 'André Costa',
      role: 'Token Engineer',
      image: '/team/andre_w&b.jpg',
      linkedin: 'https://www.linkedin.com/in/andre-mestriner-costa/'
    }
  ]

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="landing relative">
      <header className="absolute w-full z-50 p-4">
        <nav className="relative max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 z-50">
              <img src="/new-logo.png" alt="Panorama Block" className="h-12 md:h-16" />
              <span className="text-gray-300 !font-asgard text-sm md:text-base">Panorama Block</span>
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden z-50 text-gray-300 hover:text-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex gap-12">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 text-lg hover:text-gray-100"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className="text-gray-300 text-lg hover:text-gray-100"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection('resources')}
                className="text-gray-300 text-lg hover:text-gray-100"
              >
                Resources
              </button>
              <a
                href="https://docs.panoramablock.com"
                target="_blank"
                className="text-gray-300 text-lg hover:text-gray-100"
              >
                Docs
              </a>
            </div>
          </div>

          <div
            className={`fixed inset-0 bg-gray-900 transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <button
                onClick={() => {
                  scrollToSection('about')
                  closeMenu()
                }}
                className="text-gray-300 text-xl hover:text-gray-100"
              >
                About
              </button>
              <button
                onClick={() => {
                  scrollToSection('team')
                  closeMenu()
                }}
                className="text-gray-300 text-xl hover:text-gray-100"
              >
                Team
              </button>
              <button
                onClick={() => {
                  scrollToSection('resources')
                  closeMenu()
                }}
                className="text-gray-300 text-xl hover:text-gray-100"
              >
                Resources
              </button>
              <a
                href="https://docs.panoramablock.com"
                target="_blank"
                className="text-gray-300 text-xl hover:text-gray-100"
                onClick={closeMenu}
              >
                Docs
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative h-screen bg-gray-600 w-full">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-50 w-full" />

        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-5xl md:text-6xl text-zinc-300 w-full md:w-[1200px] mx-auto px-4 md:px-0">
            <span className='flex flex-col gap-5 text-center'>
              A Panoramic View of
              <span className="inline-block h-[1.2em]">
                <span
                  key={words[currentWord]}
                  className="inline-block animate-slideUpIn"
                >
                  {words[currentWord]}
                </span>
              </span>

              <a href="/#pano-view/bitcoin">
                <Button variant="outline" className="mx-auto mt-6 md:mt-10 w-[240px] h-12 text-gray-50 bg-gray-500">Launch Beta App</Button>
              </a>
            </span>
          </h1>
        </div>
      </div>

      <section id="about" className="py-24 bg-white flex flex-col min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl w-full text-navy-900 mb-8 md:text-7xl">
                Rooted in Academia, Evolved by AI
              </h2>

              <div className="space-y-6 text-gray-600 text-xl md:text-2xl">
                <p>
                  Panorama Block was built on a strong academic foundation, with a focus on research and collaboration with top-tier talent. Our partnerships with UCLA’s Economics Department and leading Brazilian universities and think tanks drive the development of decentralized data analytics and AI/ML tools, fully aligned with our mission to advance AI technologies, simplify user experiences, democratize data access, and provide action-oriented intelligence that empower participants and investment decisions, supporting the growth of a data-powered, agentic economy.
                </p>
              </div>
            </div>

            <div className="w-full relative">
              <img src="/map.svg" alt="Map of Americas" className="w-full" />

              {cities.map((city) => (
                <div
                  key={city.name}
                  className="absolute w-3 h-3 bg-navy-900 rounded-full cursor-pointer"
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {hoveredCity === city.name && (
                    <div className="w-fit min-w-[100px] bg-white-400 text-center absolute -top-14 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded shadow text-sm">
                      {city.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <h2 className="text-4xl text-zinc-200 text-center mb-16">
              Our Verticals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
              <div className="w-14 h-14 mb-6 text-gray-400 relative">
                <SearchCode className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-full" />
              </div>
              <h3 className="text-2xl text-gray-200 mb-4">Panorama Chain View</h3>
              <p className="text-gray-400">
                Panorama Block will provide user-friendly blockchain scanners offering composable, actionable data across different chains. The platform will allow users to explore the latest blocks, analyze transactions, and track wallet activity, all powered by real-time AI analytics. With a focus on delivering valuable, easy-to-understand insights, Panorama Block will help users navigate various Web3 niches and verticals.
              </p>
            </div>

            <div className="p-8 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
              <div className="w-14 h-14 mb-6 text-gray-400 relative">
                <Store className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl rounded-full" />
              </div>
              <h3 className="text-2xl text-gray-200 mb-4">AI Marketplace</h3>
              <p className="text-gray-400">
                A marketplace for AI agents and Web3 analytics tools will enable developers to deploy and monetize custom agents tailored to specific use cases. Enterprises will be able to integrate advanced AI models for specialized applications, with APIs facilitating data interaction across multiple blockchains. Panorama Block will provide infrastructure for building, testing, and scaling AI-powered solutions, focusing on decentralized data processing and real-time analytics.
              </p>
            </div>

            <div className="p-8 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
              <div className="w-14 h-14 mb-6 text-gray-400 relative">
                <TrendingUp className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl rounded-full" />
              </div>
              <h3 className="text-2xl text-gray-200 mb-4">DeFi Vista: DeFi Strategy Hub</h3>
              <p className="text-gray-400">
                DeFi Vista will allow users to create, deploy, and manage high-yield strategies within the Panorama Block ecosystem, acting as a hub for developing and optimizing DeFi yield models. The product will enable users to list their strategies, participate in a community-driven leaderboard, and tap into yield plays through AI-driven scorecards that highlight top opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="text-4xl text-navy-900 text-center mb-12">
            Proudly Collaborating with
          </h2>
        </div>

        <div className="absolute flex items-center h-[150px] w-[4000px] relative overflow-hidden">
          <div className="absolute flex gap-20 animate-scroll">
            {[...partners].map((partner, index) => (
              <img
                key={`${partner.name}-${index}`}
                src={partner.image}
                alt={partner.name}
                className="h-14 md:h-18 object-contain"
              />
            ))}
          </div>
          <div className="absolute flex items-center gap-20 animate-scroll-2" aria-hidden={true}>
            {[...partners].map((partner, index) => (
              <img
                key={`${partner.name}-second-${index}`}
                src={partner.image}
                alt={partner.name}
                className="h-14 md:h-18 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl text-zinc-200 text-center mb-16">
            Our Team
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="mx-auto w-[300px] bg-gray-800/50 rounded-lg p-8 flex flex-col items-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-gray-700/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl text-zinc-200 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {member.role}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 bg-gray-700/50 rounded-full text-blue-400 hover:text-blue-300 hover:bg-gray-700 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

    {
      scrollPosition >= 100 && <div className="w-10 h-10 flex items-center justify-center bg-gray-300/75 rounded-full p-2 text-navy-900 border border-gray-700/50 fixed bottom-10 right-10 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ChevronUp />
      </div>
    }
  </div>
  )
}

export default NewLanding