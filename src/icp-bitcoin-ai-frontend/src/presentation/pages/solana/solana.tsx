import React, { useEffect, useState } from 'react'
import styles from './solana-styles.module.scss'
import { LucideArrowLeft, BrickWall, ArrowLeftRight, ArrowRight } from "lucide-react"
import Sidebar from '../../components/sidebar/sidebar'
import Hashblocks, { HashblockProps } from '../../components/hashblocks/hashblocks'
import Network, { NetworkData } from './components/network/network'
import CustomTabs from './components/custom-tabs/custom-tabs'
import IcpService from '../../../data/services/icp-service'
import { jsonParseBigint } from '../../../utils/json-parse-bigint'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import AddressInfo from './components/address-info/address-info'
import HashblockInfo from './components/hashblock-info/hashblock-info'
import { Tooltip } from '@mui/material'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from '../../components/whale-hunting/whale-hunting'
import { hoursInterval, minutesInterval } from '../../../utils/time'
import { compareTimestampDesc } from '../../../utils/sort'
import TransactionInfo from '../../components/transaction-info/transaction-info'

import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Facebook, Instagram } from '@mui/icons-material'
import { TokenChart } from './components/token-chart/token-chart'
import { useNavigate } from 'react-router-dom'
import NftTable from './components/nft-table/nft-table'
import { Card } from '@/src/components/ui/card'
import MemeTable from './components/meme-token-table/meme-token-table'
import CustomTabs2 from './components/custom-tabs2/custom-tabs2'

type HashblocksInfo = {
  tx_count: number
  height: number
  eficiency: number
  week: number
}

type Hashblock = {
  id: string
  height: number
  timestamp: Date
  address: string
  value: number
  fee: number
}

const items = [
  {
    icon: <Facebook />,
    url: 'https://www.facebook.com/groups/198537324100124/'
  },
  {
    icon: <XIcon />,
    url: 'https://twitter.com/solana'
  },
  {
    icon: <Instagram />,
    url: 'https://www.instagram.com/solana/'
  },
]

const Solana: React.FC = () => {
  const navigate = useNavigate()
  const [actual, setActual] = useState('Solana')
  const [actualHashblock, setActualHashblock] = useState(null)
  const [hashblocks, setHashblocks] = useState(
    [
      {
        id: '1206070',
        tx_count: 1211,
        size: 140000,
        height: 8982,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 120000
      },
      {
        id: '1206069',
        tx_count: 2510,
        size: 140000,
        height: 8981,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 420000
      },
      {
        id: '1206068',
        tx_count: 3245,
        size: 140000,
        height: 8980,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 720000
      },
      {
        id: '1206067',
        tx_count: 1827,
        size: 140000,
        height: 8979,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1020000
      },
      {
        id: '1206066',
        tx_count: '2517',
        size: 140000,
        height: 8978,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1320000
      },
      {
        id: '1206065',
        tx_count: 3225,
        size: 140000,
        height: 8977,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1620000
      },
      {
        id: '1206064',
        tx_count: 1981,
        size: 140000,
        height: 8976,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 1920000
      },
      {
        id: '1206063',
        tx_count: 1258,
        size: 140000,
        height: 8975,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 2220000
      },
      {
        id: '1206062',
        tx_count: 1428,
        size: 140000,
        height: 8974,
        value: 5.475,
        fee: 0.134,
        timestamp: Date.now() - 2520000
      },
    ]
  )
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [data, setData] = useState<NetworkData>(
    {
      description: "Solana network shows high transactional activity with an increase in active addresses; however, there has been a slight decrease in transaction volume on exchanges, suggesting a possible accumulation of tokens in private wallets and reduced trading movement in the short term",
      transactions: '2.020.749 transactions',
      transactionsValue: '2980937292746 SOL',
      avgTransactions: '418.861 transactions',
      address: '12300289033 addresses',
      token: 'SOL USD',
      links: items,
      close: 143.96,
      open: 157.23
    }
  )

  const verifyCacheInterval = (cache: any) => {
    if (cache.date) {
      const interval = minutesInterval(Date.now(), cache.date)

      if (interval >= 0 && interval < 5) {
        return true
      }
    }
    return false
  }

  const handleGetInfo = async (type: string, value: string) => {
    setModalOpened(true)

    if (type === 'address') {
      const response: any = await IcpService.getAddressInfo(value)

      if (response && response.includes('funded_txo_count')) {
        const data = {
          ok: JSON.parse(response),
          type: type
        }

        setInfo(data)
      }
      else {
        setInfo({ error: 'fail' })
      }
    }
    else if (type === 'transaction') {
      const response: any = await IcpService.getTransactionInfo(value)

      if (response && response.includes('txid')) {
        const data = {
          ok: JSON.parse(response),
          type: type
        }

        setInfo(data)
      }
      else {
        setInfo({ error: 'fail' })
      }
    }
  }

  const handleClose = () => {
    setInfo(null)
    setModalOpened(false)
  }

  const handleHashblock = (hashblock?: any) => {
    if (hashblock) {
      setActualHashblock(hashblock)
      // setHashblockOpened(true)
      navigate(`/solana/${hashblock.id}`, {
        state: hashblock
      })
    }
    else {
      setActualHashblock(null)
      setHashblockOpened(false)
    }
  }

  const handleOpen = (page: string) => {
    if (page === 'Whale Hunting') {
      setWhaleOpened(true)
    }
  }

  return (
    <div className={styles.home}>
      <Sidebar actual={actual} onChange={(coin) => setActual(coin)} open={(page: string) => handleOpen(page)} active='Dashboard' />
      <div className={styles.container}>
        <Header onSubmit={handleGetInfo} />
        <Hashblocks coin={actual} data={hashblocks} onSelect={(hashblock: any) => handleHashblock(hashblock)} />
        <div className={styles.info}>
          <Network data={data} />
          <div className={styles.custom}>
            <CustomTabs
              hashblocks={hashblocks}
              labels={['Active Addresses', 'Fees', 'Token Transfers', 'Transactions', 'Current Epoch']} />
          </div>
        </div>

        {/* <div className={`${styles.info} styles.wrapped`}>
          <Network data={data} /> */}
        <div className='grid grid-cols-2'>
          <div className={`${styles.custom} flex-1`}>
            <CustomTabs2
              hashblocks={hashblocks}
              labels={['TPS', 'AVG Ping Time', 'TVL']}
            />
          </div>

          <Card className={`${styles.card} flex-1 mx-10 flex my-10 pt-4`}>
            <div className='flex flex-col p-4 w-full'>
              <h3 className='text-zinc-400'>Volume</h3>
              <div className='flex'>
                <Card className='mt-1 flex bg-[#753EFE] w-[80%] border-none'>
                  <p className=' p-4 text-zinc-100 font-medium'>
                    $2,875,933,651
                  </p>
                  <div className='flex items-center ml-auto mr-8 hover:cursor-pointer' onClick={() => navigate('/solana/volume')}>
                    <ArrowRight className='text-zinc-100 w-8 h-8 center' />
                  </div>
                </Card>
                <Card className='flex items-center justify-items-center ml-4 w-[60px] bg-[#2C7300] border-none'>
                  <p className='text-zinc-100 m-auto text-xs'>+5.46%</p>
                </Card>
              </div>

              <h3 className='mt-4 text-zinc-100'>Market Cap</h3>
              <div className='flex'>
                <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none'>
                  <p className=' p-4 text-zinc-900 font-medium'>
                    $64,233,356,606
                  </p>
                  <div className='flex items-center  w-[38px] h-[38px] bg-[#753EFE] m-auto mr-8 rounded-md hover:cursor-pointer'>
                    <ArrowRight className='text-zinc-100 w-8 h-8 m-auto center' />
                  </div>
                </Card>
              </div>

              <h3 className='mt-4 text-zinc-100'>Supply</h3>
              <div className='flex'>
                <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none'>
                  <p className=' p-4 text-zinc-900 font-medium'>
                    585,827,435 SOL
                  </p>
                  <div className='flex items-center  w-[38px] h-[38px] bg-[#753EFE] m-auto mr-8 rounded-md hover:cursor-pointer'>
                    <ArrowRight className='text-zinc-100 w-8 h-8 m-auto center' />
                  </div>
                </Card>
              </div>

              <h3 className='mt-4 text-zinc-100'>Total Stake</h3>
              <div className='flex'>
                <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none'>
                  <p className=' p-4 text-zinc-900 font-medium'>
                    392,545,171.92 SOL
                  </p>
                  <div className='flex items-center  w-[38px] h-[38px] bg-[#753EFE] m-auto mr-8 rounded-md hover:cursor-pointer'>
                    <ArrowRight className='text-zinc-100 w-8 h-8 m-auto center' />
                  </div>
                </Card>
              </div>

              <h3 className='mt-4 text-zinc-100'>Token Balances</h3>
              <div className='flex'>
                <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none'>
                  <p className=' p-4 text-zinc-900 font-medium'>
                    263,762,293 SOL
                  </p>
                  <div className='flex items-center  w-[38px] h-[38px] bg-[#753EFE] m-auto mr-8 rounded-md hover:cursor-pointer'>
                    <ArrowRight className='text-zinc-100 w-8 h-8 m-auto center' />
                  </div>
                </Card>
              </div>

              <h3 className='mt-4 text-zinc-100'>Exchange Flow</h3>
              <div className='flex'>
                <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none'>
                  <p className=' p-4 text-zinc-900 font-medium'>
                    263,762,293 SOL
                  </p>
                  <div className='flex items-center  w-[38px] h-[38px] bg-[#753EFE] m-auto mr-8 rounded-md hover:cursor-pointer'>
                    <ArrowRight className='text-zinc-100 w-8 h-8 m-auto center' />
                  </div>
                </Card>
              </div>

              <h3 className='mt-4 text-zinc-100'>Active Validators</h3>
              <div className='flex'>
                <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none'>
                  <p className=' p-4 text-zinc-900 font-medium'>
                    1461
                  </p>
                  <div className='flex items-center w-[38px] h-[38px] bg-[#753EFE] m-auto mr-8 rounded-md hover:cursor-pointer'>
                    <ArrowRight className='text-zinc-100 w-8 h-8 m-auto center' />
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          <Card className={`${styles.card} flex-1 mx-10 flex my-10 pt-4`}>
            <NftTable title="Top NFTs" />
          </Card>

          <Card className={`${styles.card} flex-1 mx-10 flex my-10 pt-4`}>
            <MemeTable title="Top Meme Coins" />
          </Card>
        </div>
      </div>
      {/* </div> */}

      {
        modalOpened && <InfoModal data={info} onClose={() => handleClose()}>
          {
            info?.type === 'address' ? <AddressInfo title="Address Information" data={info?.['ok']} />
              // : <TransactionInfo title="Transaction Information" data={info?.['ok'] && info?.['ok'][0] !== 'Invalid hex string' && JSON.parse(info?.['ok'][0])} />
              : <TransactionInfo title="Transaction Information" data={info?.['ok']} />
          }
        </InfoModal>
      }

      {
        hashblockOpened && actualHashblock && <HashblockInfo data={actualHashblock} onClose={() => handleHashblock()} />
      }

      {
        chatOpened ? (
          <OpenChat onClose={() => setChatOpened(false)} />
        )
          :
          <div className={styles.chat} onClick={() => setChatOpened(true)}>
            <Tooltip title="Community" placement="left" >
              <img src="openchat.svg" alt="" />
            </Tooltip>
          </div>
      }

      {
        whaleOpened && (
          <WhaleHunting onSelect={(id: string) => handleGetInfo('address', id)} onClose={() => setWhaleOpened(false)} />
        )
      }
    </div>
  )
}

export default Solana