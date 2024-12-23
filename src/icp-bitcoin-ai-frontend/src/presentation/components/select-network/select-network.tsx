import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import styles from './select-network.module.scss'
import { useNavigate } from 'react-router-dom'

const networks = [
    {
        id: 1,
        title: 'Bitcoin',
        icon: '/coins/bitcoin.png',
        url: '/home'
    },
    {
        id: 2,
        title: 'Ethereum',
        icon: '/coins/eth.png',
        disabled: true,
        url: '/ethereum'
    },
    {
        id: 3,
        title: 'ICP',
        icon: '/coins/icp.png',
        items: [
            {
                id: 31,
                title: "ICP",
                icon: '/coins/icp.png',
                url: '/icp'
            },
            {
                id: 32,
                title: 'CkBTC',
                icon: '/coins/bitcoin.png',
                url: '/ck-bitcoin'
            }
        ],
    },
    {
        id: 4,
        title: 'Solana',
        icon: '/coins/solana.png',
        url: '/solana'
    },
    {
        id: 5,
        title: 'Stacks',
        icon: '/coins/stacks.png',
        url: '/stacks'
    },
    {
        id: 6,
        title: 'XRPL',
        icon: '/coins/xrpl.png',
        url: '/xrpl'
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
        if (network.items) {
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
                            actualNetwork && actualNetwork.map((network: any) => (
                                <div
                                    key={network.id}
                                    className={`flex gap-2 items-center w-[50%] text-zinc-100 h-8 m-0 ${network.disabled ? 'cursor-not-allowed opacity-75' : 'hover:cursor-pointer'}`}
                                    onClick={() => !network.disabled && changeNetwork(network)}
                                >
                                    <img className='w-6 h-6' src={network.icon} alt="" />
                                    <span>{network.title}</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SelectNetwork