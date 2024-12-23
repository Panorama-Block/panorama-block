import React, { ReactElement } from 'react'
import styles from './network-styles.module.scss'

export type NetworkData = {
  description: string
  transactions: string
  avgTransactions?: string
  transactionsValue: string
  address: string
  token: string,
  links: Link[],
  close: number,
  open: number
}

type Link = {
  icon: ReactElement,
  url: string
}

type Props = {
  data: NetworkData
}

const Network: React.FC<Props> = ({ data }: Props) => {
  return (
    <div className={styles.network}>
      <div className={styles.column}>
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
          <div className={styles.row}>
            <p className={styles.label}>Links:</p>
            <div className={styles.items}>
              {
                data.links.map((item: any, index: number) => {
                  return (
                    <a className={styles.item} href={item.url} target='__blank' key={`footer-item-${index}`}>
                      {item.icon}
                    </a>
                  )
                })
              }
            </div>

          </div>
        </div>
      </div>

      {/* <div className={`${styles.column} ${styles.market}`}>
        <div className={styles.row}>
          <div>
            <h3 className={styles.label}>
              Prev close
            </h3>
            <p>{data.close}</p>
          </div>

          <div>
            <h3 className={styles.label}>
              Open
            </h3>
            <p>{data.open}</p>
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <h3 className={styles.label}>
              Time
            </h3>
            <p>{(new Date()).toLocaleString('en-US', { minute: 'numeric', hour: 'numeric', hour12: true })}</p>
          </div>

          <div>
            <h3 className={styles.label}>
              Date
            </h3>
            <p>{new Date().toLocaleDateString('en-US')}</p>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Network