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
  valueColor = "#8884d8",
  transactionsColor = "#82ca9d",
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
    <Card className={className}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          <Tabs defaultValue={defaultPeriod} className="mx-8">
            <TabsList>
              {periods.map((period) => (
                <TabsTrigger key={period.value} value={period.value}>
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
                  <stop offset="5%" stopColor={valueColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={valueColor} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={transactionsColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={transactionsColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#333"
              />
              <XAxis
                dataKey="date"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => valueShort(value)}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#888"
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
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Time
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {data.date}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Value
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {valueFormatter(data.value)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Transactions
                            </span>
                            <span className="font-bold text-muted-foreground">
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
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
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