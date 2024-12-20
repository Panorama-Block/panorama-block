import { Button } from '@/src/components/ui/button'
import { ArrowUp, ChevronUp, SearchCode } from 'lucide-react'
import { Store, TrendingUp, Linkedin, Github, Twitter } from 'lucide-react'
import { useState, useEffect } from 'react'

const resources = [
  { name: 'Resources', href: '#', isTitle: true },
  { name: 'Docs', href: 'https://docs.panoramablock.com' },
  { name: 'Github', href: 'https://github.com/Panorama-Block' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/panoramablock' },
  { name: 'X', href: 'https://x.com/panoramablock' },
  { name: 'Telegram', href: 'https://t.me/panoramablock' },
  { name: 'Discord', href: 'https://discord.com/invite/V3UyvcTUpS' }
]

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
    { name: 'UCLA Blockchain', image: '/partners/ucla-blockchain.png' },
    { name: 'UCLA Blockchain', image: '/partners/ucla-blockchain.png' },
    { name: 'UCLA Economics', image: '/partners/ucla.webp' }
  ]

  const [currentWord, setCurrentWord] = useState(0)

  const cities = [
    { name: 'Los Angeles', x: 182, y: 205 },
    { name: 'São Paulo', x: 451, y: 478 },
    { name: 'Porto Rico', x: 360, y: 280 },
  ]

  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const teamMembers = [
    {
      name: 'Alex Nascimento',
      role: 'Founder',
      image: '/team/alex.png',
      linkedin: 'https://linkedin.com/in/nascimentoalex'
    },
    {
      name: 'Gustavo Torrecilha',
      role: 'VP',
      image: '/team/gustavo.jpg',
      linkedin: 'https://linkedin.com/in/gustavo-torrecilha'
    },
    {
      name: 'Hugo Noyma',
      role: 'Blockchain Engineer',
      image: '/team/hugo.jpg',
      linkedin: 'https://linkedin.com/in/hugo-noyma'
    },
    {
      name: 'Felipe Saadi',
      role: 'Full-stack developer',
      image: '/team/felipe.jpg',
      linkedin: 'https://linkedin.com/in/felipe-saadi'
    },
    {
      name: 'Maria Helena',
      role: 'Research & Compliance',
      image: '/team/maria.jpg',
      linkedin: 'https://linkedin.com/in/mariahelenarocha'
    },
    {
      name: 'André Costa',
      role: 'Blockchain Engineer',
      image: '/team/andre.jpg',
      linkedin: 'https://www.linkedin.com/in/andre-mestriner-costa/'
    }
  ]

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    const interval = setInterval(() => {
    }, 2000)

    return () => clearInterval(interval)
  }, [])

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
        top: offsetTop, // 100px de offset para considerar o header fixo
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
      <header className="absolute w-full z-10 p-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/new-logo.png" alt="Panorama Block" className="h-24" />
            <span className="text-gray-300">Panorama Block</span>
          </div>

          <div className="flex gap-12">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 text-lg hover:text-gray-600"
            >
              About
            </button>
            {/* <button
              onClick={() => scrollToSection('companies')}
              className="text-gray-300 text-lg hover:text-gray-600"
            >
              Companies
            </button> */}
            <button
              onClick={() => scrollToSection('team')}
              className="text-gray-300 text-lg hover:text-gray-600"
            >
              Team
            </button>
            <a
              href="https://panoramablock.medium.com/"
              target="_blank"
              className="text-gray-300 text-lg hover:text-gray-600"
            >
              Blog
            </a>
            <a
              href="https://docs.panoramablock.com"
              target="_blank"
              className="text-gray-300 text-lg hover:text-gray-600"
            >
              Docs
            </a>
          </div>
        </nav>
      </header>

      <div className="relative h-screen bg-gray-600">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-50" />

        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-6xl font-neuton text-zinc-300 w-[1200px] mx-auto">
            <span className='flex font-neuton flex-col gap-5 text-center'>
              Panoramic view of{' '}
              <span className="inline-block h-[1.2em]">
                <span
                  key={words[currentWord]}
                  className="font-neuton inline-block animate-slideUpIn"
                >
                  {words[currentWord]}
                </span>
              </span>

              <Button variant="outline" className="mx-auto mt-10 w-[200px] text-gray-50 bg-gray-500">Launch Beta App</Button>
            </span>
          </h1>
        </div>
      </div>

      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-neuton text-navy-900 mb-8">
                Rooted in Academia, Evolved by AI
              </h2>

              <div className="space-y-6 text-gray-600">
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
                  style={{ left: `${city.x}px`, top: `${city.y}px` }}
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
          <div className="grid grid-cols-3 gap-8">
            <div className="p-8 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
              <div className="w-14 h-14 mb-6 text-gray-400 relative">
                <SearchCode className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-full" />
              </div>
              <h3 className="text-2xl font-neuton text-gray-200 mb-4">Actionable Data Across Multiple Chains</h3>
              <p className="text-gray-400">
                Panorama Block will provide user-friendly blockchain scanners offering composable, actionable data across different chains. The platform will allow users to explore the latest blocks, analyze transactions, and track wallet activity, all powered by real-time AI analytics. With a focus on delivering valuable, easy-to-understand insights, Panorama Block will help users navigate various Web3 niches and verticals.
              </p>
            </div>

            <div className="p-8 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
              <div className="w-14 h-14 mb-6 text-gray-400 relative">
                <Store className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl rounded-full" />
              </div>
              <h3 className="text-2xl font-neuton text-gray-200 mb-4">Decentralized Marketplace for AI Agent Creation</h3>
              <p className="text-gray-400">
                A marketplace for AI agents and Web3 analytics tools will enable developers to deploy and monetize custom agents tailored to specific use cases. Enterprises will be able to integrate advanced AI models for specialized applications, with APIs facilitating data interaction across multiple blockchains. Panorama Block will provide infrastructure for building, testing, and scaling AI-powered solutions, focusing on decentralized data processing and real-time analytics.
              </p>
            </div>

            <div className="p-8 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
              <div className="w-14 h-14 mb-6 text-gray-400 relative">
                <TrendingUp className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl rounded-full" />
              </div>
              <h3 className="text-2xl font-neuton text-gray-200 mb-4">Pano Ranking: DeFi Strategy Hub</h3>
              <p className="text-gray-400">
                Pano Ranking will allow users to create, deploy, and manage high-yield strategies within the Panorama Block ecosystem, acting as a hub for developing and optimizing DeFi yield models. The product will enable users to list their strategies, participate in a community-driven leaderboard, and tap into yield plays through AI-driven scorecards that highlight top opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="text-4xl font-neuton text-navy-900 text-center mb-12">
            Our Partners
          </h2>
        </div>

        <div className="absolute flex h-[300px] w-screen relative overflow-hidden">
          <div className="flex gap-40 animate-scroll">
            {[...partners].map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex">
                <img src={partner.image} alt={partner.name} className="w-60 h-60 object-contain" />
              </div>
            ))}
          </div>
          <div className="absolute flex gap-40 animate-scroll-2" aria-hidden={true}>
            {[...partners].map((partner, index) => (
              <div key={`${partner.name}-second-${index}`} className="flex">
                <img src={partner.image} alt={partner.name} className="w-60 h-60 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-neuton text-zinc-200 text-center mb-16">
            Our Team
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="mx-auto w-[300px] bg-gray-800/50 rounded-lg p-8 flex flex-col items-center"
              >
                <div className="w-40 h-40 mb-6 rounded-full overflow-hidden ring-4 ring-gray-700/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-neuton text-zinc-200 mb-1">
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

      <section className="bg-[#1A1A1A] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-start gap-4 mb-16">
            {resources.map((link) => (
              <div key={link.name}>
                {link.isTitle ? (
                  <h3 className="text-gray-300 text-lg font-medium mb-2">{link.name}</h3>
                ) : (
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/panoramablock"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Panorama-Block"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/panoramablock"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/panoramablock"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.12.098.153.228.166.331.032.259.007.599-.027.859z" />
                </svg>
              </a>
              <a
                href="https://discord.com/invite/V3UyvcTUpS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>

            <p className="text-gray-400 text-sm">
              Copyright © {new Date().getFullYear()} - All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {
        scrollPosition >= 100 && <div className="w-10 h-10 flex items-center justify-center bg-gray-300/75 rounded-full p-2 text-navy-900 border border-gray-700/50 fixed bottom-10 right-10 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ChevronUp />
        </div>
      }
    </div>
  )
}

export default NewLanding