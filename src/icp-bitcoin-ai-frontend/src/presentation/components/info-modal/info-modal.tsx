import React, { ReactElement, useEffect } from 'react'
import styles from './info-modal-styles.module.scss'
import Backdrop from '@mui/material/Backdrop'
import { Box, CircularProgress, Modal, Skeleton } from '@mui/material'

type Props = {
  data: any
  onClose: () => void
  children: ReactElement
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: '#0C1541',
  border: '0',
  borderRadius: '4px',
  boxShadow: 24,
  py: '1rem'
}


const InfoModal: React.FC<Props> = ({ data, onClose, children }: Props) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}>
      <Box className={styles.container} sx={style}>
        {
          data ? <div className={styles.container}>
            {
              (!data?.['ok'] || data?.['ok'][0] === 'Invalid hex string' || data?.['err']) ? <h3 className={styles.error}>Failed to get the information</h3>
                : children
            }
          </div>
            : <div className={styles.loadingWrap}>
              <CircularProgress className={styles.loading} color="inherit" size={60} />
              <div className={styles.loadingText}>
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
              </div>
            </div>
        }
      </Box>
    </Modal >
  )
}

export default InfoModal