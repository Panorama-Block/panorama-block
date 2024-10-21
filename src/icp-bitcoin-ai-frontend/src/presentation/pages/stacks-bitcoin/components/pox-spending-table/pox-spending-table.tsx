import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import styles from './pox-spending-table-styles.module.scss'

type Props = {
  title: string
  data: {
    "commit_blocks": number,
    "commit_txs": number,
    "miners_uniq": number,
    "stackers_uniq": number,
    "net_spend": number,
    "net_stack": number,
    "net_burn": number,
    "net_fee": number
  }[]
}

const PoxSpendingTable: React.FC<Props> = ({ title, data }: Props) => {

  return (
    <div className="flex flex-col mt-1  text-white w-200px">
      <div className="flex gap-3 ">
        <h3 className="ml-8 text-lg font-bold">{title}</h3>
      </div>

      <div className={`${styles.card} m-4`}>
        <Table >
          <TableHeader>
            <TableRow className="border-zinc-600 hover:bg-[#f2f2f210]">
              <TableHead className="text-white font-bold text-md">Commit Blocks</TableHead>
              <TableHead className="text-white font-bold text-md">Commit Transactions</TableHead>
              <TableHead className="text-white font-bold text-md">Miners Unique</TableHead>
              <TableHead className="text-white font-bold text-md">Stackers Unique</TableHead>
              <TableHead className="text-white font-bold text-md">Net Spend</TableHead>
              <TableHead className="text-white font-bold text-md">Net Stack</TableHead>
              <TableHead className="text-white font-bold text-md">Net Burn</TableHead>
              <TableHead className="text-white font-bold text-md">Net Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((row, index) => {
                return <TableRow key={`spending-${index}`} className="border-zinc-700 text-[#A0AEC0] hover:bg-[#f2f2f210]">
                  <TableCell className="font-medium">{row.commit_blocks}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.commit_txs}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.commit_txs}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.miners_uniq}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.stackers_uniq}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_spend}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_burn}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.net_fee}</TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </div>
    </div >
  )
}

export default PoxSpendingTable