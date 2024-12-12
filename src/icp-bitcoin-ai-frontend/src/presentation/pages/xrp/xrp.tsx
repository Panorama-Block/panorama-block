import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import styles from './xrp-styles.module.scss'
import Hashblocks, { HashblockProps } from '../../components/hashblocks/hashblocks'
import Network, { NetworkData } from '../../components/network/network'
import CustomTabs from '../../components/custom-tabs/custom-tabs'
import IcpService from '../../../data/services/icp-service'
import { jsonParseBigint } from '../../../utils/json-parse-bigint'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import TransactionInfo from '../../components/transaction-info/transaction-info'
import AddressInfo from '../../components/address-info/address-info'
import { Tooltip } from '@mui/material'
import OpenChat from '../../components/open-chat/open-chat'
import { hoursInterval, minutesInterval } from '../../../utils/time'
import { compareTimestampDesc } from '../../../utils/sort'
import WhaleHunting from '../../components/whale-hunting/whale-hunting'
import { InfoBox } from '../../components/info-box/info-box'
import { ChartByTime } from '../../components/chart-by-time/chart-by-time'
import { InfoList } from '../../components/info-list/info-list'
import Layout from '../../components/layout/Layout';
import { QuickTransfer } from '@/src/presentation/components/quick-transfer/quick-transfer'
import { Wallet } from '@/src/presentation/components/wallet/wallet'

const XRP: React.FC = () => {
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
            description: "XRP is a digital asset built for payments. It is the native digital asset on the XRP Ledger—an open-source, permissionless, and decentralized blockchain technology.",
            transactions: '1,234,567 transactions',
            avgTransactions: '12,345 XRP',
            transactionsValue: '567,890 XRP',
            address: '987,654 addresses',
            token: 'XRP USD'
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
                    // const response: any = await IcpService.getHashblocksCached()
                    const response: any = await IcpService.getHashblocks(count)

                    if (response && response.length > 0) {
                        const json = await jsonParseBigint(response)
                        const jsonFormated = json.map((hashblock: any) => ({ ...hashblock, timestamp: hashblock['timestamp'] * 1000 }))
                        const sorted: HashblockProps[] = jsonFormated.sort(compareTimestampDesc)
                        // const sorted: HashblockProps[] = json.sort(compareTimestampDesc)

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

    const chartData = [
        { date: "8/04", value: 0 },
        { date: "9/04", value: 10000 },
        { date: "10/04", value: 20000, currentState: true },
        { date: "11/04", value: 15000 },
        { date: "12/04", value: 32000 },
        { date: "13/04", value: 8000 },
        { date: "14/04", value: 22000 },
    ]

    const transactions = [
        {
            id: 1,
            name: "Netflix",
            date: "Apr 05 2023 at 21:46",
            amount: "-$15.49",
            positive: false,
            logo: "https://via.placeholder.com/40",
        },
        {
            id: 2,
            name: "Spotify",
            date: "Mar 14 2023 at 08:10",
            amount: "+$135.49",
            positive: true,
            logo: "https://via.placeholder.com/40",
        },
        {
            id: 3,
            name: "Figma",
            date: "Feb 20 2023 at 19:24",
            amount: "-$75.00",
            positive: false,
            logo: "https://via.placeholder.com/40",
        },
        {
            id: 4,
            name: "Shopify",
            date: "Jan 07 2023 at 06:58",
            amount: "+$934.29",
            positive: true,
            logo: "https://via.placeholder.com/40",
        },
    ];

    return (
        <Layout
            sidebar={{ actual, onChange: (coin: string) => setActual(coin), open: (page: string) => handleOpen(page) }}
            header={{ onSubmit: (type: string, value: string) => handleGetInfo(type, value) }}
        >
            <div className={styles.xrp}>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col col-span-2 gap-4">
                        <div className="grid grid-cols-3 gap-4">
                            <InfoBox
                                title="XRP"
                                value={data.transactionsValue}
                                subtitle="Transactions Value (7 days)"
                                percentageChange={0}
                                className={styles.infoBox}
                            />

                            <InfoBox
                                title="XRP"
                                value={data.transactionsValue}
                                subtitle="Transactions Value (7 days)"
                                percentageChange={0}
                                className={styles.infoBox}
                            />

                            <InfoBox
                                title="XRP"
                                value={data.transactionsValue}
                                subtitle="Transactions Value (7 days)"
                                percentageChange={0}
                                className={styles.infoBox}
                            />

                        </div>

                        <ChartByTime data={chartData} />

                        <Wallet />
                    </div>

                    <div className="flex flex-col gap-4">
                        <InfoList transactions={transactions} />
                        <QuickTransfer />
                    </div>
                </div>

                {
                    modalOpened && <InfoModal data={info} onClose={() => handleClose()} >
                        {
                            info?.type === 'address' ? <AddressInfo title="Address Information" data={info?.['ok']} />
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
        </Layout>
    )
}

export default XRP