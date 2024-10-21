import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import styles from './vrf-key-table-styles.module.scss'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination"

type Props = {
  title: string
  data: {
    "block_height": number,
    "index": number,
    "miner_address": string,
    "nvin": number,
    "nvout": number,
    "vbytes": number,
    "sats_vbyte": number,
    "tx_fee": number,
    "stx_op_hex": string,
    "stx_op_asm": string,
    "script_bytes": number,
    "msg_consensus_hash": string,
    "msg_vrf_key": string,
    "msg_memo": string,
    "tx_id": string,
  }[]
}

const VRFKeyTable: React.FC<Props> = ({ title, data }: Props) => {
  const [actual, setActual] = useState(1)
  const perPage = 6

  const previous = () => {
    if (actual > 1) {
      setActual(actual - 1)
    }
  }

  const next = () => {
    if (actual <= 3) {
      setActual(actual + 1)
    }
  }

  return (
    <div className="flex flex-col mt-1  text-white w-200px">
      <div className="flex gap-3 ">
        <h3 className="ml-8 text-lg font-bold">{title}</h3>
      </div>

      <div className={`${styles.card} m-4`}>
        <Table >
          <TableHeader>
            <TableRow className="border-zinc-600 hover:bg-[#f2f2f210]">
              <TableHead className="text-white font-bold text-md text-nowrap">Block Height</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Index</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Miner Address</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Nvin</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Nvout</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Vbytes</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Sats Vbyte</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Transaction Fee</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Stx Op Hex</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Stx Op Asm</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Script Bytes</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Msg Consensus Hash</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Msg Vrf Key</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Msg Memo</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Transaction Id</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.slice((actual - 1) * perPage, ((actual - 1) * perPage) + perPage).map((row, index) => {
                return <TableRow key={`vrf-${index}`} className="border-zinc-700 text-[#A0AEC0] hover:bg-[#f2f2f210]">
                  <TableCell className="text-zinc-200 font-medium">{row.block_height}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.index}</TableCell>
                  <TableCell className="font-medium underline text-blue-400" dangerouslySetInnerHTML={{ __html: row.miner_address }}></TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.nvin}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.nvout}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.vbytes}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.sats_vbyte}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.tx_fee}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.stx_op_hex}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.stx_op_asm}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.script_bytes}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.msg_consensus_hash}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.msg_vrf_key}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.msg_memo}</TableCell>
                  <TableCell className="font-medium underline text-blue-400" dangerouslySetInnerHTML={{ __html: row.tx_id }}></TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent className="ml-auto mr-4 :hover cursor-pointer" >
            <PaginationItem value={1}>
              <PaginationPrevious size="sm" onClick={() => previous()} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className={`${actual == 1 && 'text-zinc-900'}`} size="sm" onClick={() => setActual(1)} isActive={actual == 1}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem value={2}>
              <PaginationLink className={`${actual == 2 && 'text-zinc-900'}`} size="sm" onClick={() => setActual(2)} isActive={actual == 2}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem value={3}>
              <PaginationLink className={`${actual == 3 && 'text-zinc-900'}`} size="sm" onClick={() => setActual(3)} isActive={actual == 3}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem value={4}>
              <PaginationLink className={`${actual == 4 && 'text-zinc-900'}`} size="sm" onClick={() => setActual(4)} isActive={actual == 4}>4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext size="sm" onClick={() => next()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div >
  )
}

export default VRFKeyTable