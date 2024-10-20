"use client"

import React, { useState } from 'react'
import styles from './sidebar-styles.module.scss'
import MenuItems from '../menu-items/menu-items'
import { useNavigate } from 'react-router-dom'

// import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/src/components/ui/sidebar'
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/src/components/ui/collapsible'
// import { ChevronDown } from 'lucide-react'

type Props = {
  actual: string
  onChange: (coin: string) => void
  open: (page: string) => void
  active?: string
}

const AppSidebar: React.FC<Props> = ({ actual, onChange, open, active }: Props) => {
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

  const [stack, setStack] = useState([
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
      url: window.location.href.toLowerCase().includes('solana') ? '/solana' : '/home'
    },
    {
      title: 'Portfolio',
      icon: 'account/portfolio.png',
      url: '/portfolio/solana'
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
      url: window.location.href.toLowerCase().includes('solana') ? '/whale-hunting/solana' : '/whale-hunting/bitcoin'
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

        {/* <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible mx-2" >
            <SidebarGroup className='p-0'>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className='mb-1' defaultChecked>
                  <p className='mx-4 text-[16px] text-zinc-300'>Tokens</p>
                  <ChevronDown className="text-zinc-200 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <MenuItems active={actual} items={coins} action={(value) => { handleClick("coin", value) }} />
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible mx-2 mb-2" >
            <SidebarGroup className='p-0'>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className='mb-1' defaultChecked>
                  <p className='mx-4 text-[16px] text-zinc-300'>Stacks</p>
                  <ChevronDown className="text-zinc-200 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <MenuItems active={actual} items={coins} action={(value) => { handleClick("coin", value) }} />
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarMenu> */}

        <MenuItems active={actual} items={coins} action={(value) => { handleClick("coin", value) }} />

        <MenuItems title="User Panel" items={pages} action={(value) => { handleClick("page", value) }} panelActive={active} />
      </div>
    </div>
  )
}

export default AppSidebar
