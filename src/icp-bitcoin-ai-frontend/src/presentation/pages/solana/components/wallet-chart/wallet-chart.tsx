
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"
import { CardFooter } from "@/src/components/ui/card"
import { TrendingUp } from "lucide-react"
import { valueShort } from "@/src/utils/value-short"

export const description = "An interactive bar chart"

const walletData = [
  { legend: "09/27", desktop: 2500781 },
  { legend: "09/28", desktop: 1871273 },
  { legend: "09/29", desktop: 1378519 },
  { legend: "09/30", desktop: 1462872 },
  { legend: "10/01", desktop: 1570864 },
  { legend: "10/02", desktop: 1476192 },
  { legend: "10/03", desktop: 1354176 },
]

const chartConfig = {
  desktop: {
    label: "Active",
    color: "#753EFE",
  },
} satisfies ChartConfig

export const WalletChart = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: walletData.reduce((acc, curr) => acc + curr.desktop, 0)
    }),
    []
  )

  return (

    <div className="w-full">
      <ChartContainer config={chartConfig} className="max-h-[358px] w-full">
        <AreaChart
          accessibilityLayer
          data={walletData}
          margin={{
            left: 12,
            right: 12,
            bottom: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="hour"
            tick={{ stroke: 'white', fontWeight: 'normal' }}
            tickMargin={24}

            tickFormatter={(value) => value}
          />
          <YAxis
            tickMargin={16}
            tick={{ stroke: 'white', fontWeight: 200 }}

            tickFormatter={(value) => valueShort(value)}

            domain={[0, 2600000]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent className="w-[175px]" indicator="dot" hideLabel />}
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
          <ChartLegend className="mt-4 mb-2 text-zinc-300" content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
