import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import IcpService from '../../../data/services/icp-service'
import Header from '../../components/header/header'
import InfoModal from '../../components/info-modal/info-modal'
import OpenChat from '../../components/open-chat/open-chat'
import TransactionInfo from '../../components/transaction-info/transaction-info'

import AddressInfo from '../../components/address-info/address-info'
import { Box, Tab, Tabs, Tooltip } from '@mui/material'

import styles from './whale-hunting-bitcoin-styles.module.scss'
import { TabContext, TabPanel } from '@mui/lab'
import { customId } from '@/src/utils/custom-id'

const data = [
  {
    address: "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH",
    name: "FBI Bitcoin Address"
  },
  {
    address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
    name: "Binance Bitcoin Address"
  },
  {
    address: "3HcEUguUZ4vyyMAPWDPUDjLqz882jXwMfV",
    name: "Kraken Bitcoin Address"
  },
  {
    address: "3M219KR5vEneNb47ewrPfWyb5jQ2DjxRP6",
    name: "Binance Bitcoin Address"
  },
  {
    address: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97",
    name: "Bitfinex Bitcoin Address"
  },
  {
    address: "bc1qq0l4jgg9rcm3puhhfwaz4c9t8hdee8hfz6738z",
    name: "Germany Bitcoin Address"
  }
]

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth: '50%',
  height: 450,
  maxHeight: 450,
  bgcolor: '#0C1541',
  border: '0',
  borderRadius: '4px',
  boxShadow: 24,
  outline: 'none'
}

const labels = ["General", "Custom"]

const WhaleHuntingBitcoin: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [value, setValue] = useState('0')
  const [whales, setWhales] = useState(data)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
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

  return (
    <div className={styles.home}>
      <Sidebar active="Whale Hunting" actual={actual} onChange={(coin) => setActual(coin)} open={(page: string) => handleOpen(page)} />
      <div className={styles.container}>
        <Header onSubmit={handleGetInfo} />
        <div className="flex flex-col ml-12 mr-12 text-white">
          <div className="flex gap-3 ">
            <h1 className='text-xl ml-8 font-bold'>Whale Hunting</h1>
          </div>

          <div className={`${styles.card} m-4`}>
            <TabContext value={value}>
              <Box sx={{ display: 'flex', height: '60px', padding: '8px', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  sx={{ marginBottom: '4px' }}
                  value={value}
                  onChange={handleChange}
                  aria-label="chart tabs"
                >
                  {labels.map((label: string, index: number) => {
                    return <Tab autoCapitalize='false' className={styles.tab} label={label} value={index.toString()} key={`tab - ${index}`} />
                  })}
                </Tabs>
              </Box>

              <TabPanel className={`${styles.panel} flex gap-8 min-h-[600px]`} sx={{ display: value === '0' ? 'flex' : 'none' }} value='0' key={`panel - 0`}>
                {
                  whales && whales.map(((item, index) => {
                    return (
                      <div className={styles.row} key={`whale-${index}`}>
                        <div className={styles.item}>
                          <span className={styles.label}>ID</span>
                          <Tooltip title={item.address} placement="top">
                            <div className={`${styles.value}`} onClick={() => handleGetInfo('address', item.address)}>
                              <p>{item.address}</p>
                            </div>
                          </Tooltip>
                        </div>

                        <div className={styles.item}>
                          <span className={styles.label}>NAME</span>
                          <div className={styles.value}>
                            <p>{item.name}</p>
                          </div>
                        </div>
                      </div>
                    )
                  }))
                }
              </TabPanel>

              <TabPanel className={`${styles.panel} flex gap-8 min-h-[620px]`} sx={{ display: value === '1' ? 'flex' : 'none' }} value='1' key={`panel - 1`}>
                <div className={styles.row}>
                  To be added soon
                </div>
              </TabPanel>
            </TabContext>

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
    </div >
  )
}

export default WhaleHuntingBitcoin