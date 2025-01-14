import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, HashRouter, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Home from '../../presentation/pages/home/home'
import Landing from '../../presentation/pages/landing/landing'
import Solana from '../../presentation/pages/solana/solana'
import HashblockSolana from '../../presentation/pages/hashblock-solana/hashblock-solana'
import SolanaVolume from '../../presentation/pages/solana-volume/solana-volume'
import PanorankingSolana from '../../presentation/pages/panoranking-solana/panoranking-solana'
import WhaleHuntingSolana from '../../presentation/pages/whale-hunting-solana/whale-hunting-solana'
import WhaleHuntingBitcoin from '../../presentation/pages/whale-hunting-bitcoin/whale-hunting-bitcoin'
import PortfolioSolana from '../../presentation/pages/portfolio-solana/portfolio-solana'
import StacksBitcoin from '../../presentation/pages/stacks-bitcoin/stacks-bitcoin'
import Icp from '../../presentation/pages/icp/icp'
import CkBitcoin from '@/src/presentation/pages/ck-btc/ck-bitcoin'
import NewLanding from '@/src/presentation/pages/new-landing/new-landing'
import XRPL from '@/src/presentation/pages/xrpl/xrpl'
import CodeLock from '@/src/presentation/components/code-lock/code-lock'
import NotFound from '@/src/presentation/pages/not-found/not-found'
import MobileRedirect from '@/src/presentation/pages/mobile-redirect/mobile-redirect'
import XAiAgents from '@/src/presentation/pages/x-ai-agents/x-ai-agents'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const isNewLanding = location.pathname === '/'
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  const initialLockState = !localStorage.getItem('isUnlocked')
  const [isLocked, setIsLocked] = useState(initialLockState)
  const [showLock, setShowLock] = useState(initialLockState)

  const handleSuccess = () => {
    setIsLocked(false)
    setShowLock(false)
    localStorage.setItem('isUnlocked', 'true')
  }

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };
  
    checkMobile();
  
    window.addEventListener('resize', checkMobile);
  
    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  useEffect(() => {
    const isLandingPage = location.pathname === '/';
    const isMobileRedirectPage = location.pathname === '/mobile-redirect';
    
    if (isMobile && !isLandingPage && !isMobileRedirectPage) {
      navigate('/mobile-redirect', { replace: true });
    }
  }, [isMobile, location.pathname, navigate]);

  if (isNewLanding) {
    return <>{children}</>
  }

  if (isLocked) {
    return (
      <CodeLock
        isOpen={showLock}
        onClose={() => {}}
        onSuccess={handleSuccess}
      />
    )
  }

  return <>{children}</>
}

const Router: React.FC = () => {
  return (
    <HashRouter>
      <ProtectedRoutes>
        <Routes>
          <Route path='/' element={<NewLanding />} />
          <Route path='/mobile-redirect' element={<MobileRedirect />} />
          <Route path='/pano-view/bitcoin' element={<Home />} />
          <Route path='/pano-view/solana' element={<Solana />} />
          <Route path='/pano-view/icp' element={<Icp />} />
          <Route path='/pano-view/ckbtc' element={<CkBitcoin />} />
          <Route path='/solana/:id' element={<HashblockSolana />} />
          <Route path='/panoranking/solana' element={<PanorankingSolana />} />
          <Route path='/whale-hunting/solana' element={<WhaleHuntingSolana />} />
          <Route path='/whale-hunting/bitcoin' element={<WhaleHuntingBitcoin />} />
          <Route path='/whale-hunting/icp' element={<WhaleHuntingSolana />} />
          <Route path='/whale-hunting/ckbtc' element={<WhaleHuntingSolana />} />
          <Route path='/whale-hunting/stacks' element={<WhaleHuntingSolana />} />
          <Route path='/whale-hunting/xrpl' element={<WhaleHuntingSolana />} />
          <Route path='/portfolio/solana' element={<PortfolioSolana />} />
          <Route path='/pano-view/stacks' element={<StacksBitcoin />} />
          <Route path='/solana/volume' element={<SolanaVolume />} />
          <Route path='/pano-view/xrpl' element={<XRPL />} />
          <Route path='/x-ai-agents' element={<XAiAgents />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ProtectedRoutes>
    </HashRouter>
  )
}

export default Router
