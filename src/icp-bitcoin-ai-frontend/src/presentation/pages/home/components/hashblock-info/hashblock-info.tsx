import React from 'react'
import styles from './hashblock-info-styles.module.scss'
import { Backdrop, Box, CircularProgress, Modal, Tab, Tabs, Tooltip } from '@mui/material'
import { HashblockProps } from '../../../../components/hashblocks/hashblocks'
import CustomTabs from '../../../../components/custom-tabs/custom-tabs'
import { TabContext, TabPanel } from '@mui/lab'
import { customId } from '../../../../../utils/custom-id'

type Props = {
  data: HashblockProps
  onClose: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth: '50%',
  minHeight: 450,
  bgcolor: '#0C1541',
  border: '0',
  borderRadius: '4px',
  boxShadow: 24,
  outline: 'none'
}

const labels = ["Info", "Address"]

const HashblockInfo: React.FC<Props> = ({ data, onClose }: Props) => {
  const [value, setValue] = React.useState('0')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Modal
      className={styles.modal}
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
            <div className={styles.row}>
              <div className={styles.item}>
                <span className={styles.label}>ID</span>
                <Tooltip title={data.id} placement="top">
                  <div className={styles.value}>
                    <p>{customId(data.id)}</p>
                  </div>
                </Tooltip>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>SIZE</span>
                <div className={styles.value}>
                  <p>{(Number(data.size) / 10000).toFixed(0)} KB</p>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.item}>
                <span className={styles.label}>TRANSACTIONS</span>
                <div className={styles.value}>
                  <p>{data.tx_count} TXS</p>
                </div>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Weight</span>
                <div className={styles.value}>
                  <p>{(Number(data.height) / 1000).toFixed(0)} WU</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel className={styles.panel} sx={{ display: value === '1' ? 'flex' : 'none' }} value='1' key={`panel - 1`}>
            <div className={styles.row}>
              {/* <div className={styles.transaction}>
                <p>id</p>
              </div> */}
              To be added soon
            </div>
          </TabPanel>
        </TabContext>


      </Box>
    </Modal>
  )
}

export default HashblockInfo