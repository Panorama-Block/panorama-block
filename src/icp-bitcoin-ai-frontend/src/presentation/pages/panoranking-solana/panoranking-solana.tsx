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
import HashblockInfo from './components/hashblock-info/hashblock-info'

import styles from './panoranking-solana-styles.module.scss'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs"

const data = [
  {
    id: 1,
    name: 'Jito',
    url: "",
    logo: "/panoranking/solana/jito.webp",
    tvl: {
      value: "$1,917b",
      lastDay: "+5.12%",
      last7Days: "-8.39%",
      last30Days: "+9.20%"
    },
    fee: {
      lastDay: "$1,32m",
      last7Days: "$11,08m",
      last30Days: "$11,08m"
    },
    volume: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    revenue: {
      lastDay: "$52.934",
      last7Days: "$443.216",
      last30Days: "$751.396"
    }
  },
  {
    id: 2,
    name: 'Kamino',
    url: "",
    logo: "/panoranking/solana/kamino.webp",
    tvl: {
      value: "$1,52b",
      lastDay: "+4.07%",
      last7Days: "-6.09%",
      last30Days: "+6.88%"
    },
    fee: {
      lastDay: "$1,32m",
      last7Days: "$1,07m",
      last30Days: "$4,36m"
    },
    volume: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    revenue: {
      lastDay: "$29.201",
      last7Days: "$208.530",
      last30Days: "$1,04m"
    }
  },
  {
    id: 3,
    name: "Jupiter",
    url: "",
    logo: "/panoranking/solana/jupiter.webp",
    tvl: {
      value: "$1,237b",
      lastDay: "+4.61%",
      last7Days: "-1.25%",
      last30Days: "+21.73%"
    },
    fee: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    volume: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    revenue: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    }
  },
  {
    id: 4,
    name: "Marinade",
    url: "",
    logo: "/panoranking/solana/marinade.webp",
    tvl: {
      value: "$1,143b",
      lastDay: "+5.23%",
      last7Days: "-8.19%",
      last30Days: "+14.06%"
    },
    fee: {
      lastDay: "$176.446",
      last7Days: "$1,33m",
      last30Days: "$5,09m"
    },
    volume: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    revenue: {
      lastDay: "$7.100",
      last7Days: "$53.558",
      last30Days: "$205.963"
    }
  },
  {
    id: 5,
    name: "Raydium",
    url: "",
    logo: "/panoranking/solana/raydium.webp",
    tvl: {
      value: "$1,035b",
      lastDay: "+6.64%",
      last7Days: "-4.77%",
      last30Days: "+20.65%"
    },
    fee: {
      lastDay: "$834.047",
      last7Days: "$8,47m",
      last30Days: "$18,43m"
    },
    volume: {
      lastDay: "$497,23m",
      last7Days: "$3,989b",
      last30Days: "+40.58%"
    },
    revenue: {
      lastDay: "$44.320",
      last7Days: "$432.218",
      last30Days: "$954.443"
    }
  },
  {
    id: 6,
    name: "Sanctum",
    url: "",
    logo: "/panoranking/solana/sanctum.webp",
    tvl: {
      value: "$946,49m",
      lastDay: "+5.79%",
      last7Days: "-4.89%",
      last30Days: "+30.60%"
    },
    fee: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    volume: {
      lastDay: "$83.494",
      last7Days: "$2,81m",
      last30Days: ""
    },
    revenue: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    }
  },
  {
    id: 7,
    name: "Drift",
    url: "",
    logo: "/panoranking/solana/drift.webp",
    tvl: {
      value: "$417,16m",
      lastDay: "+4.24%",
      last7Days: "-1.73%",
      last30Days: "+7.36%"
    },
    fee: {
      lastDay: "$76.383",
      last7Days: "$328.888",
      last30Days: "$820.814"
    },
    volume: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    revenue: {
      lastDay: "$53.418",
      last7Days: "$238.725",
      last30Days: "$614.799"
    }
  },
  {
    id: 8,
    name: "marginfi",
    url: "",
    logo: "/panoranking/solana/marginfi.webp",
    tvl: {
      value: "$360,96m",
      lastDay: "+5.92%",
      last7Days: "-8.06%",
      last30Days: "+3.86%"
    },
    fee: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    volume: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    revenue: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    }
  },
  {
    id: 9,
    name: "Orca",
    url: "",
    logo: "/panoranking/solana/orca.webp",
    tvl: {
      value: "$292,77m",
      lastDay: "+3.48%",
      last7Days: "-3.71%",
      last30Days: "+8.58%"
    },
    fee: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    volume: {
      lastDay: "$414,26m",
      last7Days: "$3,112b",
      last30Days: "+30.63%"
    },
    revenue: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    }
  },
  {
    id: 10,
    name: "Meteora",
    url: "",
    logo: "/panoranking/solana/meteora.webp",
    tvl: {
      value: "$286,39m",
      lastDay: "+5.63%",
      last7Days: "-6.14%",
      last30Days: "+13.99%"
    },
    fee: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    },
    volume: {
      lastDay: "$17,48m",
      last7Days: "$111,33m",
      last30Days: ""
    },
    revenue: {
      lastDay: "",
      last7Days: "",
      last30Days: ""
    }
  }
]
enum FilterENUM {
  tvl = "tvl",
  fee = "fee",
  volume = "volume",
  revenue = "revenue"
}

const PanorankingSolana: React.FC = () => {
  const [actual, setActual] = useState('Solana')
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [filter, setFilter] = useState<FilterENUM>(FilterENUM.tvl)

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
      <Sidebar active="Pano Ranking" actual={actual} onChange={(coin) => setActual(coin)} open={(page: string) => handleOpen(page)} />
      <div className={styles.container}>
        <Header onSubmit={handleGetInfo} />
        <div className="flex flex-col ml-12 mr-12 text-white">
          <div className="flex gap-3 ">
            <h1 className='text-xl ml-8 font-bold'>Pano Ranking</h1>
            <Tabs defaultValue="tvl" className="ml-auto mr-12">
              <TabsList className='bg-zinc-900 text-zinc-400'>
                <TabsTrigger value="tvl" onClick={() => setFilter(FilterENUM.tvl)}>Tvl</TabsTrigger>
                <TabsTrigger value="fee" onClick={() => setFilter(FilterENUM.fee)}>Fee</TabsTrigger>
                <TabsTrigger value="volume" onClick={() => setFilter(FilterENUM.volume)}>Volume</TabsTrigger>
                <TabsTrigger value="revenue" onClick={() => setFilter(FilterENUM.revenue)}>Revenue</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className={`${styles.card} m-4`}>
            <Table >
              <TableHeader>
                <TableRow className="border-zinc-600 hover:bg-[#f2f2f210]">
                  <TableHead className="text-white font-bold text-md">#</TableHead>
                  <TableHead className="text-white font-bold text-md">Name</TableHead>
                  {
                    filter == 'tvl' && <TableHead className="text-white font-bold text-md">TVL</TableHead>
                  }
                  {/* {
                    filter == 'tvl' ? <TableHead className="text-white font-bold text-md">TVL</TableHead>
                      :
                      <TableHead className="text-white font-bold text-md"></TableHead>
                  } */}
                  <TableHead className="text-white font-bold text-md">1d</TableHead>
                  <TableHead className="text-white font-bold text-md">7d</TableHead>
                  <TableHead className="text-white font-bold text-md">30d</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} className="border-zinc-700 text-[#A0AEC0] hover:bg-[#f2f2f210]">
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell className="font-medium flex items-center justify-items-center gap-4 min-w-[100px]">
                      <span>
                        <img className='w-[20px] h-[20px] rounded-full' src={row.logo} alt="" />
                      </span>
                      <span className='pb-0.5'>
                        {row.name}
                      </span>
                    </TableCell>
                    {
                      filter == 'tvl' && <TableCell className="font-medium min-w-[100px]">{row.tvl.value}</TableCell>
                    }
                    {/* {
                      filter == 'tvl' ? <TableCell className="font-medium min-w-[100px]">{row.tvl.value}</TableCell>
                        :
                        <TableCell className="font-medium min-w-[100px]"></TableCell>
                    } */}
                    <TableCell className={
                      `${row[filter].lastDay.includes('%') ? row[filter].lastDay.includes('-') ? 'text-[red]' : 'text-[green]' : ''} min-w-[100px] font-medium`
                    }>
                      {row[filter].lastDay}
                    </TableCell>
                    <TableCell className={
                      `${row[filter].last7Days.includes('%') ? row[filter].last7Days.includes('-') ? 'text-[red]' : 'text-[green]' : ''} min-w-[100px] font-medium`
                    }>
                      {row[filter].last7Days}
                    </TableCell>
                    <TableCell className={
                      `${row[filter].last30Days.includes('%') ? row[filter].last30Days.includes('-') ? 'text-[red]' : 'text-[green]' : ''} min-w-[100px] font-medium`
                    }>
                      {row[filter].last30Days}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div >
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

export default PanorankingSolana