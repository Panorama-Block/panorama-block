import { useNavigate } from "react-router-dom"
import Header from "../../components/header/header"
import Sidebar from "../../components/sidebar/sidebar"
import { useState } from "react"
import { NetworkData } from "../solana/components/network/network"
import IcpService from "@/src/data/services/icp-service"
import styles from './solana-volume-styles.module.scss'
import { LucideArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { TokenChart } from "../solana/components/token-chart/token-chart"
import { VolumeChart } from "../solana/components/volume-chart/volume-chart"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const volumeData = [
  { legend: "09/27", desktop: 241029812 },
  { legend: "09/28", desktop: 200021827 },
  { legend: "09/29", desktop: 240178652 },
  { legend: "09/30", desktop: 220212348 },
  { legend: "10/01", desktop: 232791028 },
  { legend: "10/02", desktop: 232791028 },
  { legend: "10/03", desktop: 232791028 },
]

const usersData = [
  { legend: "09/27", desktop: 47576 },
  { legend: "09/28", desktop: 57812 },
  { legend: "09/29", desktop: 62389 },
  { legend: "09/30", desktop: 45128 },
  { legend: "10/01", desktop: 48924 },
  { legend: "10/02", desktop: 48924 },
  { legend: "10/03", desktop: 48924 },
]

const valueLockedData = [
  { legend: "09/27", desktop: 226128135 },
  { legend: "09/28", desktop: 228906126 },
  { legend: "09/29", desktop: 224081739 },
  { legend: "09/30", desktop: 223878126 },
  { legend: "10/01", desktop: 224509461 },
  { legend: "10/02", desktop: 224509461 },
  { legend: "10/03", desktop: 224509461 },
]

const totalTransfersData = [
  { legend: "09/27", desktop: 3827916 },
  { legend: "09/28", desktop: 4890224 },
  { legend: "09/29", desktop: 4790825 },
  { legend: "09/30", desktop: 3658921 },
  { legend: "10/01", desktop: 3649872 },
  { legend: "10/02", desktop: 3649872 },
  { legend: "10/03", desktop: 3649872 },
]

const SolanaVolume = () => {
  const navigate = useNavigate()
  const [actual, setActual] = useState('Solana')
  const [actualHashblock, setActualHashblock] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [info, setInfo] = useState<any>()

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
        <div className="mx-12 mt-4 mb-8 flex gap-3 text-zinc-100">
          <LucideArrowLeft className="hover:cursor-pointer" onClick={() => navigate(-1)} />
          <h2>Volume</h2>

          <div className="flex-1">
            <Select>
              <SelectTrigger className="ml-auto w-[180px] mr-[120px] bg-zinc-900 border-none" defaultValue="raydium">
                <SelectValue placeholder="Raydium" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-200">
                <SelectGroup>
                  <SelectItem value="orca">Orca</SelectItem>
                  <SelectItem value="raydium">Raydium</SelectItem>
                  <SelectItem value="blueberry">jupiter</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="lifinity">Lifinity</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={`mx-16 grid grid-cols-2 gap-[40px] text-zinc-100`}>
          <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none rounded-[14px]'>
            <VolumeChart data={volumeData} key="volume" legend="Volume" title="Total Volume" range={[0, 5000000]} />
          </Card>

          <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none rounded-[14px]'>
            <VolumeChart data={valueLockedData} key="valueLocked" legend="Value Locked" title="Total Value Locked" range={[0, 250000000]} />
          </Card>

          <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none rounded-[14px]'>
            <VolumeChart data={usersData} key="users" legend="Users" title="Active Users" range={[0, 75000]} />
          </Card>

          <Card className='mt-1 flex bg-[#D3D3D3]  w-[90%] border-none rounded-[14px]'>
            <VolumeChart data={totalTransfersData} key="volume" legend="Transactions" title="Total Transactions" range={[0, 5000000]} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SolanaVolume