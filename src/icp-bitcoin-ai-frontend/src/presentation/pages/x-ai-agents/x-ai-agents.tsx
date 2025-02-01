import React, { useState, useEffect } from 'react'
import { Timeline } from 'react-twitter-widgets'
import IcpService from '../../../data/services/icp-service'
import InfoModal from '../../components/info-modal/info-modal'
import OpenChat from '../../components/open-chat/open-chat'
import WhaleHunting from '../../components/whale-hunting/whale-hunting'
import TransactionInfo from '../../components/transaction-info/transaction-info'
import TweetList, { Tweet } from '../../components/tweet-list/tweet-list'
import AddressInfo from '../../components/address-info/address-info'
import NewsletterModal from '../../components/newsletter-modal/newsletter-modal'
import { Tooltip } from '@mui/material'

import styles from './x-ai-agents-styles.module.scss'
import Layout from '../../components/layout/Layout'
import XService from '@/src/data/services/x-service'

const XAiAgents: React.FC = () => {
    const [actual, setActual] = useState('bitcoin')
    const [modalOpened, setModalOpened] = useState(false)
    const [chatOpened, setChatOpened] = useState(false)
    const [whaleOpened, setWhaleOpened] = useState(false)
    const [info, setInfo] = useState<any>()
    const [tweets, setTweets] = useState<Tweet[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [newsletterModalOpen, setNewsletterModalOpen] = useState(false)

    useEffect(() => {
        const getTweets = async () => {
            setIsLoading(true)
            const response = await XService.getTweets(1)
            if(response?.tweets) {
                setTweets(response.tweets)
                setHasMore(currentPage < response.pagination.totalPages)
            }
            setIsLoading(false)
        }

        getTweets()
    }, [])

    const loadMoreTweets = async () => {
        if (isLoading || !hasMore) return

        setIsLoading(true)
        const nextPage = currentPage + 1
        const response = await XService.getTweets(nextPage)
        
        if (response?.tweets) {
            setTweets(prev => [...prev, ...response.tweets])
            setCurrentPage(nextPage)
            setHasMore(nextPage < response.pagination.totalPages)
        }
        setIsLoading(false)
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

    const handleOpen = (page: string) => {
        if (page === 'Whale Hunting') {
            setWhaleOpened(true)
        }
    }

    const handleNewsletterSubmit = async (email: string) => {
        try {
            console.log('Subscribing email:', email)
            await new Promise(resolve => setTimeout(resolve, 1000))
            setNewsletterModalOpen(false)
        } catch (error) {
            console.error('Failed to subscribe:', error)
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
                <div className="flex flex-col w-full h-[calc(80vh)] gap-6">
                    <h1 className="ml-4 text-xl font-bold text-zinc-100">AI Agents</h1>
                    
                    <div className="mx-4 p-3 rounded-lg bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="text-md font-semibold text-blue-100 mb-2">Stay Updated with AI Insights</h2>
                                <p className="text-blue-200/80">Subscribe to our newsletter and receive curated AI analysis summaries directly in your inbox. Be the first to know about market trends and AI predictions.</p>
                            </div>
                            <div className="flex-shrink-0">
                                <button 
                                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                                    onClick={() => setNewsletterModalOpen(true)}
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className="w-full">
                            <div className="w-full">
                                <TweetList tweets={tweets} />
                                {hasMore && (
                                    <div className="flex justify-center my-5">
                                        <button 
                                            onClick={loadMoreTweets}
                                            disabled={isLoading}
                                            className="px-5 py-2.5 bg-[#1DA1F2] text-white font-semibold rounded-full hover:bg-[#1a91da] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Loading...' : 'Load more'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

            {modalOpened && (
                <InfoModal data={info} onClose={() => handleClose()}>
                    {info?.type === 'address' ? (
                        <AddressInfo title="Address Information" data={info?.['ok']} />
                    ) : (
                        <TransactionInfo title="Transaction Information" data={info?.['ok']} />
                    )}
                </InfoModal>
            )}

            {chatOpened ? (
                <OpenChat onClose={() => setChatOpened(false)} />
            ) : (
                <div className={styles.chat} onClick={() => setChatOpened(true)}>
                    <Tooltip title="Community" placement="left">
                        <img src="openchat.svg" alt="" />
                    </Tooltip>
                </div>
            )}

            {whaleOpened && (
                <WhaleHunting
                    onSelect={(id: string) => handleGetInfo('address', id)}
                    onClose={() => setWhaleOpened(false)}
                />
            )}

            <NewsletterModal
                isOpen={newsletterModalOpen}
                onClose={() => setNewsletterModalOpen(false)}
                onSubmit={handleNewsletterSubmit}
            />
        </div>
    )
}

export default XAiAgents