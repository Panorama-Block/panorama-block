import React, { useState } from 'react'
import { Timeline } from 'react-twitter-widgets'
import IcpService from '../../../data/services/icp-service'
import InfoModal from '../../components/info-modal/info-modal'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from '../../components/whale-hunting/whale-hunting'
import TransactionInfo from '../../components/transaction-info/transaction-info'

import AddressInfo from '../../components/address-info/address-info'
import { Tooltip } from '@mui/material'

import styles from './x-ai-agents-styles.module.scss'
import Layout from '../../components/layout/Layout'

const XAiAgents: React.FC = () => {
    const [actual, setActual] = useState('bitcoin')
    const [modalOpened, setModalOpened] = useState(false)
    const [chatOpened, setChatOpened] = useState(false)
    const [whaleOpened, setWhaleOpened] = useState(false)
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

    const handleOpen = (page: string) => {
        if (page === 'Whale Hunting') {
            setWhaleOpened(true)
        }
    }

    return (
        <div className={styles.xAiAgents}>
            <Layout
                sidebar={{
                    actual: actual,
                    onChange: (coin: string) => setActual(coin),
                    open: (page: string) => handleOpen(page)
                }}
                header={{
                    onSubmit: handleGetInfo
                }}
            >
                <div className="flex flex-col w-full h-[calc(70vh)] gap-8">
                    <h1 className="ml-4 text-2xl font-bold text-zinc-100">AI Agents</h1>
                        {/* <Timeline
                            dataSource={{
                                sourceType: "list",
                                ownerScreenName: "twitter",
                                id: "1878841204239904785"
                            }}
                        /> */}
                        <iframe src='https://widgets.sociablekit.com/twitter-list/iframe/25510380' frameBorder='0' width='100%' height='100%'></iframe>
                </div>
            </Layout>

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

export default XAiAgents