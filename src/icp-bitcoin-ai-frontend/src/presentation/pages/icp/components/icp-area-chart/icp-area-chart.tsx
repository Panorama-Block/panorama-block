
"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import styles from './icp-area-chart-styles.module.scss'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"
import { valueShort } from "@/src/utils/value-short"

type Props = {
  title: string
  legend: string
  data: any
  dataKey: string
  range?: number[]
  noBackground?: Boolean
}

export const ICPAreaChart: React.FC<Props> = ({ title, data, legend, dataKey, range, noBackground }: Props) => {

  const chartConfig = {
    [dataKey]: {
      label: legend,
      color: "#753EFE",
    },
    // "net_stack": {
    //   label: 'net_stack',
    //   color: "#753EFE",
    // },
  } satisfies ChartConfig

  return (
    <div className={`${styles.chart} ${noBackground && styles.none} w-full px-10 bg-zinc-900 rounded-[12px]`}>
      <h2 className="pt-4 pb-8 text-zinc-100 font-medium">{title}</h2>
      <ChartContainer config={chartConfig} className="min-h-[240px] max-h-[320px] w-full">
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
            domain={range}
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
            dataKey={dataKey}
            type="natural"
            fill={`var(--color-${dataKey}`}
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
            content={<ChartTooltipContent className="w-[260px]" indicator="dot" hideLabel />}
          />

          {/* <ChartLegend className="mt-4 mb-2 text-zinc-300" content={<ChartLegendContent  />} /> */}
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
