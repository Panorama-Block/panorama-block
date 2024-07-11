import React from 'react'
import styles from './button-styles.module.scss'

type Props = {
  title: string
  type: 'wallet' | "primary" | "secundary"
  onClick: () => void
}

const Button: React.FC<Props> = ({ title, type, onClick }: Props) => {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles[type]}`} onClick={() => onClick()}>{title}</button>
    </div>
  )
}

export default Button