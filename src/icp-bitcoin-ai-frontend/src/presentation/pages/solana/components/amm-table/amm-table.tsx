import React from "react"
import { LucideArrowLeft, BrickWall, ArrowLeftRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Props = {
  title?: string
}

const AmmTable: React.FC<Props> = ({ title }: Props) => {
  const navigate = useNavigate()
  const params = useParams()

  const data = [
    {
      id: "1",
      collection: "Raydium",
      volume: "$983,360,400",
      lastday: "-11.71%",
    },
    {
      id: "2",
      collection: "Orca",
      volume: "$482,799,420",
      lastday: "35.49%",
    },
    {
      id: "3",
      collection: "Jupiter",
      volume: "$1,134,782,800",
      lastday: "13.33%",
    },
    {
      id: "4",
      collection: "2917153",
      volume: "15 min ago",
      lastday: "35.12%",
    }
  ]

  return (
    <div className="flex flex-col mt-1 ml-8 mr-8 text-white w-200px">
      <div className="flex gap-3 ">
        <h3>{title}</h3>
      </div>

      <div className="mb-4">
        <Table >
          <TableHeader>
            <TableRow className="border-none hover:bg-[#f2f2f210]">
              <TableHead className="text-zinc-400 font-normal text-md">#</TableHead>
              <TableHead className="text-zinc-400 font-normal text-md">Collection</TableHead>
              <TableHead className="text-zinc-400 font-normal text-md">Volume</TableHead>
              <TableHead className="text-zinc-400 font-normal text-md">24h%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, id) => (
              <TableRow key={row.id} className="border-none text-[#A0AEC0] hover:bg-[#f2f2f210]">
                <TableCell className="text-zinc-200 font-medium">{id + 1}</TableCell>
                <TableCell className="text-zinc-200 font-medium">{row.collection}</TableCell>
                <TableCell className="text-zinc-200 font-medium">{row.volume}</TableCell>
                <TableCell className={`${row.lastday.includes('-') ? 'text-[red]' : 'text-[green]'} font-medium`}>{row.lastday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  )
}

export default AmmTable