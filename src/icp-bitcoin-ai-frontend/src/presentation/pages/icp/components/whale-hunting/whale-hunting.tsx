import React, { useEffect, useState } from 'react'
import styles from './whale-hunting-styles.module.scss'
import { Backdrop, Box, Modal, Tab, Tabs, Tooltip } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import { customId } from '../../../../../utils/custom-id'
import IcpService from '../../../../../data/services/icp-service'

type Props = {
  onSelect: (id: string) => void
  onClose: () => void
}

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

const labels = ["General", "Custom"]

const WhaleHunting: React.FC<Props> = ({ onSelect, onClose }: Props) => {
  const [value, setValue] = useState('0')
  const [whales, setWhales] = useState(data)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const getWhales = async (): Promise<void> => {
      const response: any = await IcpService.getWhales()

      if (response) {
        setWhales(response)
      }
    }

    getWhales()
  }, [])

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}>
      <Box className={styles.container} sx={style}>
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

          <TabPanel className={styles.panel} sx={{ display: value === '0' ? 'flex' : 'none' }} value='0' key={`panel - 0`}>
            {
              whales && whales.map(((item, index) => {
                return (
                  <div className={styles.row} key={`whale-${index}`}>
                    <div className={styles.item}>
                      <span className={styles.label}>ID</span>
                      <Tooltip title={item.address} placement="top">
                        <div className={`${styles.value} ${styles.id}`} onClick={() => onSelect(item.address)}>
                          <p>{customId(item.address)}</p>
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

          <TabPanel className={styles.panel} sx={{ display: value === '1' ? 'flex' : 'none' }} value='1' key={`panel - 1`}>
            <div className={styles.row}>
              To be added soon
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Modal>
  )
}

export default WhaleHunting