import React, { useState } from 'react'
import styles from './menu-items-styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Tooltip } from '@mui/material'

type Item = {
  title: string
  icon: string
  url: string
  disabled?: boolean
}

type Props = {
  active?: string
  panelActive?: string
  title?: string
  items: Item[]
  action?: (value: string) => void
}

const MenuItems: React.FC<Props> = ({ active, panelActive, title, items, action }: Props) => {
  const navigate = useNavigate()

  return (
    <div className={styles.menu}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {
        items && items.map((item: Item, index: number) => {
          return (
            <div className={`${styles.item} ${active === item.title && styles.active || item.title === panelActive && styles.active2} ${item.disabled && styles.disabled}`} onClick={(() => { item.title === "Logout" ? navigate("/") : !item.disabled && navigate(item.url) })} key={index}>
              <div className={styles.icon}>
                <img src={item.icon} alt="" />
              </div>
              {item.disabled ? (
                <Tooltip title="Coming Soon" placement="right-start">
                  <p className={title && styles.user}>{item.title}</p>
                </Tooltip>
              )
                : <p className={title && styles.user}>{item.title}</p>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default MenuItems