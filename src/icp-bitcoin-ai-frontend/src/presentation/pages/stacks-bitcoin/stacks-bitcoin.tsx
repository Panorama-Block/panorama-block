import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import IcpService from '../../../data/services/icp-service'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from '../../components/whale-hunting/whale-hunting'
import TransactionInfo from '../../components/transaction-info/transaction-info'

import stacksData from '../../../data/services/stacks.json'

import AddressInfo from '../../components/address-info/address-info'
import { Tooltip } from '@mui/material'
import HashblockInfo from './components/hashblock-info/hashblock-info'

import styles from './stacks-bitcoin-styles.module.scss'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs"
import PoxSpendingTable from './components/pox-spending-table/pox-spending-table'
import PoxMinersTable from './components/pox-miners-table/pox-miners-table'
import PoxTable from './components/pox-table/pox-table'
import VRFKeyTable from './components/vrf-key-table/vrf-key-table'
import OpsTable from './components/ops-table/ops-table'
import { Card } from '@/src/components/ui/card'
import { SpendingChart } from './components/spending-chart/spending-chart'

const data = [
  {
    id: 1,
    name: 'StackingDAO',
    url: "",
    logo: "/stacks/bitcoin/stackingdao.webp",
    tvl: {
      value: "$106,76m",
      lastDay: "+2.46%",
      last7Days: "+10.96%",
      last30Days: "+12.22%"
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
    id: 2,
    name: 'ALEX',
    url: "",
    logo: "/stacks/bitcoin/alex.webp",
    tvl: {
      value: "$38,42m",
      lastDay: "+1.03%",
      last7Days: "+10.99%",
      last30Days: "+11.41%"
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
    id: 3,
    name: "Zest",
    url: "",
    logo: "/stacks/bitcoin/zest.webp",
    tvl: {
      value: "$37,91m",
      lastDay: "+2.24%",
      last7Days: "+20.27%",
      last30Days: "+16.75%"
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
    name: "Bitflow",
    url: "",
    logo: "/stacks/bitcoin/bitflow.webp",
    tvl: {
      value: "$18,61m",
      lastDay: "+2.01%",
      last7Days: "+10.72%",
      last30Days: "+3.14%"
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
    id: 5,
    name: "Arkadiko",
    url: "",
    logo: "/stacks/bitcoin/arkadiko.webp",
    tvl: {
      value: "$11,67m",
      lastDay: "+2.47%",
      last7Days: "+13.82%",
      last30Days: "+9.56%"
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
    id: 6,
    name: "LISA",
    url: "",
    logo: "/stacks/bitcoin/lisa.webp",
    tvl: {
      value: "$8,73m",
      lastDay: "+1.65%",
      last7Days: "+11.65%",
      last30Days: "+3.19%"
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
    id: 7,
    name: "Velar Protocol",
    url: "",
    logo: "/stacks/bitcoin/velar-protocol.webp",
    tvl: {
      value: "$4,24m",
      lastDay: "+3.52%",
      last7Days: "+17.25%",
      last30Days: "+0.18%"
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
    id: 8,
    name: "CityCoins",
    url: "",
    logo: "/stacks/bitcoin/citycoins.webp",
    tvl: {
      value: "$704.348",
      lastDay: "+2.14%",
      last7Days: "+11.70%",
      last30Days: "+9.77%"
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
    name: "StackSwap",
    url: "",
    logo: "/stacks/bitcoin/stackswap.webp",
    tvl: {
      value: "$570.391",
      lastDay: "+1.49%",
      last7Days: "+9.47%",
      last30Days: "+7.95%"
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
    id: 10,
    name: "UWU Protocol",
    url: "",
    logo: "/stacks/bitcoin/uwu-protocol.webp",
    tvl: {
      value: "$16.505",
      lastDay: "+1.60%",
      last7Days: "+12.35%",
      last30Days: "+9.14%"
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
    id: 11,
    name: "Satoshi DEX",
    url: "",
    logo: "/stacks/bitcoin/satoshi-dex.webp",
    tvl: {
      value: "$11.735",
      lastDay: "+3.21%",
      last7Days: "+8.22%",
      last30Days: "+9.21%"
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
    id: 12,
    name: "Allbridge Classic",
    url: "",
    logo: "/stacks/bitcoin/allbridge-classic.webp",
    tvl: {
      value: "",
      lastDay: "",
      last7Days: "",
      last30Days: ""
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
  }
]
enum FilterENUM {
  tvl = "tvl",
  fee = "fee",
  volume = "volume",
  revenue = "revenue"
}

const StacksBitcoin: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
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
      <Sidebar active="Stacks" actual={actual} onChange={(coin) => setActual(coin)} open={(page: string) => handleOpen(page)} />
      <div className={styles.container}>
        <Header onSubmit={handleGetInfo} />

        <div className="flex flex-col mb-4 mx-12 text-white">
          <PoxSpendingTable title='Pox Spending' data={stacksData.poxSpending} />
        </div>

        <div className="flex flex-col mb-4 mx-12 text-white">
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
        </div>

        <div className="flex flex-col ml-12 mr-12 text-white">
          <div className="flex gap-3 ">
            <h1 className='text-xl ml-8 font-bold'>Ranking</h1>
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
    </div >
  )
}

export default StacksBitcoin