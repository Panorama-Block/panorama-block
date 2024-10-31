import React, { useEffect, useState } from 'react'
import styles from './icp-styles.module.scss'
import Sidebar from '../../components/sidebar/sidebar'
import { HashblockProps } from '../../components/hashblocks/hashblocks'
import Network from './components/network/network'
import CustomTabs from './components/custom-tabs/custom-tabs'
import IcpService from '../../../data/services/icp-service'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import TransactionInfo from '../../components/transaction-info/transaction-info'
import AddressInfo from '../../components/address-info/address-info'
import { Tooltip } from '@mui/material'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from './components/whale-hunting/whale-hunting'
import { getLastWeek, hoursInterval, minutesInterval } from '../../../utils/time'
import { compareTimestampDesc } from '../../../utils/sort'
import { CanistersChart } from './components/canisters-chart/canisters-chart'
import { CyclesRateChart } from './components/cycles-rate-chart/cycles-rate-chart'
import { BlocksHeightChart } from './components/blocks-height-chart/blocks-height-chart'

const Icp: React.FC = () => {
  const [actual, setActual] = useState('ICP')
  const [actualHashblock, setActualHashblock] = useState(null)
  const [hashblocks, setHashblocks] = useState<HashblockProps[]>()
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [data, setData] = useState(
    {
      description: "The Internet Computer is a public blockchain network enabled by new science from first principles. It is millions of times more powerful and can replace clouds and traditional IT. The network - created by ICP, or Internet Computer Protocol - is orchestrated by permissionless decentralized governance and is hosted on sovereign hardware devices run by independent parties. Its purpose is to extend the public internet with native cloud computing functionality.",
      avgTransactions: '59.267 BTC',
      transactionsValue: '414.869 BTC',
      address: "9918",
      block_height: "3968007981",
      transactions: "15466893",
      fee: "145904990000",
      burned: "41569312762767",
      circulating_supply: "47318724386468124",
      token: 'ICP USD'
    }
  )
  const [chain, setChain] = useState<any>([])
  const [bitcoinTransactions, setBitcoinTranscations] = useState<any>([])
  const [stableMemory, setStableMemory] = useState<any>([])
  const [canisters, setCanisters] = useState<any>([])
  const [transactions, setTransactions] = useState<any>([])
  const [cyclesRate, setCyclesRate] = useState<any>([])
  const [blocksHeight, setBlocksHeight] = useState<any>([])

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
    const getDailyStats = async () => {
      const response: any = await IcpService.getDailyStats()
      if (response) {
        setData({
          ...data,
          address: response.daily_active_users,
          fee: response.icp_burned_fees,
          burned: response.icp_burned_total,
          transactions: response.total_transactions
        })
      }
    }

    getDailyStats()
  }, [])

  useEffect(() => {
    const now = new Date()
    const lastWeek = getLastWeek(now)

    const date = {
      start: Math.floor((+lastWeek) / 1000),
      end: Math.floor((+now) / 1000)
    }

    const getMainChain = async (): Promise<void> => {
      const response = await IcpService.getMainChain(date)

      setChain(response)
    }

    const getBitcoinTransactions = async (): Promise<void> => {
      const response = await IcpService.getBitcoinTransactions(date)

      setBitcoinTranscations(response)
    }

    const getMemory = async (): Promise<void> => {
      const response = await IcpService.getStable(date)

      setStableMemory(response)
    }

    getMainChain()
    getBitcoinTransactions()
    getMemory()
  }, [])

  useEffect(() => {
    const getCanisters = async () => {
      const now = new Date()
      const lastWeek = getLastWeek(now)

      const date = {
        start: Math.floor((+lastWeek) / 1000),
        end: Math.floor((+now) / 1000)
      }

      const response: any = await IcpService.getCanisters(date)
      if (response) {
        setCanisters(response)
      }
    }

    getCanisters()
  }, [])

  useEffect(() => {
    const now = new Date()
    const lastWeek = getLastWeek(now)

    const date = {
      start: Math.floor((+lastWeek) / 1000),
      end: Math.floor((+now) / 1000)
    }

    console.log(date)

    const getCyclesRate = async () => {

      const response: any = await IcpService.getCyclesRate(date)
      if (response) {
        setCyclesRate(response)
      }
    }

    getCyclesRate()
  }, [])

  useEffect(() => {
    const now = new Date()
    const lastWeek = getLastWeek(now)

    const date = {
      start: Math.floor((+lastWeek) / 1000),
      end: Math.floor((+now) / 1000)
    }

    const getBlocksHeight = async () => {

      const response: any = await IcpService.getBlocksHeight(date)
      if (response) {
        setBlocksHeight(response)
      }
    }

    getBlocksHeight()
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
        <div className={styles.info}>
          <Network data={data} />
          <div className={styles.custom}>
            {
              chain && <CustomTabs
                data={{ bitcoinChain: chain, bitcoinTxs: bitcoinTransactions, bitcoinStableMemory: stableMemory }}
                labels={['Chain Height (7 days)', 'Bitcoin Transactions (7 days)', 'Stable Memory (7 days)']} />
            }
          </div>
        </div>

        <div className="flex gap-3 ">
          <h3 className="ml-[60px] mb-4 text-lg font-bold text-zinc-100">Canisters</h3>
        </div>
        {
          canisters && <div className="flex flex-col mb-8 mx-[20px] text-white xl:mx-[40px]">
            <CanistersChart data={canisters} key="canisters" legend="Canisters" title="" range={[0, 4]} />
          </div>
        }


        <div className="flex gap-3 ">
          <h3 className="ml-[60px] mb-4 text-lg font-bold text-zinc-100">Cycles Burn Rate</h3>
        </div>
        {
          cyclesRate && <div className="flex flex-col mb-8 mx-[20px] text-white xl:mx-[40px]">
            <CyclesRateChart data={cyclesRate} key="cycles" legend="Cycles" title="" />
          </div>
        }

        <div className="flex gap-3 ">
          <h3 className="ml-[60px] mb-4 text-lg font-bold text-zinc-100">Blocks Heigth</h3>
        </div>
        {
          blocksHeight && <div className="flex flex-col mb-8 mx-[20px] text-white xl:mx-[40px]">
            <BlocksHeightChart data={blocksHeight} key="blocks" legend="Blocks" title="" />
          </div>
        }
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

export default Icp