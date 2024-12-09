import { Card } from "@/src/components/ui/card"

interface Transaction {
  id: number
  name: string
  date: string
  amount: string
  positive: boolean
  logo: string
}

interface InfoListProps {
  transactions: Transaction[]
}

export function InfoList({ transactions }: InfoListProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Transactions</h3>
        <a href="#" className="text-sm text-blue-500 hover:underline">
          View all
        </a>
      </div>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-4 flex items-center">
            <img
              src={transaction.logo}
              alt="logo"
              className="h-10 w-10 rounded-full mr-4"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {transaction.name}
              </p>
              <p className="text-sm text-gray-500">
                {transaction.date}
              </p>
            </div>
            <div>
              <p
                className={`text-sm font-medium ${transaction.positive ? "text-green-500" : "text-red-500"}`}
              >
                {transaction.amount}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}