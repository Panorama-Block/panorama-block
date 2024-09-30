import React, { useEffect, useRef, useState } from 'react'
import styles from './open-chat-styles.module.scss'
import { initialise } from "@open-ic/openchat-xframe"
import { OpenChatXFrame } from "@open-ic/openchat-xframe/lib/types"
import { Close } from '@mui/icons-material'

const purple = "#582CFF75"
const txt = "#f5f5f5"
const txtSecondary = "#A0AEC0"
const background = "#060722"
const entryBg = "#582CFF10"
const inputBg = "#0F123B"

const initialiseOpenChatFrame = (
  path: string,
  iframe: HTMLIFrameElement
): Promise<OpenChatXFrame> => {
  return initialise(iframe, {
    targetOrigin: "https://oc.app",
    initialPath: path,
    settings: {
      disableLeftNav: true
    },
    theme: {
      name: "Panorama Block",
      base: "dark",
      overrides: {
        burst: false,
        primary: purple,
        bd: purple,
        bg: background,
        txt: txt,
        placeholder: txtSecondary,
        "txt-light": txtSecondary,
        timeline: {
          txt: txt,
        },
        time: {
          txt: txt,
          icon: txt,
        },
        menu: {
          bd: purple,
          separator: purple,
        },
        scrollbar: {
          bg: purple,
        },
        button: {
          bg: purple,
          hv: purple,
        },
        icon: {
          txt: txtSecondary,
        },
        currentChat: {
          date: {
            bd: `solid 1px ${purple}`,
            bg: "rgba(0,0,0,0.8)",
            txt: txtSecondary,
          },
          msg: {
            bd: `solid 1px ${purple}`,
            me: {
              bg: purple,
              txt: "#fff",
            },
            txt: txt,
          },
        },
        entry: {
          bg: entryBg,
          input: {
            bg: inputBg,
          }
        },
      },
    },
  })
}

type Props = {
  onClose: () => void
}

const OpenChat: React.FC<Props> = ({ onClose }: Props) => {
  const iframe = useRef<HTMLIFrameElement>(null)
  const path = "/group/lejtn-6aaaa-aaaar-bijya-cai/?ref=kv2af-gaaaa-aaaaf-bl4cq-cai"

  const [client, setClient] = useState<Promise<OpenChatXFrame> | undefined>(
    undefined
  )

  useEffect(() => {
    if (iframe.current) {
      if (client === undefined) {
        setClient(initialiseOpenChatFrame(path, iframe.current))
      }
    }
  }, [client])

  return (
    <div className={styles.openChat}>
      <iframe ref={iframe} title="OpenChat" frameBorder="0" />
      <div className={styles.close} onClick={onClose}>
        <Close />
      </div>
    </div>
  )
}

export default OpenChat