import {Linkedin, Github, Twitter} from "lucide-react"

const resources = [
    { name: 'Resources', href: '#', isTitle: true },
    { name: 'Docs', href: 'https://docs.panoramablock.com' },
    // { name: 'Blog', href: 'https://panoramablock.medium.com/' },
    { name: 'Github', href: 'https://github.com/Panorama-Block' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/panoramablock' },
    { name: 'X', href: 'https://x.com/panoramablock' },
    { name: 'Telegram', href: 'https://t.me/panoramablock' },
    { name: 'Discord', href: 'https://discord.com/invite/V3UyvcTUpS' }
  ]

const Footer = () => {
    return (
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

                <div id="resources" className="flex flex-col items-center gap-8">
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
                        Copyright {new Date().getFullYear()} - All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer