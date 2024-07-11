import React, { useEffect, useState } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './time-transactions-chart-styles.module.scss'
import { Skeleton } from '@mui/material'
import { dayInterval } from '../../../../../utils/day-interval'

type Props = {
  data: any
}

const data = [
  {
    name: '9 April',
    transactions: 7630,
    pv: 800,
    amt: 1400,
  },
  {
    name: '8 April',
    transactions: 5780,
    pv: 967,
    amt: 1506,
  },
  {
    name: '7 April',
    transactions: 4300,
    pv: 1098,
    amt: 989,
  },
  {
    name: '6 April',
    transactions: 3951,
    pv: 1200,
    amt: 1228,
  },
  {
    name: '5 April',
    transactions: 4351,
    pv: 1108,
    amt: 1100,
  },
  {
    name: '4 April',
    transactions: 1351,
    pv: 680,
    amt: 1700,
  },
  {
    name: '3 April',
    transactions: 5473,
    pv: 680,
    amt: 1700,
  }
]

const TimeTransactionsChart: React.FC<Props> = ({ data }: Props) => {
  const [opacity, setOpacity] = useState({
    "total": 1,
    // "transactions": 1,
  })
  const [days, setDays] = useState(0)

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o

    setOpacity((op) => ({ ...op, [dataKey]: 0.1 }))
  }

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o


    setOpacity((op) => ({ ...op, [dataKey]: 1 }))
  }

  const getIntroOfPage = (label: string) => {
    if (label === 'Last day') {
      return "about the accumulation of last day's transactions"
    }
    else {
      return `about the accumulation of transactions from ${label}`
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.label}>Transactions: {payload[0].value}</p>
          {/* <p className={styles.label}>{`${label} : ${payload[0].value} transactions`}</p> */}
          {/* <p className={styles.desc}>Last {label} Hashblocks</p> */}
          <p className={styles.intro}>{getIntroOfPage(label)}</p>
        </div>
      )
    }

    return null
  }

  const generateData = () => {
    const max = dayInterval(data[0].timestamp, data[data.length - 1].timestamp)
    const newData: any = Array.from({ length: max > 0 ? max : 1 }, () => new Object({ 'transactions': 0, name: '' }))
    let lastDiff = 0

    data.map((item: any) => {
      let diff = dayInterval(data[0].timestamp, item.timestamp)

      if (diff === lastDiff && (max === 0 || diff < max)) {
        newData[diff]['transactions'] += Number(item["tx_count"])
        if (!newData[diff].name) {
          newData[diff].name = diff === 0 ? 'Last day' : `${diff} ${diff === 1 ? 'day' : 'days'}  before`
        }
      }
      else {
        lastDiff = diff
      }
    })

    return newData
  }

  useEffect(() => {
    setDays(dayInterval(data[0].timestamp, data[data.length - 1].timestamp))
  }, [])

  return (
    <>
      {
        data ? <div className={styles.chart}>
          <h2 className={styles.title}>Last {days > 1 ? `${days} days` : 'day'}</h2>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={generateData()}
              margin={{
                top: 8,
                right: 20,
                left: 8,
                bottom: 8,
              }}
            >
              <CartesianGrid stroke="#56577A" strokeDasharray="0 0" />
              <XAxis dataKey="name" stroke="#A0AEC0" fontSize={14} />
              <YAxis stroke="#A0AEC0" fontSize={14} />
              <Legend margin={{ bottom: 60 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="transactions" barSize={30} fill="#4022BE" />
              <Line fontSize={14} type="monotone" dataKey="transactions" stroke="#ff7300"
                strokeOpacity={opacity.total} activeDot={{ r: 8 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
          : <Skeleton className={styles.chart} variant="rounded" width="100%" height="100%" />
      }
    </>
  )
}

export default TimeTransactionsChart