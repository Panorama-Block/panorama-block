
"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import styles from './spending-chart-styles.module.scss'

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
  "height": number,
  "net_burn": number,
  "net_stack": number
}[]

type Props = {
  title: string
  legend: string
  data: Data
  key: string
  range: number[]
}

export const SpendingChart: React.FC<Props> = ({ title, data, legend, key, range }: Props) => {

  const chartConfig = {
    "net_burn": {
      label: 'net_burn',
      color: "#753EFE",
    },
    "net_stack": {
      label: 'net_stack',
      color: "#753EFE",
    },
  } satisfies ChartConfig

  return (

    // <div className={`${styles.chart} w-full p-10 bg-zinc-900 rounded-md`}>
    //   <ChartContainer config={chartConfig} className="max-h-[240px] w-full">
    //     <AreaChart
    //       accessibilityLayer
    //       data={data}
    //       margin={{
    //         left: 12,
    //         right: 12,
    //         bottom: 12
    //       }}
    //     >
    //       <CartesianGrid vertical={false} />
    //       <XAxis
    //         dataKey={key}
    //         tick={{ stroke: 'white', fontWeight: 'normal' }}
    //         tickMargin={24}

    //         tickFormatter={(value) => value}
    //       />
    //       <YAxis
    //         tickMargin={16}
    //         tick={{ stroke: 'white', fontWeight: 200 }}
    //         domain={[10000, 15000]}
    //       />

    //       {/* <Bar dataKey="volume" /> */}
    //       <ChartTooltip
    //         cursor={false}
    //         content={<ChartTooltipContent indicator="dot" hideLabel />}
    //       />
    //       <Area
    //         dataKey="desktop"
    //         type="natural"
    //         fill="var(--color-desktop)"
    //         fillOpacity={0.4}
    //         stroke="var(--color-desktop)"
    //       />
    //     </AreaChart>
    //   </ChartContainer>
    // </div>

    // <Card className={`${styles.chart} w-full h-[280px] bg-zinc-900 rounded-md border-none`}>
    //   <CardHeader>
    //     <CardTitle className="text-md">Bar Chart</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <ChartContainer config={chartConfig}>
    //       <BarChart accessibilityLayer data={chartData}>
    //         <CartesianGrid vertical={false} />
    //         <XAxis
    //           dataKey="volume"
    //           tickLine={false}
    //           tickMargin={10}
    //           axisLine={false}
    //           width={4}
    //           tickFormatter={(value) => value.slice(0, 3)}
    //         />
    //         <ChartTooltip
    //           cursor={false}
    //           content={<ChartTooltipContent hideLabel />}
    //         />
    //         <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    //       </BarChart>
    //     </ChartContainer>
    //   </CardContent>
    // </Card>
    <div className={`${styles.chart} w-full px-10 bg-zinc-900 rounded-[12px]`}>
      <h2 className="pt-4 pb-8 text-zinc-100 font-medium">{title}</h2>
      <ChartContainer config={chartConfig} className="max-h-[240px] w-full">
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

          <Bar
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}

            stroke="var(--color-desktop)"
            radius={[2, 2, 0, 0]}
          />

          <Area
            dataKey="net_burn"
            type="natural"
            fill="var(--color-net_burn)"
            fillOpacity={0}
            stroke="#F4603d"
            stackId="a"
          />
          <Area
            dataKey="net_stack"
            type="natural"
            fill="var(--color-net_stack)"
            fillOpacity={0}
            stroke="var(--color-net_stack)"
            stackId="a"
          />
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
