import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import IcpService from '../../../data/services/icp-service'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from '../../components/whale-hunting/whale-hunting'
import TransactionInfo from '../../components/transaction-info/transaction-info'

import AddressInfo from '../../components/address-info/address-info'
import { Tooltip } from '@mui/material'

import styles from './ck-bitcoin-styles.module.scss'
import CanistersTable from './components/ canisters-table/canisters-table'
import TranscationsTable from './components/transactions-table/transactions-table'
import { getLastWeek } from '@/src/utils/time'
import { CkAreaChart } from './components/ck-area-chart/ck-area-chart'

const CkBitcoin: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [canisters, setCanisters] = useState()
  const [transactions, setTransactions] = useState()
  const [totalSuply, setTotalSuply] = useState()
  const [numberTransactions, setNumberTransactions] = useState()
  const [height, setHeight] = useState()
  const [memory, setMemory] = useState()

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

  useEffect(() => {
    const getCanisters = async () => {
      const response = await IcpService.getCkBTCCanisters()
      setCanisters(response)
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

    const getTotalSuply = async () => {
      const response = await IcpService.getCkBTCSuply(date)
      setTotalSuply(response)
    }

    getTotalSuply()
  }, [])

  useEffect(() => {
    const getTransactions = async () => {
      const response = await IcpService.getCkBTCTransactions(24)
      setTransactions(response)
    }

    getTransactions()
  }, [])

  useEffect(() => {
    const now = new Date()
    const lastWeek = getLastWeek(now)

    const date = {
      start: Math.floor((+lastWeek) / 1000),
      end: Math.floor((+now) / 1000)
    }

    const getNumberTransactions = async () => {
      const response = await IcpService.getCkBTCNumberTransactions(date)
      setNumberTransactions(response)
    }

    getNumberTransactions()
  }, [])

  useEffect(() => {
    const now = new Date()
    const lastWeek = getLastWeek(now)

    const date = {
      start: Math.floor((+lastWeek) / 1000),
      end: Math.floor((+now) / 1000)
    }

    const getBlocksHeight = async () => {
      const response = await IcpService.getCkBTCHeight(date)
      setHeight(response)
    }

    getBlocksHeight()
  }, [])

  useEffect(() => {
    const now = new Date()
    const lastWeek = getLastWeek(now)

    const date = {
      start: Math.floor((+lastWeek) / 1000),
      end: Math.floor((+now) / 1000)
    }

    const getMemory = async () => {
      const response = await IcpService.getCkBTCStable(date)
      setMemory(response)
    }

    getMemory()
  }, [])


  return (
    <div className={styles.home}>
      <Sidebar active="Stacks" actual={actual} onChange={(coin) => setActual(coin)} open={(page: string) => handleOpen(page)} />
      <div className={styles.container}>
        <Header onSubmit={handleGetInfo} />

        {
          totalSuply && <div className="flex flex-col mb-8 mx-12 text-white">
            <div className="flex gap-3 my-4">
              <h3 className="ml-8 text-lg font-bold">ckBTC Total Suply</h3>
            </div>
            <CkAreaChart data={totalSuply} dataKey="total_suply" legend="Total Suply" title="" range={[20000000000, 25000000000]} />
          </div>
        }

        {
          numberTransactions && <div className="flex flex-col mb-8 mx-12 text-white">
            <div className="flex gap-3 my-4">
              <h3 className="ml-8 text-lg font-bold">ckBTC UTXos</h3>
            </div>
            <CkAreaChart data={numberTransactions} dataKey="number_of_utxos" legend="Unspent Transaction Outputs" title="" range={[182000000, 188000000]} />
          </div>
        }

        {
          memory && <div className="flex flex-col mb-8 mx-12 text-white">
            <div className="flex gap-3 my-4">
              <h3 className="ml-8 text-lg font-bold">ckBTC Stable Memory Usage</h3>
            </div>
            <CkAreaChart data={memory} dataKey="memory" legend="Stable Memory" title="" range={[868000, 870000]} />
          </div>
        }

        {
          height && <div className="flex flex-col mb-8 mx-12 text-white">
            <div className="flex gap-3 my-4">
              <h3 className="ml-8 text-lg font-bold">ckBTC Block Height</h3>
            </div>
            <CkAreaChart data={height} dataKey="height" legend="Block Height" title="" range={[868000, 870000]} />
          </div>
        }

        {
          canisters && <div className="flex flex-col mb-4 mx-12 text-white">
            <CanistersTable title='ckBTC Canisters' data={canisters} />
          </div>
        }

        {
          transactions && <div className="flex flex-col mb-4 mx-12 text-white">
            <TranscationsTable title='ckBTC Transactions' data={transactions} />
          </div>
        }

        {/* <div className="flex flex-col mb-4 mx-12 text-white">
          <PoxTable title='Pox Explorer' data={stacksData.pox} />
        </div>

        <div className="flex flex-col mb-4 mx-12 text-white">
          <PoxMinersTable title='Pox Miners' data={stacksData.poxMiners} />
        </div>

        <div className="flex flex-col mb-4 mx-12 text-white">
          <VRFKeyTable title='VRF Key' data={stacksData.VRFKey} />
        </div>

        <div className="flex flex-col mb-4 mx-12 text-white">
          <OpsTable title='Ops' data={stacksData.ops} />
        </div>

        <div className="flex flex-col mb-6 mx-16 text-white">
          <SpendingChart data={stacksData.poxSubCycles} key="height" legend="Height" title="Stacking Cycles" range={[0, 4]} />
        </div> */}

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
    </div >
  )
}

export default CkBitcoin