import { useState, useEffect } from 'react'

const NewLanding = () => {
  const words = ['On Chain Data', 'Defi', 'AI Agents', 'Blockchain Scanners']
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
          <div>
            <img src="/new-logo.png" alt="Panorama Block" className="h-24" />
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
            </span>
          </h1>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-neuton text-navy-900 mb-8">
                We partner with extraordinary founders across The Americas
              </h2>
              
              <div className="space-y-6 text-gray-600">
                <p>
                  In addition to capital, we actively help companies grow by providing customer 
                  and partner introductions, operational support, geographic expansion assistance, 
                  and first-hand expertise and insights.
                </p>
                
                <p>
                  We believe that talent to build iconic companies comes from anywhere. 
                  As a team, our focus is on partnering with leading entrepreneurs and 
                  actively helping them unleash their potential.
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
    </div>
  )
}

export default NewLanding