import React from 'react'
import styles from './network-styles.module.scss'

export type NetworkData = {
  description: string
  transactions: string
  avgTransactions?: string
  transactionsValue: string
  address: string
  token: string
}

type Props = {
  data: NetworkData
}

const Network: React.FC<Props> = ({ data }: Props) => {
  return (
    <div className={styles.network}>
      <h2 className={styles.title}>Network Information</h2>
      <p className={styles.description}>
        {data.description}
      </p>
      <div className={styles.divider}></div>
      <div className={styles.info}>
        <div className={styles.row}>
          <p className={styles.label}>Active Address (7 days): </p>
          <p className={styles.value}>{data.address}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Transactions (7 days):</p>
          <p className={styles.value}>{data.transactions}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Transactions Value (Avg per day):</p>
          <p className={styles.value}>{data.avgTransactions}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Transactions Value (7 days):</p>
          <p className={styles.value}>{data.transactionsValue}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Token:</p>
          <p className={styles.value}>{data.token}</p>
        </div>
      </div>
    </div>
  )
}

export default Network