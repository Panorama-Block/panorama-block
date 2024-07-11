import React, { useEffect, useState } from 'react'
import styles from './landing-styles.module.scss'
import LandingHeader from './components/landing-header/landing-header'
import BusinessIcon from '@mui/icons-material/Business'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import HubIcon from '@mui/icons-material/Hub'
import LandingFooter from './components/landing-footer/landing-footer'
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent"
import { createActor } from "../../../../../declarations/mempool";
import { useNavigate } from 'react-router-dom'

// const host = "http://localhost:4943/";
// const host = "https://identity.ic0.app";

const Landing: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const navigate = useNavigate()

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  // Função para conectar com o Internet Identity
  const handleConnectWallet = async () => {
    const authClient = await AuthClient.create()

    await authClient.login({
      identityProvider: import.meta.env.II_CANISTER_ID, // Certifique-se de definir esta variável de ambiente
      onSuccess: async () => {
        const identity = authClient.getIdentity()

        const host = import.meta.env.VITE_HOST ?? undefined;
        const agent = new HttpAgent({ host, identity })
        const actor = createActor(import.meta.env.VITE_MEMPOOL_CANISTER_ID, {
          agent,
        })
        navigate("/home")
      },
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.landing}>
      <div id='home' className={styles.container}>
        <LandingHeader connect={handleConnectWallet} />
        <div className={`${styles.section} ${styles.intro}`}>
          <h1 className={styles.title}>
            AI-Powered Cross-Chain Analytics: The On-Chain Data Hub built on ICP
          </h1>
          <p className={styles.description}>
            Panorama Block is an on-chain data analytics hub built on
            the Internet Computer (ICP) analyzing various blockchains
            through the use of AI & ML tools. We aim to build the main
            source of truth for on-chain data, integrating Web3 and
            Web2 data and cross-chain interoperability.
          </p>
          <img className={styles.bg} src="bg.png" alt="" />
        </div>

        <div id='about' className={`${styles.section} ${styles.about}`}>
          <div className={styles.sectionTitle}>
            <h2>Pioneering Web3 On-Chain Data Analytics</h2>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.topic}>
              <div className={styles.icon}>
                <RocketLaunchIcon />
              </div>

              <h2>Our mission</h2>

              <p>Panorama Block enables users to access advanced on-chain data analytics using AI and Machine Learning. With an adaptive data & AI infrastructure and collaborations with top universities and research centers, we aim to democratize access to premier Web3 on-chain data, fostering innovation and advanced alpha-seeking strategies.</p>
            </div>

            <div className={styles.topic}>
              <div className={styles.icon}>
                <BusinessIcon />
              </div>

              <h2>Our vision</h2>

              <p>Our Vision is to become the leading Web3 on-chain decentralized data aggregator utilizing the latest AI & ML tools to help users discover excess returns and risk mitigation strategies.</p>
            </div>
          </div>
        </div>

        <div id='products' className={`${styles.section} ${styles.products}`}>
          <div className={styles.sectionTitle}>
            <h2>Our Products</h2>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.topic}>
              <div className={styles.icon}>
                <AssessmentIcon />
              </div>

              <h2>PANO RANKING</h2>

              <p>
                Advanced scorecards for different Web3
                verticals, such as DeFi, NFT, DEXs, Yield
                Protocols, etc. utilizing sophisticated AI
                and ML tools to derive alpha-seeking
                insights and uncover opportunities.
              </p>
            </div>

            <div className={styles.topic}>
              <div className={styles.icon}>
                <AutoGraphIcon />
              </div>

              <h2>LIQUID PATH</h2>

              <p>
                Utilizing account abstraction, this
                product automates liquid staking in DeFi,
                catering to users' risk profiles (low,
                medium, high) across various LSD
                venues.
              </p>
            </div>

            <div className={styles.topic}>
              <div className={styles.icon}>
                <HubIcon />
              </div>

              <h2>AI-INSIGHT HUB</h2>

              <p>
                A comprehensive platform and
                marketplace for developers, creators, and
                businesses to find, hire and connect with
                each other revolutionizing on-chain data
                access, innovation, and open-source
                community engagement.
              </p>
            </div>
          </div>

          <img className={styles.bg} src="bg.png" alt="" />
        </div>

        <div id='partners' className={`${styles.section} ${styles.partners}`}>
          <div className={styles.sectionTitle}>
            <h2>Our Network</h2>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.row}>
              <div className={styles.card}>
                <img src="partners/ucla.webp" alt="" />
              </div>

              <div className={styles.card}>
                <img src="partners/icp.png" alt="" />
              </div>

              <div className={styles.card}>
                <img src="partners/inteli.png" alt="" />
              </div>
            </div>

            <div className={styles.row}>


              <div className={`${styles.card} ${styles.white}`}>
                <img src="partners/lmu.png" alt="" />
              </div>

              <div className={`${styles.card} ${styles.white}`}>
                <img src="partners/ucla-blockchain.png" alt="" />
              </div>
            </div>
          </div>

        </div>

        <LandingFooter connect={handleConnectWallet} />

        {
          scrollPosition >= 100 && <div className={styles.goToTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <KeyboardArrowUpIcon />
          </div>
        }
      </div>
    </div >
  )
}

export default Landing