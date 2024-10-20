import React from "react"
import { LucideArrowLeft, BrickWall, ArrowLeftRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "@/src/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

type Props = {
  title?: string
}

const NftTable: React.FC<Props> = ({ title }: Props) => {
  const navigate = useNavigate()
  const params = useParams()

  const data = [
    {
      id: "1",
      collection: "SMB Gen2",
      volume: "1,196.56 SOL",
      lastday: "17.78%",
    },
    {
      id: "2",
      collection: "Frogana",
      volume: "963.62 SOL",
      lastday: "-22.28%",
    },
    {
      id: "3",
      collection: "Mad Lads",
      volume: "935.93 SOL",
      lastday: "126.5%",
    },
    {
      id: "4",
      collection: "Retardio Cousins",
      volume: "729.77 SOL",
      lastday: "-20.58%",
    },
    {
      id: "5",
      collection: "DeGod",
      volume: "495.39 SOL",
      lastday: "21.83%",
    },
    {
      id: "6",
      collection: "Famous Fox Federation",
      volume: "440.07 SOL",
      lastday: "67.51%",
    },
    {
      id: "7",
      collection: "y00t",
      volume: "188.76 SOL",
      lastday: "-19.24%",
    },
    {
      id: "8",
      collection: "Solcasino.io",
      volume: "141.81 SOL",
      lastday: "169.12%",
    }
  ]

  return (
    <div className="flex flex-col mt-1 ml-4 mr-4  text-white w-200px">
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

export default NftTable