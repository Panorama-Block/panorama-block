import React, { FormEvent, useEffect, useState } from 'react'
import styles from './header-styles.module.scss'
import { Button, TextField } from '@mui/material'
import SelectNetwork from '../select-network/select-network'
import { useLocation } from 'react-router-dom'

type Props = {
  onSubmit: (type: string, value: string) => void
}

const Header: React.FC<Props> = ({ onSubmit }: Props) => {
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState(location.pathname)
  const [values, setValues] = useState({
    address: '',
    addressError: '',
    transaction: '',
    transactionError: ''
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>, type: 'address' | 'transaction') => {
    e.preventDefault()
    onSubmit(type, values[type])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target
    if (value) {
      setValues({ ...values, [id]: value })
    }
    else {
      setValues({ ...values, [`${id}Error`]: 'error' })
    }
  }

  return (
    <div className={styles.header}>
      {
        currentPath.includes("pano-view") && (
          <>
            <form id='form-address' onSubmit={(e) => handleSubmit(e, 'address')}>
              <TextField
                required
                className={styles.textField}
                id="address"
                variant="outlined"
                placeholder="Address"
                size="small"
                onChange={handleChange}
              />
              <Button className={styles.button} type='submit'>Get address info</Button>
            </form>

            <form id='form-transaction' onSubmit={(e) => handleSubmit(e, 'transaction')}>
              <TextField
                required
                className={styles.textField}
                id="transaction"
                variant="outlined"
                placeholder="Transaction"
                size="small"
                onChange={handleChange}
              />
              <Button className={styles.button} type='submit'>Get transaction info</Button>
            </form>
          </>
        )
      }

      <div className="ml-auto">
        <SelectNetwork />
      </div>
    </div>
  )
}

export default Header