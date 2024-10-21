import React from "react"
import { LucideArrowLeft, BrickWall, ArrowLeftRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "@/src/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

type Props = {
  title?: string
}

const MemeTable: React.FC<Props> = ({ title }: Props) => {
  const navigate = useNavigate()
  const params = useParams()

  const data = [
    {
      id: "1",
      collection: "POPCAT",
      volume: "$ 928,782,188",
      lastday: "-4.49%",
    },
    {
      id: "2",
      collection: "Bonk",
      volume: "$ 862,213,128",
      lastday: "-7.96%",
    },
    {
      id: "3",
      collection: "cat in a dogs world",
      volume: "$ 429,087,224",
      lastday: "-6.07%",
    },
    {
      id: "4",
      collection: "BOOK OF MEME",
      volume: "$ 326,351,873",
      lastday: "-7.78%",
    },
    {
      id: "5",
      collection: "Moo Deng",
      volume: "$ 183,064,264",
      lastday: "-17.97%",
    },
    {
      id: "6",
      collection: "Ponke",
      volume: "$ 152,283,630",
      lastday: "-12.42%",
    },
    {
      id: "7",
      collection: "michi",
      volume: "$ 96,741,152",
      lastday: "-8.35%",
    },
    {
      id: "8",
      collection: "Mumu the Bull",
      volume: "$ 93,304,422",
      lastday: "-9.79%",
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

export default MemeTable