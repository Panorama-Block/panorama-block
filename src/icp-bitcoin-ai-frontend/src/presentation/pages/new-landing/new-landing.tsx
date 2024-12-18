import { Button } from '@/src/components/ui/button'
import { useState, useEffect } from 'react'

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
  const [currentWord, setCurrentWord] = useState(0)

  const cities = [
    { name: 'Los Angeles', x: 182, y: 205 },
    { name: 'São Paulo', x: 451, y: 478 }
  ]

  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <header className="absolute w-full z-10 p-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/new-logo.png" alt="Panorama Block" className="h-24" />
            <span className="text-gray-300">Panorama Block</span>
          </div>

          <div className="flex gap-12">
            <a href="#about" className="text-gray-400 text-lg hover:text-gray-600">About</a>
            <a href="#companies" className="text-gray-400 text-lg hover:text-gray-600">Companies</a>
            <a href="#team" className="text-gray-400 text-lg hover:text-gray-600">Team</a>
            <a href="#contact" className="text-gray-400 t-lg fover:text-gray-600">Contact</a>
          </div>
        </nav>
      </header>

      <div className="relative h-screen bg-gray-600">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-50" />

        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-6xl font-neuton text-zinc-400 w-[1200px] mx-auto">
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

              <Button variant="outline" className="mx-auto mt-10 w-[200px] text-gray-200 bg-gray-500">Launch Beta App</Button>
            </span>
          </h1>
        </div>
      </div>

      <section className="py-24 bg-white">
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

                {/* <p>
                  We believe that talent to build iconic companies comes from anywhere.
                  As a team, our focus is on partnering with leading entrepreneurs and
                  actively helping them unleash their potential.
                </p> */}
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

      <section className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900 rounded-lg flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6">
                <img src="/icons/stablecoin.svg" alt="Stablecoin icon" className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-neuton text-gray-200 mb-4">Actionable Data Across Multiple Chains</h3>
              <p className="text-gray-400">
                Panorama Block will provide user-friendly blockchain scanners offering composable, actionable data across different chains. The platform will allow users to explore the latest blocks, analyze transactions, and track wallet activity, all powered by real-time AI analytics. With a focus on delivering valuable, easy-to-understand insights, Panorama Block will help users navigate various Web3 niches and verticals.
              </p>
            </div>

            <div className="p-8 bg-gray-900 rounded-lg flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6">
                <img src="/icons/pools.svg" alt="Pools icon" className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-neuton text-gray-200 mb-4">Decentralized Marketplace for AI Agent Creation</h3>
              <p className="text-gray-400">
                A marketplace for AI agents and Web3 analytics tools will enable developers to deploy and monetize custom agents tailored to specific use cases. Enterprises will be able to integrate advanced AI models for specialized applications, with APIs facilitating data interaction across multiple blockchains. Panorama Block will provide infrastructure for building, testing, and scaling AI-powered solutions, focusing on decentralized data processing and real-time analytics.
              </p>
            </div>

            <div className="p-8 bg-gray-900 rounded-lg flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6">
                <img src="/icons/governance.svg" alt="Governance icon" className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-neuton text-gray-200 mb-4">Pano Ranking: DeFi Strategy Hub</h3>
              <p className="text-gray-400">
                Pano Ranking will allow users to create, deploy, and manage high-yield strategies within the Panorama Block ecosystem, acting as a hub for developing and optimizing DeFi yield models. The product will enable users to list their strategies, participate in a community-driven leaderboard, and tap into yield plays through AI-driven scorecards that highlight top opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewLanding