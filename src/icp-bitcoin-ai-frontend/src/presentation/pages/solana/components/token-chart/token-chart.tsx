
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CardFooter } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export const description = "An interactive bar chart"

const chartData = [
  { hour: "10 am", desktop: 11500 },
  { hour: "11 am", desktop: 13600 },
  { hour: "12 pm", desktop: 11280 },
  { hour: "13 pm", desktop: 14525 },
]

const chartConfig = {
  desktop: {
    label: "Price ",
    color: "#753EFE",
  },
} satisfies ChartConfig

export const TokenChart = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0)
    }),
    []
  )

  return (

    <div className="w-full">
      <ChartContainer config={chartConfig} className="max-h-[280px] w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
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
            domain={[10000, 15000]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
      <CardFooter>
        <div className="grid mt-4 mr-48 gap-8 items-start text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              High
            </div>
            <div className="flex items-center gap-2 font-medium leading-none">
              11,691.89
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Low
            </div>
            <div className="flex items-center gap-2 font-medium leading-none">
              11,691.89
            </div>
          </div>
        </div>
        <div className="grid mt-4 gap-8 items-start text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Prev close (Avr 28 Days)
            </div>
            <div className="flex items-center gap-2 font-medium leading-none">
              11,512.41
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Open
            </div>
            <div className="flex items-center gap-2 font-medium leading-none">
              11,690.11
            </div>
          </div>
        </div>
      </CardFooter>
    </div>
  )
}
