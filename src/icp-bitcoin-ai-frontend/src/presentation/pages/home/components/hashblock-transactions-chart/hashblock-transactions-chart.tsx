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
import styles from './hashblock-transactions-chart-styles.module.scss'
import { Skeleton } from '@mui/material'
import { valueShort } from '@/src/utils/value-short'

type TooltipTypes = {
  active: boolean
  payload: any
  label: string
}

type Props = {
  data: any
}

const data = [
  {
    name: '1 ~ 10',
    transactions: 28169,
    pv: 800,
    amt: 1400,
  },
  {
    name: '11 ~ 20',
    transactions: 25132,
    pv: 967,
    amt: 1506,
  },
  {
    name: '21 ~ 30',
    transactions: 5161,
    pv: 1098,
    amt: 989,
  },
  {
    name: '31 ~ 40',
    transactions: 8951,
    pv: 1200,
    amt: 1228,
  },
  {
    name: '41 ~ 50',
    transactions: 12351,
    pv: 1108,
    amt: 1100,
  },
  {
    name: '51 ~ 60',
    transactions: 23516,
    pv: 680,
    amt: 1700,
  },
  {
    name: '61 ~ 70',
    transactions: 15123,
    pv: 680,
    amt: 1700,
  },
  {
    name: '71 ~ 80',
    transactions: 12311,
    pv: 680,
    amt: 1700,
  },
  {
    name: '81 ~ 90',
    transactions: 8513,
    pv: 680,
    amt: 1700,
  },
  {
    name: '91 ~ 100',
    transactions: 6123,
    pv: 680,
    amt: 1700,
  },
]

const HashblockTransactionsChart: React.FC<Props> = ({ data }: Props) => {
  const [opacity, setOpacity] = useState({
    "total": 1,
    // "transactions": 1,
  })
  const [chartData, setChartData] = useState()

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o

    setOpacity((op) => ({ ...op, [dataKey]: 0.1 }))
  }

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o

    setOpacity((op) => ({ ...op, [dataKey]: 1 }))
  }

  const getIntroOfPage = (label: string) => {
    if (label === '1 ~ 10') {
      return "about the last 1 to 10 hashblocks"
    }
    else if (label === '11 ~ 20') {
      return "about the last 11 to 20 hashblocks"
    }
    else if (label === '21 ~ 30') {
      return "about the last 21 to 30 hashblocks"
    }
    else if (label === '31 ~ 40') {
      return "about the last 31 to 40 hashblocks"
    }
    else if (label === '41 ~ 50') {
      return "about the last 41 to 50 hashblocks"
    }
    else if (label === '51 ~ 60') {
      return "about the last 51 to 60 hashblocks"
    }
    else if (label === '61 ~ 70') {
      return "about the last 61 to 70 hashblocks"
    }
    else if (label === '71 ~ 80') {
      return "about the last 71 to 80 hashblocks"
    }
    else if (label === '81 ~ 90') {
      return "about the last 81 to 90 hashblocks"
    }
    else if (label === '91 ~ 100') {
      return "about the last 91 to 100 hashblocks"
    }
    return ''
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
    const fakeData = Array(100).fill(data[0])
    const newData: any = []
    let count = 0

    data.map((item: any, index: number) => {
      count += Number(item["tx_count"])

      if ((index + 1) % 10 === 0) {
        newData.push({
          transactions: count,
          name: `${index - 8} ~ ${index + 1}`
        })
        count = 0
      }
    })
    // fakeData.map((item: any, index: number) => {
    //   count += Number(item["tx_count"])

    //   if ((index + 1) % 10 === 0) {
    //     newData.push({
    //       "tx_count": count,
    //       name: `${index - 8} ~ ${index + 1}`
    //     })
    //     count = 0
    //   }
    // })
    return newData
  }

  return (
    <>
      {
        data ? (
          <div className={styles.chart}>
            <h2 className={styles.title}>Last 50 Hashblocks</h2>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={generateData()}
                margin={{
                  top: 8,
                  right: 20,
                  left: 0,
                  bottom: 8,
                }}
              >
                <CartesianGrid stroke="#56577A" strokeDasharray="0 0" />
                <XAxis dataKey="name" stroke="#A0AEC0" fontSize={14} />
                <YAxis
                  stroke="#A0AEC0"
                  fontSize={14}
                  tickFormatter={(value) => valueShort(value)}
                />
                <Legend fontSize={10} className={styles.test} margin={{ bottom: 0 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="transactions" barSize={30} fill="#4022BE" />
                <Line fontSize={14} type="monotone" dataKey="transactions" stroke="#ff7300"
                  strokeOpacity={opacity.total} activeDot={{ r: 8 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )
          : <Skeleton className={styles.chart} variant="rounded" width="100%" height="100%" />
      }
    </>
  )
}

export default HashblockTransactionsChart