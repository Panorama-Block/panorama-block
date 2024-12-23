import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Switch } from "@/src/components/ui/switch"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"

export function Wallet() {
  return (
    <div className="w-full max-w-[800px] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Wallet</h2>
          <span className="text-muted-foreground">Cards | 1 out of 4</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Section */}
        <Card className="bg-black text-white p-6 rounded-xl">
          <CardContent className="p-0 space-y-8">
            <div className="flex justify-between items-start">
              <img 
                src="/visa-logo.svg" 
                alt="Visa" 
                className="h-8"
              />
              <div className="w-24 h-24 bg-purple-600 rounded-full absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 opacity-50" />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Card Number</p>
              <p className="text-xl tracking-wider">5783 4160 8526 3149</p>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-3xl font-semibold">$14,528.00</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Currency</p>
            <p className="text-xl">US Dollar</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Deactivate card</p>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  )
} 