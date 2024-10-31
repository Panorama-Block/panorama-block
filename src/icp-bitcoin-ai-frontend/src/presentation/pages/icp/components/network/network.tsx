import React from 'react'
import styles from './network-styles.module.scss'

export type NetworkData = {
  description: string
  transactions: string
  avgTransactions?: string
  transactionsValue?: string
  burned: string
  fee: string
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
          <p className={styles.label}>Active Users (Last day): </p>
          <p className={styles.value}>{data.address}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Transactions:</p>
          <p className={styles.value}>{data.transactions}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Burned Fees:</p>
          <p className={styles.value}>{data.fee}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Burned Total:</p>
          <p className={styles.value}>{data.burned}</p>
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