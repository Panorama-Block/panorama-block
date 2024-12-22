import { Card } from "@/src/components/ui/card"
import { cn } from "@/src/components/lib/utils"
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons"

interface InfoBoxProps {
  title: string
  value: number | string
  subtitle?: string
  percentageChange?: number
  className?: string
}

export function InfoBox({
  title,
  value,
  subtitle,
  percentageChange,
  className,
}: InfoBoxProps) {
  const isPositive = percentageChange && percentageChange > 0
  const formattedValue = typeof value === 'number'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    : value

  return (
    <Card className={cn("p-6 border-none", className)}>
      <div className="space-y-2 max-h-[200px]">
        <h3 className="text-lg font-medium text-zinc-300">
          {title}
        </h3>
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-semibold text-zinc-200">
            {formattedValue}
          </p>
          {percentageChange !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              {isPositive ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              <span>{Math.abs(percentageChange)}%</span>
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-zinc-300">
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  )
}