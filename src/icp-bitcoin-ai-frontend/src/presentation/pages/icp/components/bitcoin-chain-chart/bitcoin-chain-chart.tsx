
"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import styles from './bitcoin-chain-chart-styles.module.scss'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"
import { valueShort } from "@/src/utils/value-short"

type Data = {
  "height": number,
}[]

type Props = {
  title: string
  legend: string
  data: Data
  key: string
  range?: number[]
}

export const BitcoinChainChart: React.FC<Props> = ({ title, data, legend, key, range }: Props) => {

  const chartConfig = {
    "height": {
      label: 'Height',
      color: "#753EFE",
      // color: "#F4603d90",
    },
    // "net_stack": {
    //   label: 'net_stack',
    //   color: "#753EFE",
    // },
  } satisfies ChartConfig

  return (
    <div className={`${styles.chart} w-full px-10 bg-zinc-900 rounded-[12px] min-h-[320px]`}>
      <h2 className="pt-4 pb-8 text-zinc-100 font-medium">{title}</h2>
      <ChartContainer config={chartConfig} className="max-h-[320px] w-[100%]">
        <AreaChart
          data={data}
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

            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickMargin={12}
            tick={{ stroke: 'white', fontWeight: 200 }}
            tickFormatter={(value) => valueShort(value)}
            domain={[800000, 890000]}
          />

          {/* <Bar
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}

            stroke="var(--color-desktop)"
            radius={[2, 2, 0, 0]}
          /> */}

          <Area
            dataKey="height"
            type="natural"
            fill="var(--color-height)"
            fillOpacity={0.4}
            stroke="#753EFE"
          />
          {/* <Area
            dataKey="net_stack"
            type="natural"
            fill="var(--color-net_stack)"
            fillOpacity={0}
            stroke="var(--color-net_stack)"
            stackId="a"
          /> */}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent className="w-[175px]" indicator="dot" hideLabel />}
          />

          {/* <ChartLegend className="mt-4 mb-2 text-zinc-300" content={<ChartLegendContent  />} /> */}
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
