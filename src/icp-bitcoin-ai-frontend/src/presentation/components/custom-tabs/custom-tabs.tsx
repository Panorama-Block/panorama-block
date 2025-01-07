import React from 'react'
import styles from './custom-tabs-styles.module.scss'
import { Box, Tab, Tabs } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import HashblockTransactionsChart from '../../pages/home/components/hashblock-transactions-chart/hashblock-transactions-chart'
import TimeTransactionsChart from '../../pages/home/components/time-transactions-chart/time-transactions-chart'

type Props = {
  labels: string[]
  hashblocks: any
}

const CustomTabs: React.FC<Props> = ({ labels, hashblocks }: Props) => {
  const [value, setValue] = React.useState('0')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className={styles.tabs}>
      <TabContext value={value}>
        <Box className={styles.box} sx={{ display: 'flex', height: '60px', padding: '8px', borderBottom: 1, borderColor: 'divider' }}>
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

        <TabPanel className={styles.panel} sx={{ display: value === '0' ? 'flex' : 'none', width: '100%', height: '100%' }} value='0' key={`panel - 0`}>
          <HashblockTransactionsChart data={hashblocks && hashblocks.slice(0, 50)} />
        </TabPanel>
        <TabPanel className={styles.panel} sx={{ display: value === '1' ? 'flex' : 'none', width: '100%', height: '100%' }} value='1' key={`panel - 1`}>
          {/* <TimeTransactionsChart data={hashblocks && hashblocks} /> */}
          <HashblockTransactionsChart data={hashblocks && hashblocks.slice(50, 100)} />
        </TabPanel>
        {/* {
          labels.map((panel: any, index: number) => {
            return <TabPanel className={styles.panel} sx={{ display: index.toString() === value ? 'flex' : 'none', width: '100%', height: '100%' }} value={index.toString()} key={`panel - ${index}`}>
              {panel && <HashblockTransactionsChart />}
            </TabPanel>
          })
        } */}
      </TabContext>
    </div >
  )
}

export default CustomTabs