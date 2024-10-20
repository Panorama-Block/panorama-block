import React, { useEffect, useState } from 'react'
import styles from './home-styles.module.scss'
import Sidebar from '../../components/sidebar/sidebar'
import Hashblocks, { HashblockProps } from '../../components/hashblocks/hashblocks'
import Network, { NetworkData } from '../../components/network/network'
import CustomTabs from '../../components/custom-tabs/custom-tabs'
import IcpService from '../../../data/services/icp-service'
import { jsonParseBigint } from '../../../utils/json-parse-bigint'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import TransactionInfo from '../../components/transaction-info/transaction-info'
import AddressInfo from '../../components/address-info/address-info'
import HashblockInfo from './components/hashblock-info/hashblock-info'
import { Tooltip } from '@mui/material'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from './components/whale-hunting/whale-hunting'
import { hoursInterval, minutesInterval } from '../../../utils/time'
import { compareTimestampDesc } from '../../../utils/sort'

const Home: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [actualHashblock, setActualHashblock] = useState(null)
  const [hashblocks, setHashblocks] = useState<HashblockProps[]>()
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [data, setData] = useState<NetworkData>(
    {
      description: "Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain.",
      transactions: '2.487.316 transactions',
      avgTransactions: '59.267 BTC',
      transactionsValue: '414.869 BTC',
      address: '2.118.955 addresses',
      token: 'BTC USD'
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

  useEffect(() => {
    const getHashblocks = async (): Promise<void> => {
      const cache = localStorage.getItem('hashblocks')

      if (cache && verifyCacheInterval(JSON.parse(cache))) {
        setHashblocks(JSON.parse(cache).ok)
      }
      else {
        let count = 0
        const data: { ok: HashblockProps[], date: number } = { ok: [], date: 0 }
        let lastIdAdded = ''

        while (true) {
          const response: any = await IcpService.getHashblocksCached()
          // const response: any = await IcpService.getHashblocks(count)

          if (response && response.length > 0) {
            const json = await jsonParseBigint(response)
            // const jsonFormated = json.map((hashblock: any) => ({ ...hashblock, timestamp: hashblock['timestamp'] * 1000 }))
            // const sorted: HashblockProps[] = jsonFormated.sort(compareTimestampDesc)
            const sorted: HashblockProps[] = json.sort(compareTimestampDesc)

            if (lastIdAdded == sorted[0].id) {
              break
            }

            lastIdAdded = sorted[0].id

            data.ok.push(...sorted)
            count++
          }
          else {
            break
          }
        }

        if (data.ok.length > 0) {
          data.date = Date.now()
          setHashblocks(data.ok)
          localStorage.setItem('hashblocks', JSON.stringify(data))
        }
      }
    }

    getHashblocks()
  }, [])

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
      setHashblockOpened(true)
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
          <CustomTabs
            hashblocks={hashblocks}
            labels={['by hashblocks', 'by time']} />
        </div>
      </div>

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

export default Home