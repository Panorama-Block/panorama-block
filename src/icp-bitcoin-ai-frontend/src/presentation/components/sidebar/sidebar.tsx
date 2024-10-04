import React, { useState } from 'react'
import styles from './sidebar-styles.module.scss'
import MenuItems from '../menu-items/menu-items'
import { useNavigate } from 'react-router-dom'

type Props = {
  actual: string
  onChange: (coin: string) => void
  open: (page: string) => void
  active?: string
}

const Sidebar: React.FC<Props> = ({ actual, onChange, open, active }: Props) => {
  const navigate = useNavigate()
  const [coins, setCoins] = useState([
    {
      title: 'Bitcoin',
      icon: '/coins/bitcoin.png',
      url: '/home'
    },
    {
      title: 'Ethereum',
      icon: '/coins/eth.png',
      disabled: true,
      url: '/ethereum'
    },
    {
      title: 'ICP',
      icon: '/coins/icp.png',
      disabled: true,
      url: '/icp'
    },
    {
      title: 'Solana',
      icon: '/coins/solana.png',
      url: '/solana'
    }
  ])
  const [pages, setPages] = useState([
    {
      title: 'Dashboard',
      icon: 'account/dash.png',
      url: ''
    },
    {
      title: 'Portfolio',
      icon: 'account/portfolio.png',
      disabled: true,
      url: '/home'
    },
    {
      title: 'Market',
      icon: 'account/market.png',
      disabled: true,
      url: '/home'
    },
    {
      title: 'Transfers',
      icon: 'account/transfers.png',
      disabled: true,
      url: '/home'
    },
    {
      title: 'Whale Hunting',
      icon: 'account/wallet.png',
      url: '/home'
    },
    {
      title: 'Pano Ranking',
      icon: 'account/pano.png',
      url: '/panoranking/solana'
    },
    {
      title: 'Logout',
      icon: 'account/logout.png',
      url: '/home'
    },
  ])

  const handleClick = (type: string, value: string) => {
    if (type === 'coin') {
      onChange(value)

      if (value == 'Bitcoin') {
        navigate(`/home`)
      }
      else {
        navigate(`/${value.toLowerCase()}`)
      }
    }
    else {
      open(value)
    }
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src="/logo.png" alt="" onClick={() => navigate('/home')} />
      </div>

      <div className={styles.body}>
        <MenuItems active={actual} items={coins} action={(value) => { handleClick("coin", value) }} />

        <MenuItems title="User Panel" items={pages} action={(value) => { handleClick("page", value) }} panelActive={active} />
      </div>
    </div>
  )
}

export default Sidebar
