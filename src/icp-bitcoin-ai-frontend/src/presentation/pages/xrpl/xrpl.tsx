import React, { useEffect, useState } from 'react'
import styles from './xrpl-styles.module.scss'
import Hashblocks, { HashblockProps } from '../../components/hashblocks/hashblocks'
import Network, { NetworkData } from '../../components/network/network'
import IcpService from '../../../data/services/icp-service'
import { jsonParseBigint } from '../../../utils/json-parse-bigint'
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
import xrplService from '../../../data/services/xrpl-service'

const XRPL: React.FC = () => {
    const [actual, setActual] = useState('Xrpl')
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
    const [networkStats, setNetworkStats] = useState({
        totalTransactions: "1,234,567",
        avgTransactionValue: "2,500",
        activeAccounts: "156,789",
        transactionGrowth: 12.5,
        valueGrowth: 8.3,
        accountsGrowth: 5.2
    })

    const [ledgers, setLedgers] = useState<any[]>([])
    const [ledgerData, setLedgerData] = useState<any[]>([])
    const [ledgerMetrics, setLedgerMetrics] = useState<any[]>([])
    const [transactionMetrics, setTransactionMetrics] = useState<any[]>([])
    const [ledgerCloseMetrics, setLedgerCloseMetrics] = useState<any[]>([])
    const [circulationMetrics, setCirculationMetrics] = useState<any[]>([])
    const [objectTypeMetrics, setObjectTypeMetrics] = useState<any[]>([])
    const [ledgerSizeMetrics, setLedgerSizeMetrics] = useState<any[]>([])
    const [feeMetrics, setFeeMetrics] = useState<any[]>([])
    const [stateDurationMetrics, setStateDurationMetrics] = useState<any[]>([])
    const [txHistory, setTxHistory] = useState<any[]>([])
    const [nftOffers, setNftOffers] = useState<any[]>([])
    const [nftSellOffers, setNftSellOffers] = useState<any[]>([])

    useEffect(() => {
        const offers = xrplService.getNFTBuyOffers()
        setNftOffers(offers)
    }, [])


    useEffect(() => {
        const offers = xrplService.getNFTSellOffers()
        setNftSellOffers(offers)
    }, [])

    useEffect(() => {
        const history = xrplService.getTransactionHistory()
        const formattedHistory = history.map((tx: any) => ({
            id: tx.hash,
            name: `${tx.type}`,
            date: new Date(tx.date).toLocaleString(),
            amount: `${tx.amount} XRP`,
            description: tx.description || 'Transaction'
        }))
        setTxHistory(formattedHistory)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getLedgerMetrics()
        setLedgerMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getTransactionMetrics()
        setTransactionMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getLedgerCloseMetrics()
        setLedgerCloseMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getCirculationMetrics()
        setCirculationMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getStateDurationMetrics()
        setStateDurationMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getObjectTypeDistribution()
        setObjectTypeMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getLedgerSizeMetrics()
        setLedgerSizeMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getFeeMetrics()
        setFeeMetrics(metrics)
    }, [])

    useEffect(() => {
        const metrics = xrplService.getStateDurationMetrics()
        setStateDurationMetrics(metrics)
    }, [])

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

    const hashblocksData = [
        { date: "00:00", value: 15000, transactions: 1200 },
        { date: "03:00", value: 12000, transactions: 980 },
        { date: "06:00", value: 8000, transactions: 750 },
        { date: "09:00", value: 25000, transactions: 2100 },
        { date: "12:00", value: 30000, transactions: 2800 },
        { date: "15:00", value: 28000, transactions: 2600 },
        { date: "18:00", value: 22000, transactions: 1900 },
        { date: "21:00", value: 18000, transactions: 1500 },
    ]

    const liquidityData = [
        { date: "00:00", value: 2500000, transactions: 850000 },
        { date: "03:00", value: 1800000, transactions: 920000 },
        { date: "06:00", value: 3200000, transactions: 780000 },
        { date: "09:00", value: 4500000, transactions: 1200000 },
        { date: "12:00", value: 2900000, transactions: 950000 },
        { date: "15:00", value: 5200000, transactions: 1500000 },
        { date: "18:00", value: 3800000, transactions: 1100000 },
        { date: "21:00", value: 2200000, transactions: 830000 },
    ]

    const walletActivityData = [
        { date: "00:00", value: 1200, transactions: 450 },
        { date: "03:00", value: 1350, transactions: 520 },
        { date: "06:00", value: 1500, transactions: 580 },
        { date: "09:00", value: 1800, transactions: 750 },
        { date: "12:00", value: 2100, transactions: 920 },
        { date: "15:00", value: 2400, transactions: 1100 },
        { date: "18:00", value: 2200, transactions: 980 },
        { date: "21:00", value: 1900, transactions: 850 },
    ];

    const whalePriceData = [
        { date: "00:00", value: 125000, transactions: 0.62 },
        { date: "03:00", value: 245000, transactions: 0.65 },
        { date: "06:00", value: 890000, transactions: 0.71 },
        { date: "09:00", value: 560000, transactions: 0.68 },
        { date: "12:00", value: 1250000, transactions: 0.75 },
        { date: "15:00", value: 980000, transactions: 0.73 },
        { date: "18:00", value: 450000, transactions: 0.69 },
        { date: "21:00", value: 670000, transactions: 0.70 },
    ];

    const stakingSupplyData = [
        { date: "00:00", value: 45000000, transactions: 100000000 },
        { date: "03:00", value: 46500000, transactions: 99800000 },
        { date: "06:00", value: 48000000, transactions: 99500000 },
        { date: "09:00", value: 47800000, transactions: 99200000 },
        { date: "12:00", value: 49500000, transactions: 98900000 },
        { date: "15:00", value: 51000000, transactions: 98600000 },
        { date: "18:00", value: 52500000, transactions: 98300000 },
        { date: "21:00", value: 53000000, transactions: 98000000 },
    ];

    const networkPerformanceData = [
        { date: "00:00", value: 3.5, transactions: 850 },
        { date: "03:00", value: 3.2, transactions: 1200 },
        { date: "06:00", value: 4.1, transactions: 2100 },
        { date: "09:00", value: 4.8, transactions: 2800 },
        { date: "12:00", value: 5.2, transactions: 3200 },
        { date: "15:00", value: 4.5, transactions: 2600 },
        { date: "18:00", value: 3.8, transactions: 1900 },
        { date: "21:00", value: 3.4, transactions: 1500 },
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
                                title="24h Transactions"
                                value={networkStats.totalTransactions}
                                subtitle="Total transactions in last 24 hours"
                                percentageChange={networkStats.transactionGrowth}
                                className="bg-[#0B1437] border-[#1a2555]"
                            />

                            <InfoBox
                                title="Average TX Value"
                                value={`${networkStats.avgTransactionValue} XRP`}
                                subtitle="Average transaction value in XRP"
                                percentageChange={networkStats.valueGrowth}
                                className="bg-[#0B1437] border-[#1a2555]"
                            />

                            <InfoBox
                                title="Active Accounts"
                                value={networkStats.activeAccounts}
                                subtitle="Active accounts in last 24 hours"
                                percentageChange={networkStats.accountsGrowth}
                                className="bg-[#0B1437] border-[#1a2555]"
                            />

                        </div>


                        <ChartByTime
                            data={ledgerMetrics}
                            className={styles.chartByTime}
                            title="Ledger Index & Hash"
                            description="Track ledger sequence numbers and hash values over time"
                            valueLabel="Ledger Index"
                            transactionsLabel="Hash Value"
                            valueColor="#6366F1"
                            transactionsColor="#8B5CF6"
                            valueFormatter={(value) => `#${value.toLocaleString()}`}
                            transactionsFormatter={(value) => `0x${value.toString(16)}`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                            ]}
                            defaultPeriod="1H"
                        />

                        <ChartByTime
                            data={transactionMetrics}
                            className={styles.chartByTime}
                            title="Transaction Activity"
                            description="Number of transactions and volume per ledger"
                            valueLabel="Transaction Count"
                            transactionsLabel="Volume (XRP)"
                            valueColor="#10B981"
                            transactionsColor="#6366F1"
                            valueFormatter={(value) => `${value} txs`}
                            transactionsFormatter={(value) => `${(value / 1000).toFixed(1)}k XRP`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={ledgerCloseMetrics}
                            className={styles.chartByTime}
                            title="Ledger Close Time & Consensus"
                            description="Track ledger closing speed and validator participation"
                            valueLabel="Close Time"
                            transactionsLabel="Validators"
                            valueColor="#14B8A6"
                            transactionsColor="#F97316"
                            valueFormatter={(value) => `${value.toFixed(2)}s`}
                            transactionsFormatter={(value) => `${value} nodes`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                            ]}
                            defaultPeriod="1H"
                        />

                        <ChartByTime
                            data={circulationMetrics}
                            className={styles.chartByTime}
                            title="XRP Supply Distribution"
                            description="Track total and locked XRP supply over time"
                            valueLabel="Total Supply"
                            transactionsLabel="Locked Supply"
                            valueColor="#3B82F6"
                            transactionsColor="#EF4444"
                            valueFormatter={(value) => `${(value / 1000000).toFixed(2)}M XRP`}
                            transactionsFormatter={(value) => `${(value / 1000000).toFixed(2)}M XRP`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={stateDurationMetrics}
                            className={styles.chartByTime}
                            title="Server State Performance"
                            description="Track server state durations and transition frequency"
                            valueLabel="Full State Time"
                            transactionsLabel="State Transitions"
                            valueColor="#10B981"
                            transactionsColor="#F97316"
                            valueFormatter={(value) => `${value.toFixed(1)}%`}
                            transactionsFormatter={(value) => `${value} changes`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={objectTypeMetrics}
                            className={styles.chartByTime}
                            title="Ledger Object Distribution"
                            description="Distribution of different object types in the XRP Ledger"
                            valueLabel="Total Objects"
                            transactionsLabel="Active Objects"
                            valueColor="#8B5CF6"
                            transactionsColor="#EC4899"
                            valueFormatter={(value) => `${(value / 1000).toFixed(1)}K objects`}
                            transactionsFormatter={(value) => `${(value / 1000).toFixed(1)}K active`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={ledgerSizeMetrics}
                            className={styles.chartByTime}
                            title="Ledger Size Growth"
                            description="Track the total size of the XRP Ledger and transaction volume"
                            valueLabel="Ledger Size"
                            transactionsLabel="Transactions"
                            valueColor="#3B82F6"
                            transactionsColor="#10B981"
                            valueFormatter={(value) => `${(value / 1024).toFixed(2)} GB`}
                            transactionsFormatter={(value) => `${(value / 1000).toFixed(1)}K txs`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                                { value: "30D", label: "30D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={feeMetrics}
                            className={styles.chartByTime}
                            title="Network Fee Dynamics"
                            description="Track transaction costs and network load factors"
                            valueLabel="Transaction Fee"
                            transactionsLabel="Queue State"
                            valueColor="#F59E0B"
                            transactionsColor="#6366F1"
                            valueFormatter={(value) => `${value} drops`}
                            transactionsFormatter={(value) => `${(value / 256).toFixed(2)}x base`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="1H"
                        />

                        <ChartByTime
                            data={stateDurationMetrics}
                            className={styles.chartByTime}
                            title="Server State Performance"
                            description="Track server state durations and transition frequency"
                            valueLabel="Full State Time"
                            transactionsLabel="State Transitions"
                            valueColor="#10B981"
                            transactionsColor="#F97316"
                            valueFormatter={(value) => `${value.toFixed(1)}%`}
                            transactionsFormatter={(value) => `${value} changes`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={hashblocksData}
                            className={styles.chartByTime}
                            title="Hashblocks"
                            description="Block transactions by time"
                            valueLabel="Block Size"
                            transactionsLabel="Transactions"
                            valueColor="#3B82F6"
                            transactionsColor="#1D4ED8"
                            valueFormatter={(value) => `${value} KB`}
                            transactionsFormatter={(value) => `${value} txs`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="1H"
                        />

                        <ChartByTime
                            data={liquidityData}
                            className={styles.chartByTime}
                            title="Whale Activity vs Network Liquidity"
                            description="Large transfers in relation to network liquidity"
                            valueLabel="Whale Transfers"
                            transactionsLabel="Network Liquidity"
                            valueColor="#3B82F6"
                            transactionsColor="#10B981"
                            valueFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                            transactionsFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={walletActivityData}
                            className={styles.chartByTime}
                            title="Recurring Activity vs. Wallet Growth"
                            description="Track consistent wallet activity and network growth patterns"
                            valueLabel="Active Wallets"
                            transactionsLabel="Recurring Transactions"
                            valueColor="#8B5CF6"
                            transactionsColor="#EC4899"
                            valueFormatter={(value) => `${value.toLocaleString()} wallets`}
                            transactionsFormatter={(value) => `${value.toLocaleString()} txs`}
                            periods={[
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={whalePriceData}
                            className={styles.chartByTime}
                            title="Whale Activity vs. XRP Price"
                            description="Track whale wallet transactions in relation to price movements"
                            valueLabel="Whale Transfers"
                            transactionsLabel="XRP Price"
                            valueColor="#F59E0B"
                            transactionsColor="#10B981"
                            valueFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                            transactionsFormatter={(value) => `$${value.toFixed(3)}`}
                            periods={[
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                                { value: "30D", label: "30D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={stakingSupplyData}
                            className={styles.chartByTime}
                            title="Staking vs. Available Supply"
                            description="Track XRP staking in relation to circulating supply"
                            valueLabel="Total Staked"
                            transactionsLabel="Available Supply"
                            valueColor="#6366F1"
                            transactionsColor="#EF4444"
                            valueFormatter={(value) => `${(value / 1000000).toFixed(1)}M XRP`}
                            transactionsFormatter={(value) => `${(value / 1000000).toFixed(1)}M XRP`}
                            periods={[
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                                { value: "30D", label: "30D" },
                            ]}
                            defaultPeriod="24H"
                        />

                        <ChartByTime
                            data={networkPerformanceData}
                            className={styles.chartByTime}
                            title="Ledger Performance vs. Network Load"
                            description="Monitor ledger speeds and network congestion"
                            valueLabel="Ledger Speed"
                            transactionsLabel="Network Traffic"
                            valueColor="#14B8A6"
                            transactionsColor="#F97316"
                            valueFormatter={(value) => `${value.toFixed(1)}s`}
                            transactionsFormatter={(value) => `${value.toLocaleString()} tps`}
                            periods={[
                                { value: "1H", label: "1H" },
                                { value: "24H", label: "24H" },
                                { value: "7D", label: "7D" },
                            ]}
                            defaultPeriod="1H"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <InfoList
                            className={styles.infoList}
                            title="Transactions"
                            transactions={txHistory}
                            showLogo={false}
                        />
                        <InfoList
                            className={styles.infoList}
                            title="NFT Buy Offers"
                            transactions={nftOffers}
                            showLogo={false}
                        />
                        <InfoList
                            className={styles.infoList}
                            title="NFT Sell Offers"
                            transactions={nftSellOffers}
                            showLogo={false}
                        />
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

export default XRPL