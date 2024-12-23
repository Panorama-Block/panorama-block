import { Card } from "@/src/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { valueShort } from "@/src/utils/value-short"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface ChartData {
  date: string
  value: number
  transactions: number
  currentState?: boolean
}

interface ChartByTimeProps {
  data: ChartData[]
  className?: string
  title?: string
  description?: string
  valueLabel?: string
  transactionsLabel?: string
  valueColor?: string
  transactionsColor?: string
  valueFormatter?: (value: number) => string
  transactionsFormatter?: (value: number) => string
  periods?: {
    value: string
    label: string
  }[]
  defaultPeriod?: string
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

const formatTransactions = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value)
}

export function ChartByTime({
  data,
  className,
  title = "Transaction Analysis",
  description = "Network activity by time of day",
  valueLabel = "Transaction Value",
  transactionsLabel = "Number of Transactions",
  valueColor = "#60A5FA",
  transactionsColor = "#34D399",
  valueFormatter = formatCurrency,
  transactionsFormatter = formatTransactions,
  periods = [
    { value: "24H", label: "24H" },
    { value: "7D", label: "7D" },
    { value: "30D", label: "30D" },
  ],
  defaultPeriod = "24H"
}: ChartByTimeProps) {
  return (
    <Card className={`${className} border-[#1a2657]`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-200">{title}</h3>
            <p className="text-sm text-gray-400">
              {description}
            </p>
          </div>
          <Tabs defaultValue={defaultPeriod} className="mx-8">
            <TabsList className="bg-[#101b52]/50">
              {periods.map((period) => (
                <TabsTrigger
                  key={period.value}
                  value={period.value}
                  className="text-gray-400 data-[state=active]:bg-[#1a2657] data-[state=active]:text-white"
                >
                  {period.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={valueColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={valueColor} stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={transactionsColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={transactionsColor} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#1a2657"
              />
              <XAxis
                dataKey="date"
                stroke="#d2d2d2"
                fontSize={12}
                tickMargin={20}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#d2d2d2"
                tickMargin={10}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => valueShort(value)}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#d2d2d2"
                tickMargin={10}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ChartData
                    return (
                      <div className="rounded-lg border border-[#1a2657] bg-[#101b52] p-2 shadow-xl">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-400">
                              Time
                            </span>
                            <span className="font-bold text-gray-200">
                              {data.date}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-400">
                              Value
                            </span>
                            <span className="font-bold text-gray-200">
                              {valueFormatter(data.value)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-400">
                              Transactions
                            </span>
                            <span className="font-bold text-gray-200">
                              {transactionsFormatter(data.transactions)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="value"
                stroke={valueColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="transactions"
                stroke={transactionsColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTransactions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: valueColor }} />
            <span>{valueLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: transactionsColor }} />
            <span>{transactionsLabel}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}