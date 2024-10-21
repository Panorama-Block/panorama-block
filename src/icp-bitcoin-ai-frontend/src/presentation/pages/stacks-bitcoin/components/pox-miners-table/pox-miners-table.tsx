import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import styles from './pox-miners-table-styles.module.scss'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination"

type Props = {
  title: string
  data: {
    "input_address": string,
    "net_spend": number,
    "net_stack": number,
    "net_burn": number,
    "net_fee": number,
    "avg_commit": number,
    "block_commits": number,
    "last_block": number,
    "first_block": number
  }[]
}

const PoxMinersTable: React.FC<Props> = ({ title, data }: Props) => {
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
              <TableHead className="text-white font-bold text-md">Input Address</TableHead>
              <TableHead className="text-white font-bold text-md">Net Spend</TableHead>
              <TableHead className="text-white font-bold text-md">Net Burn</TableHead>
              <TableHead className="text-white font-bold text-md">Net Stack</TableHead>
              <TableHead className="text-white font-bold text-md">Net Fee</TableHead>
              <TableHead className="text-white font-bold text-md">Avg Commit</TableHead>
              <TableHead className="text-white font-bold text-md">Block Commits</TableHead>
              <TableHead className="text-white font-bold text-md">Last Block</TableHead>
              <TableHead className="text-white font-bold text-md">First Block</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.slice((actual - 1) * perPage, ((actual - 1) * perPage) + perPage).map((row) => {
                return <TableRow key={row.input_address} className="border-zinc-700 text-[#A0AEC0] hover:bg-[#f2f2f210]">
                  <TableCell className="font-medium underline text-blue-400" dangerouslySetInnerHTML={{ __html: row.input_address }}></TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_spend}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_burn}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_stack}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_fee}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.avg_commit}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.block_commits}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.last_block}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.first_block}</TableCell>
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

export default PoxMinersTable