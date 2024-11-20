import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import styles from './select-network.module.scss'
import { useNavigate } from 'react-router-dom'

const networks = [
    {
        title: 'Bitcoin',
        icon: '/coins/bitcoin.png',
        url: '/home'
    },
    {
        title: 'Ethereum',
        icon: '/coins/eth.png',
        disabled: true,
        url: '/ethereum'
    },
    {
        title: 'ICP',
        icon: '/coins/icp.png',
        items: [
            {
                title: "ICP",
                icon: '/coins/icp.png',
                url: '/icp'
            },
            {
                title: 'CkBTC',
                icon: '/coins/bitcoin.png',
                url: '/ck-bitcoin'
            }
        ],
    },
    {
        title: 'Solana',
        icon: '/coins/solana.png',
        url: '/solana'
    },
    {
        title: 'Stacks',
        icon: '/coins/stacks.png',
        url: '/stacks'
    }
]

const SelectNetwork = () => {
    const [open, setOpen] = useState(false)
    const [actualNetwork, setActualNetwork] = useState(networks)
    const navigate = useNavigate()

    const handleOpen = () => {
        setActualNetwork(networks)
        setOpen(!open)
    }

    const changeNetwork = (network: any) => {
        if(network.items) {
            setActualNetwork(network.items)
        }
        else {
            navigate(network.url)
        }
    }

    return (
        <div className='select-none z-[1] flex relative flex-col'>
            <div className="flex gap-2 pr-32 text-zinc-100 hover:cursor-pointer" onClick={() => handleOpen()}>
                <span>Network</span>
                {
                    open ? <ChevronUp /> : <ChevronDown />
                }
            </div>

            {
                open && (
                    <div className={`${styles.network} select-none z-[1] grid grid-cols-2 gap-4 p-8 justify-start rounded-lg top-16 right-8 w-[300px] absolute `}>
                        {
                            actualNetwork && actualNetwork.map((network: any) => {
                                return <div className="flex gap-2 items-center w-[50%] text-zinc-100 h-8 m-0 hover:cursor-pointer" onClick={() => changeNetwork(network)}>
                                <img className='w-6 h-6' src={network.icon} alt="" />
                                <span>{network.title}</span>
                            </div>
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SelectNetwork