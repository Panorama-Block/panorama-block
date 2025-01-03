import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from '../../presentation/pages/home/home'
import Landing from '../../presentation/pages/landing/landing'
import Solana from '../../presentation/pages/solana/solana'
import HashblockSolana from '@/src/presentation/pages/hashblock-solana/hashblock-solana'
import SolanaVolume from '@/src/presentation/pages/solana-volume/solana-volume'
import PanorankingSolana from '@/src/presentation/pages/panoranking-solana/panoranking-solana'
import WhaleHuntingSolana from '@/src/presentation/pages/whale-hunting-solana/whale-hunting-solana'
import WhaleHuntingBitcoin from '@/src/presentation/pages/whale-hunting-bitcoin/whale-hunting-bitcoin'
import PortfolioSolana from '@/src/presentation/pages/portfolio-solana/portfolio-solana'
import StacksBitcoin from '@/src/presentation/pages/stacks-bitcoin/stacks-bitcoin'
import Icp from '@/src/presentation/pages/icp/icp'
import CkBitcoin from '@/src/presentation/pages/ck-btc/ck-bitcoin'
import NewLanding from '@/src/presentation/pages/new-landing/new-landing'
import XRPL from '@/src/presentation/pages/xrpl/xrpl'

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<NewLanding />} />
        <Route path='/home' element={<Home />} />
        <Route path='/solana' element={<Solana />} />
        <Route path='/icp' element={<Icp />} />
        <Route path='/ck-bitcoin' element={<CkBitcoin />} />
        <Route path='/solana/:id' element={<HashblockSolana />} />
        <Route path='/panoranking/solana' element={<PanorankingSolana />} />
        <Route path='/whale-hunting/solana' element={<WhaleHuntingSolana />} />
        <Route path='/whale-hunting/bitcoin' element={<WhaleHuntingBitcoin />} />
        <Route path='/portfolio/solana' element={<PortfolioSolana />} />
        <Route path='/stacks' element={<StacksBitcoin />} />
        <Route path='/solana/volume' element={<SolanaVolume />} />
        <Route path='/xrpl' element={<XRPL />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
