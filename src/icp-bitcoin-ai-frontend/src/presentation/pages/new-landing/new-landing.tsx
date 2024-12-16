import { useState, useEffect } from 'react'

const NewLanding = () => {
  const words = ['On Chain Data', 'Defi', 'AI Agents', 'Blockchain Scanners']
  const [currentWord, setCurrentWord] = useState(0)

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

          <div className="flex gap-8">
            <a href="#about" className="text-gray-800 hover:text-gray-600">About</a>
            <a href="#companies" className="text-gray-800 hover:text-gray-600">Companies</a>
            <a href="#team" className="text-gray-800 hover:text-gray-600">Team</a>
            <a href="#contact" className="text-gray-800 hover:text-gray-600">Contact</a>
          </div>
        </nav>
      </header>

      <div className="relative h-screen bg-gray-100">
        <div className="absolute inset-0 bg-[url('/path-to-wave-image.jpg')] bg-cover bg-center opacity-50" />

        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-6xl font-serif text-navy-900 w-[1200px] mx-auto">
            Panoramic view of{' '}
            <span className="inline-block h-[1.2em]">
              <span
                key={words[currentWord]}
                className="inline-block animate-slideUpIn"
              >
                {words[currentWord]}
              </span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default NewLanding