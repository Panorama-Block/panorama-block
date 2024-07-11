import React from 'react'
import styles from './landing-footer-styles.module.scss'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X'
import TelegramIcon from '@mui/icons-material/Telegram'
import Button from '../../../../components/button/button'

const items = [
  {
    icon: <LinkedInIcon />,
    url: 'https://www.linkedin.com/company/panoramablock/'
  },
  {
    icon: <GitHubIcon />,
    url: 'https://github.com/PanoramaBlock'
  },
  {
    icon: <XIcon />,
    url: 'https://x.com/panoramablock'
  },
  {
    icon: <TelegramIcon />,
    url: 'https://t.me/panoramablock'
  },
  {
    icon: <img src="discord.webp" alt="" />,
    url: 'https://discord.com/invite/V3UyvcTUpS'
  }
]

type Props = {
  connect: () => void
}

const LandingFooter: React.FC<Props> = ({ connect }: Props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.column}>
          <img className={styles.logo} src="/Logo.png" alt="" />
          <h3 className={styles.title}>Resources</h3>
          <div className={styles.content}>
            <a href="https://docs.panoramablock.com/" target='__blank'>Docs</a>
            <a href="https://github.com/PanoramaBlock" target='__blank'>Github</a>
            <a href="https://www.linkedin.com/company/panoramablock/" target='__blank'>LinkedIn</a>
            <a href="https://x.com/panoramablock" target='__blank'>X</a>
            <a href="https://t.me/panoramablock" target='__blank'>Telegram</a>
            <a href="https://discord.com/invite/V3UyvcTUpS" target='__blank'>Discord</a>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.connect}>
            <Button
              type="wallet"
              title="Launch App"
              onClick={connect}
            />
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.items}>
          {
            items.map((item: any, index: number) => {
              return (
                <a className={styles.item} href={item.url} target='__blank' key={`footer-item-${index}`}>
                  {item.icon}
                </a>
              )
            })
          }
        </div>

        <p>Copyright © 2024 - All rights reserved.</p>
      </div>
    </div>
  )
}

export default LandingFooter