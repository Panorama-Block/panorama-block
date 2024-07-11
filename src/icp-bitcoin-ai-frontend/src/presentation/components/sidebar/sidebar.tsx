import React, { useState } from 'react'
import styles from './sidebar-styles.module.scss'
import MenuItems from '../menu-items/menu-items'
import { useNavigate } from 'react-router-dom'

type Props = {
  actual: string
  onChange: (coin: string) => void
  open: (page: string) => void
}

const Sidebar: React.FC<Props> = ({ actual, onChange, open }: Props) => {
  const navigate = useNavigate()
  const [coins, setCoins] = useState([
    {
      title: 'Bitcoin',
      icon: '/coins/bitcoin.png'
    },
    {
      title: 'Etherum',
      icon: '/coins/eth.png',
      disabled: true
    },
    {
      title: 'Solana',
      icon: '/coins/solana.png',
      disabled: true
    },
    {
      title: 'ICP',
      icon: '/coins/icp.png',
      disabled: true
    }
  ])
  const [pages, setPages] = useState([
    {
      title: 'Rank Select',
      icon: 'account/trend.png',
      disabled: true,
      url: '/home'
    },
    {
      title: 'Whale Hunting',
      icon: 'account/wallet.png',
      url: '/home'
    },
    {
      title: 'Profile',
      icon: 'account/profile.png',
      disabled: true,
      url: '/home'
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

        <MenuItems title="ACCOUNT PAGES" items={pages} action={(value) => { handleClick("page", value) }} />
      </div>
    </div>
  )
}

export default Sidebar
