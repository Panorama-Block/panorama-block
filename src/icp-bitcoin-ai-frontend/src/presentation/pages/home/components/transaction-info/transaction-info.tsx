import React, { useEffect, useState } from 'react'
import styles from './transaction-info-styles.module.scss'

type Props = {
  data: any
  title: string
}

const TransactionInfo: React.FC<Props> = ({ title, data }: Props) => {
  const [info, setInfo] = useState<any>()
  useEffect(() => {
    if (JSON.stringify(data).includes("txid")) {
      setInfo(JSON.parse(data?.['ok'][0]))
    }
  }, [])

  return (
    info && info.txid && <div className={styles.transactionInfo}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.divider}></div>

      <p><b>Transaction id:</b> {info.txid}</p>
      <p><b>Size:</b> {info.size}</p>
      <p><b>Value:</b> {(info.vout[0].value / 100000000)} BTC</p>
      <p><b>Fee:</b> {info.fee} SATS</p>
    </div>
  )
}

export default TransactionInfo