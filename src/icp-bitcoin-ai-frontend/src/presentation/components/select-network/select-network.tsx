import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

const networks = [
    {
        title: 'Bitcoin',
        icon: null,
        items: [
            {
                title: "Bitcoin",
                icon: '/coins/bitcoin.png',
                url: '/home'
            }
        ],
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
        url: '/icp'
    },
    {
        title: 'Solana',
        icon: '/coins/solana.png',
        url: '/solana'
    }
]

const SelectNetwork = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className='select-none z-[1] flex relative flex-col'>
            <div className="flex gap-2 pr-32 text-zinc-100 hover:cursor-pointer" onClick={() => setOpen(!open)}>
                <span>Network</span>
                {
                    open ? <ChevronUp /> : <ChevronDown />
                }
            </div>

            {
                open && (
                    <div className='grid grid-cols-2 gap-2 p-8 justify-start rounded-md top-16 right-8 w-[300px] absolute bg-zinc-200'>
                        {
                            networks && networks.map((network: any) => {
                                return <div className="w-[50%] h-8 m-0">{network.title}</div>
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SelectNetwork