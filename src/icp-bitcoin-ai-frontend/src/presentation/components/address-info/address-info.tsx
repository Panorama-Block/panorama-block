import React, { useEffect } from 'react'
import styles from './address-info-styles.module.scss'

type Props = {
  data: any
  title: string
}

const AddressInfo: React.FC<Props> = ({ title, data }: Props) => {

  return (
    <div className={styles.addressInfo}>
      {
        data && <>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.divider}></div>

          <p><b>Address:</b> {data.address}</p>
          <p><b>Funded txo count:</b> {data.chain_stats.funded_txo_count.toString()}</p>
          <p><b>Funded txo sum:</b>  {Number(data.chain_stats.funded_txo_sum) / 100000000} BTC</p>
          <p><b>Spent txo count:</b>  {data.chain_stats.spent_txo_count.toString()}</p>
          <p><b>Spent txo sum:</b>  {Number(data.chain_stats.spent_txo_sum) / 100000000} BTC</p>
          <p><b>Txs count:</b> {data.chain_stats.tx_count.toString()}</p></>
      }
    </div>
  )
}

export default AddressInfo