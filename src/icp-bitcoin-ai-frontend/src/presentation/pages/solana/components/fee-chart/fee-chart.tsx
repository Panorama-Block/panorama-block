
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import styles from './fee-chart-styles.module.scss'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { TrendingUp } from "lucide-react"
import { valueShort } from "@/src/utils/value-short"

type Data = {
  legend: string,
  desktop: any
}

type Props = {
  title: string
  legend: string
  data: Data[],
  key: string,
  range: number[]
}

export const description = "An interactive bar chart"

const feeData = [
  { legend: "09/27", desktop: 8640 },
  { legend: "09/28", desktop: 11424 },
  { legend: "09/29", desktop: 9812 },
  { legend: "09/30", desktop: 9127 },
  { legend: "10/01", desktop: 7548 },
  { legend: "10/02", desktop: 9585 },
  { legend: "10/03", desktop: 9249 },
]

export const FeeChart: React.FC = () => {

  const chartConfig = {
    desktop: {
      label: 'Fee',
      color: "#753EFE",
    },
  } satisfies ChartConfig

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: feeData.reduce((acc, curr) => acc + curr.desktop, 0)
    }),
    []
  )

  return (
    <div className={`w-full px-10 rounded-[12px]`}>
      <ChartContainer config={chartConfig} className="max-h-[600px] w-full">
        <BarChart
          data={feeData}
          accessibilityLayer
          margin={{
            left: 0,
            right: 12,
            bottom: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="legend"
            tick={{ fontSize: 12, stroke: '#d2d2d2', fontWeight: 'normal' }}
            tickMargin={24}

            tickFormatter={(value) => value}
          />
          <YAxis
            tickMargin={12}
            tick={{ stroke: 'white', fontWeight: 200 }}
            tickFormatter={(value) => valueShort(value)}
            domain={[0, 12000]}
          />

          <Bar
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}

            stroke="var(--color-desktop)"
            radius={[2, 2, 0, 0]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent className="w-[175px]" indicator="dot" hideLabel />}
          />

          <ChartLegend className="mt-4 mb-2 text-zinc-300" content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
