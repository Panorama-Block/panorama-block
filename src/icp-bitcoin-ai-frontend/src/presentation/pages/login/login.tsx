import React from 'react'
import styles from './login-styles.module.scss'
import Button from '../../components/button/button'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.login}>
      <div className={styles.main}>
        <img src="/background.png" alt="" />
      </div>
      <div className={styles.start}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h2>Nice to see you!</h2>
            <p>Enter you wallet to start</p>
          </div>
          <Button title="CONNECT WALLET" type="wallet" onClick={() => { navigate('/home') }} />
        </div>
      </div>
    </div>
  )
}

export default Login
