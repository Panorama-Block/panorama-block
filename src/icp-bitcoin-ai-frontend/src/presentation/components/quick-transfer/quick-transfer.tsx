import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

interface CardInfo {
  number: string
  balance: string
  currency: string
  type: string
}

export function QuickTransfer() {
  const cards: CardInfo[] = [
    {
      number: "3149",
      balance: "2895.15",
      currency: "USD",
      type: "Debit card"
    },
    {
      number: "****",
      balance: "0.00",
      currency: "EUR",
      type: "Debit"
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Quick Transfer</CardTitle>
        <Button variant="link" className="text-sm text-muted-foreground">
          See all
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cards Scroll Area */}
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {cards.map((card) => (
            <div
              key={card.number}
              className="flex-shrink-0 cursor-pointer rounded-lg bg-purple-600 p-4 text-white min-w-[140px]"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-white/20" />
                <span className="text-sm">{card.type}</span>
              </div>
              <div className="mt-2">
                <div className="text-sm opacity-80">
                  {card.number} {card.type}
                </div>
                <div className="font-semibold">
                  {card.balance} {card.currency}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <Input placeholder="Card or phone" />
          <div className="flex items-center space-x-2">
            <Input placeholder="Preffered amount" />
            <div className="w-20">
              <Input value="USD" readOnly />
            </div>
          </div>
        </div>

        {/* Create New Deposit Section */}
        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Create a new deposit!</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a flexible deposit for your savings suited to your needs in InvestBank.
                </p>
              </div>
              <Button>Get Started</Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
} 