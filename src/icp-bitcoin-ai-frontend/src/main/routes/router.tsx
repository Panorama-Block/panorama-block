import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from '../../presentation/pages/home/home'
import Landing from '../../presentation/pages/landing/landing'
import Solana from '../../presentation/pages/solana/solana'
// import Login from '../../presentation/pages/login/login'

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/solana' element={<Solana />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
