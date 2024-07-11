import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './hashblocks-styles.module.scss'
import { Skeleton, Tooltip } from '@mui/material'

type Props = {
  coin: string
  data: any
  onSelect: (hashblock: any) => void
}

export type HashblockProps = {
  id: string
  size: string
  height: string
  weight: string
  tx_count: string
  timestamp: string
}

const Hashblocks: React.FC<Props> = ({ coin, data, onSelect }: Props) => {
  const hashblocksRef = useRef<any>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: any) => {
    setIsMouseDown(true)
    setStartX(e.pageX - hashblocksRef.current.offsetLeft)
    setScrollLeft(hashblocksRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)

  }

  const handleMouseMove = (e: any) => {
    if (!isMouseDown) return
    e.preventDefault()
    const x = e.pageX - hashblocksRef.current.offsetLeft
    const walk = (x - startX) * 2
    hashblocksRef.current.scrollLeft = scrollLeft - walk
  }

  const getCoin = (): ReactElement => {
    switch (coin) {
      case 'Bitcoin':
        return <img src="/coins/bitcoin.png" alt="" />
      case 'Etherum':
        return <img src="/coins/eth.png" alt="" />
      case 'Solana':
        return <img src="/coins/solana.png" alt="" />
      case 'ICP':
        return <img src="/coins/icp.png" alt="" />
      default:
        return <img src="/coins/icp.png" alt="" />
    }
  }

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)

    return `${minDigit(date.getMonth() + 1)}/${minDigit(date.getDate())}/${date.getFullYear()} - ${minDigit(date.getHours())}:${minDigit(date.getMinutes())}:${minDigit(date.getSeconds())}`
  }

  const minDigit = (value: number) => {
    return ('0' + value).slice(-2)
  }

  return (
    <div className={styles.container}>
      <h2>HASHBLOCKS</h2>
      <div
        className={styles.hashblocks}
        ref={hashblocksRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {
          data ? data.slice(0, 50).map((item: HashblockProps, index: number) => {
            return (
              <React.Fragment key={`hashblock-${index}`}>
                {index > 0 && (
                  <div
                    className={styles.divider}
                    key={`divider-${index}`}
                  ></div>
                )}
                <div className={styles.card} onClick={() => onSelect(item)}>
                  <div className={styles.info}>
                    <Tooltip title={item.id} placement="right-start">
                      <p className={styles.id}>{item.id}</p>
                    </Tooltip>
                    <div className={styles.value}>
                      <Tooltip title="Transactions" placement="right-start">
                        <p>{item.tx_count} txs</p>
                      </Tooltip>
                    </div>
                    <div className={styles.graph}>
                      {/* <img src="/graph.png" alt="" /> */}
                      <div className={styles.size}>
                        <Tooltip title="Size" placement="right-start">
                          <p>S: {(Number(item.size) / 10000).toFixed(0)} KB</p>
                        </Tooltip>
                        <Tooltip title="Weight" placement="right-start">
                          <p>W: {(Number(item.height) / 1000).toFixed(0)} WU</p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  <p className={styles.title}>Details</p>

                  <div className={styles.details}>
                    <div className={styles.coin}>{getCoin()}</div>
                    <div className={styles.date}>
                      <h3>{coin}</h3>
                      <p>{getDate(parseInt(item.timestamp))}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
            : Array(100).fill(0).map((item, index) => {
              return <React.Fragment key={`hashblock-${index}`}>
                {index > 0 && < div className={styles.divider}></div >}
                <Skeleton className={styles.card} variant="rounded" width={200} height={200} />
              </React.Fragment>
            })
        }
      </div>
    </div >
  )
}

export default Hashblocks