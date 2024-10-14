import React from "react"
import { LucideArrowLeft, BrickWall, ArrowLeftRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"


const HashblockInfo: React.FC = () => {
  const navigate = useNavigate()
  const params = useParams()

  const data = [
    {
      signature: "FxFSn3cfFRFG...",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    },
    {
      signature: "FxFSn3cfFRFG",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    },
    {
      signature: "FxFSn3cfFRFG",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    },
    {
      signature: "FxFSn3cfFRFG",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    },
    {
      signature: "FxFSn3cfFRFG",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    },
    {
      signature: "FxFSn3cfFRFG",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    },
    {
      signature: "FxFSn3cfFRFG",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    },
    {
      signature: "FxFSn3cfFRFG",
      block: "2917153",
      time: "15 min ago",
      instructions: "SetComputeUnitPrice",
      by: "5dDyfdy9fannAdHEkYghgQp...",
      value: "0.134 SOL",
      fee: "0.0002673 SOL"
    }
  ]

  return (
    <div className="flex flex-col mt-1 ml-12 mr-12 text-white">
      <div className="flex gap-3 ">
        <LucideArrowLeft className="hover:cursor-pointer" onClick={() => navigate(-1)} />
        <h2> HASHBLOCK: {params.id}</h2>
      </div>

      <div className="grid mx-12 mt-12 grid-cols-4 gap-16 w-80%">
        <Card className="flex h-[85px] p-3 bg-[#121D5275] border-zinc-950 rounded-[14px]">
          <div className="flex flex-col">
            <h3 className="text-[#A0AEC0] text-sm font-medium">Transactions</h3>
            <p className="text-[white] font-bold">9876545263</p>
          </div>
          <div className="m-auto">
            <ArrowLeftRight className="text-white" />
          </div>
          <div className="bg-[#582CFF] ml-auto w-12 h-12 rounded-lg justify-self-end">
          </div>
        </Card>
        <Card className="flex h-[85px] p-3 bg-[#121D5275] border-zinc-950 rounded-[14px]">
          <div className="flex flex-col">
            <h3 className="text-[#A0AEC0] text-sm font-medium">Block Size</h3>
            <p className="text-[white] font-bold">0987654567</p>
          </div>
          <div className="m-auto">
            <BrickWall className="text-white" />
          </div>
          <div className="bg-[#582CFF] ml-auto w-12 h-12 rounded-lg justify-self-end">
          </div>
        </Card>
        <Card className="flex h-[85px] p-3 bg-[#121D5275] border-zinc-950 rounded-[14px]">
          <div className="flex flex-col w-40">
            <h3 className="text-[#A0AEC0] text-sm font-medium">Efficiency</h3>
            <p className="text-[white] font-bold">+20%</p>
          </div>
          <div className="self-center">
            <img src="/hashblock/green-line.png" alt="" />
          </div>
        </Card>
        <Card className="flex h-[85px] p-3 bg-[#121D5275] border-zinc-950 rounded-[14px]">
          <div className="flex flex-col w-40">
            <h3 className="text-[#A0AEC0] text-sm font-medium">This week</h3>
            <p className="text-[white] font-bold">1.22 SOL</p>
          </div>
          <div className="self-center">
            <img src="/hashblock/blue-line.png" alt="" />
          </div>
        </Card>
      </div>

      <div className="m-12">
        <Table >
          <TableHeader>
            <TableRow className="border-none hover:bg-[#f2f2f210]">
              <TableHead className="text-white font-bold text-lg	">Signature</TableHead>
              <TableHead className="text-white font-bold text-lg	">Block</TableHead>
              <TableHead className="text-white font-bold text-lg	">Time</TableHead>
              <TableHead className="text-white font-bold text-lg	">Instructions</TableHead>
              <TableHead className="text-white font-bold text-lg	">By</TableHead>
              <TableHead className="text-white font-bold text-lg	">Value</TableHead>
              <TableHead className="text-white font-bold text-lg	">Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.signature} className="border-none text-[#A0AEC0] hover:bg-[#f2f2f210]">
                <TableCell className="font-medium">{row.signature}</TableCell>
                <TableCell className="font-medium">{row.block}</TableCell>
                <TableCell className="font-medium">{row.time}</TableCell>
                <TableCell className="font-medium">{row.instructions}</TableCell>
                <TableCell className="font-medium">{row.by}</TableCell>
                <TableCell className="font-medium">{row.value}</TableCell>
                <TableCell className="font-medium">{row.fee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  )
}

export default HashblockInfo