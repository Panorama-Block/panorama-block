import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import styles from './pox-table-styles.module.scss'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination"

type Props = {
  title: string
  data: {
    "block_time": string,
    "input_address": string,
    "sats_vbyte": number,
    "tx_fee": number,
    "net_commit": number,
    "block_height": number,
    "index": number,
    "parent_block": number,
    "parent_index": number,
    "block_mod": string,
    "parent_mod": string,
    "anchor_ok": string,
    "pox_type": string,
    "nvout": number,
    "vbytes": number,
    "key_block": number,
    "key_index": number,
    "anchor_mod": number,
    "memo": number,
    "block_hash": string,
    "tx_id": string
  }[]
}

const PoxTable: React.FC<Props> = ({ title, data }: Props) => {
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
              <TableHead className="text-white font-bold text-md text-nowrap">Block Time</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Input Address</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Sats Vbyte</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Transaction Fee</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Net Commit</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Block Height</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Index</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Parent Block</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Parent Index</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Block Mod</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Parent Mod</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Anchor Ok</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Pox Type</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Nvout</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Vbytes</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Key Block</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Key Index</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Anchor Mod</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Memo</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Block Hash</TableHead>
              <TableHead className="text-white font-bold text-md text-nowrap">Transaction Id</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.slice((actual - 1) * perPage, ((actual - 1) * perPage) + perPage).map((row, index) => {
                return <TableRow key={`pox-${index}`} className="border-zinc-700 text-[#A0AEC0] hover:bg-[#f2f2f210]">
                  <TableCell className="text-zinc-200 font-medium">{row.block_time}</TableCell>
                  <TableCell className="font-medium underline text-blue-400" dangerouslySetInnerHTML={{ __html: row.input_address }}></TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.sats_vbyte}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.tx_fee}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_commit}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.block_height}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.index}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.parent_block}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.parent_index}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.block_mod}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.parent_mod}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.anchor_ok}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.pox_type}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.nvout}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.vbytes}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.key_block}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.key_index}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.anchor_mod}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.memo}</TableCell>
                  <TableCell className="font-medium underline text-blue-400" dangerouslySetInnerHTML={{ __html: row.block_hash }}></TableCell>
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

export default PoxTable