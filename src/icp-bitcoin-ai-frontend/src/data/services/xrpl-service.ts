import data from "./xrpl.json"

const xrplService = {
    getLedgers: () => data.ledger,
    getLedgerData: () => data.ledger_data,
    getFee: () => data.fee,
    
    getLedgerMetrics: () => {
        const now = new Date()
        const data = []
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const baseLedger = 92949375 - (i * 200)
            const hashValue = Math.floor(Math.random() * 0xFFFFFFFF)
            
            data.push({
                date: `${hour}:${minutes}`,
                value: baseLedger,
                transactions: hashValue
            })
        }
        
        return data
    },

    getTransactionMetrics: () => {
        const now = new Date()
        const data = []
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const baseTransactions = 25 + Math.floor(Math.random() * 15)
            const hourMultiplier = (date.getHours() >= 9 && date.getHours() <= 17) ? 2 : 1
            
            data.push({
                date: `${hour}:${minutes}`,
                value: baseTransactions * hourMultiplier,
                transactions: Math.floor(baseTransactions * hourMultiplier * 1000)
            })
        }
        
        return data
    },

    getLedgerCloseMetrics: () => {
        const now = new Date()
        const data = []
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const baseCloseTime = 3 + (Math.random() * 1)
            const loadFactor = (date.getHours() >= 9 && date.getHours() <= 17) ? 1.2 : 1
            const validators = 28 + Math.floor(Math.random() * 7)
            
            data.push({
                date: `${hour}:${minutes}`,
                value: Number((baseCloseTime * loadFactor).toFixed(2)),
                transactions: validators
            })
        }
        
        return data
    },

    getCirculationMetrics: () => {
        const now = new Date()
        const data = []
        
        const baseTotalSupply = 99986740839386611 / 1000000
        const burnRate = 0.0001
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const circulatingSupply = baseTotalSupply * (1 - (burnRate * i))
            const lockedSupply = circulatingSupply * (0.10 + (Math.random() * 0.05))
            
            data.push({
                date: `${hour}:${minutes}`,
                value: Math.floor(circulatingSupply),
                transactions: Math.floor(lockedSupply)
            })
        }
        
        return data
    },

    getStateObjectMetrics: () => {
        const now = new Date()
        const data = []
        
        const baseAccounts = 250000
        const baseOffers = 75000
        const growthRate = 0.0002
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const growthFactor = 1 + (growthRate * i)
            
            const totalObjects = Math.floor(
                (baseAccounts + baseOffers) * growthFactor
            )
            
            const activeObjects = Math.floor(
                totalObjects * (0.15 + (Math.random() * 0.05))
            )
            
            data.push({
                date: `${hour}:${minutes}`,
                value: totalObjects,
                transactions: activeObjects
            })
        }
        
        return data
    },

    getLedgerSizeMetrics: () => {
        const now = new Date()
        const data = []
        
        const baseLedgerSize = 12800
        const baseGrowthRate = 0.0015
        const baseTransactionsPerHour = 85000
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const timeGrowth = Math.pow(1 + baseGrowthRate, i)
            const randomVariation = 1 + (Math.random() * 0.02 - 0.01)
            
            const isPeakHour = date.getHours() >= 9 && date.getHours() <= 17
            const peakMultiplier = isPeakHour ? 1.2 : 1
            
            const ledgerSize = baseLedgerSize * timeGrowth * randomVariation * peakMultiplier
            
            const transactionCount = Math.floor(
                baseTransactionsPerHour * 
                peakMultiplier * 
                (1 + (Math.random() * 0.3 - 0.15))
            )

            data.push({
                date: `${hour}:${minutes}`,
                value: Math.floor(ledgerSize),
                transactions: transactionCount,
                details: {
                    stateObjects: Math.floor(ledgerSize * 0.65),
                    transactionHistory: Math.floor(ledgerSize * 0.25),
                    indexes: Math.floor(ledgerSize * 0.10),
                }
            })
        }
        
        return data
    },

    getStateDurationMetrics: () => {
        const now = new Date()
        const data = []
        
        const baseStates = {
            full: 3600,
            connected: 300,
            syncing: 120,
            tracking: 180,
            disconnected: 60
        }
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const variation = () => 1 + (Math.random() * 0.2 - 0.1)
            
            const totalTime = Object.values(baseStates).reduce((a, b) => a + b, 0)
            const fullStatePercentage = Math.min(
                98,
                (baseStates.full * variation() / totalTime) * 100
            )
            
            const baseTransitions = 4
            const transitions = Math.max(1, Math.floor(baseTransitions * variation()))
            
            const hourlyStates = {
                full: baseStates.full * variation(),
                connected: baseStates.connected * variation(),
                syncing: baseStates.syncing * variation(),
                tracking: baseStates.tracking * variation(),
                disconnected: baseStates.disconnected * variation()
            }

            data.push({
                date: `${hour}:${minutes}`,
                value: fullStatePercentage,
                transactions: transitions,
                details: {
                    stateDurations: hourlyStates,
                    totalUptime: Object.values(hourlyStates).reduce((a, b) => a + b, 0),
                    maintenanceMode: false,
                    lastStateChange: date.getTime() - Math.floor(Math.random() * 3600000)
                }
            })
        }
        
        return data
    },

    getObjectTypeDistribution: () => {
        const now = new Date()
        const data = []
        
        const baseNumbers = {
            accountRoot: 250000,
            rippleState: 180000,
            directoryNode: 85000,
            offer: 45000,
            nftokens: 25000,
            amm: 15000,
            signerList: 8000
        }

        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const variation = () => 1 + (Math.random() * 0.1 - 0.05)
            
            const totalObjects = Object.values(baseNumbers).reduce((a, b) => a + b, 0)
            
            const activeObjects = Math.floor(totalObjects * (0.65 + Math.random() * 0.1))

            data.push({
                date: `${hour}:${minutes}`,
                value: Math.floor(totalObjects * variation()),
                transactions: activeObjects,
                details: {
                    accountRoot: Math.floor(baseNumbers.accountRoot * variation()),
                    rippleState: Math.floor(baseNumbers.rippleState * variation()),
                    directoryNode: Math.floor(baseNumbers.directoryNode * variation()),
                    offer: Math.floor(baseNumbers.offer * variation()),
                    nftokens: Math.floor(baseNumbers.nftokens * variation()),
                    amm: Math.floor(baseNumbers.amm * variation()),
                    signerList: Math.floor(baseNumbers.signerList * variation())
                }
            })
        }
        
        return data
    },

    getFeeMetrics: () => {
        const now = new Date()
        const data = []
        
        const baseFee = 10
        const baseLoadFactor = 256
        const queueThreshold = 1024
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date(now)
            date.setHours(date.getHours() - i)
            
            const hour = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            const isPeakHour = date.getHours() >= 9 && date.getHours() <= 17
            const peakLoadMultiplier = isPeakHour ? (1.5 + Math.random() * 0.5) : (1 + Math.random() * 0.2)
            
            const currentLoadFactor = Math.floor(baseLoadFactor * peakLoadMultiplier)
            
            const actualFee = Math.floor(baseFee * (currentLoadFactor / 256))
            
            const queueState = isPeakHour ? 
                Math.floor(queueThreshold * (0.7 + Math.random() * 0.3)) : 
                Math.floor(queueThreshold * (0.2 + Math.random() * 0.3))

            data.push({
                date: `${hour}:${minutes}`,
                value: actualFee,
                transactions: queueState,
                details: {
                    baseFee,
                    loadFactor: currentLoadFactor,
                    queueThreshold,
                    escalatedFee: actualFee > baseFee,
                    networkLoad: peakLoadMultiplier,
                }
            })
        }
        
        return data
    },

    getTransactionHistory() {
        return [
            {
                hash: "F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF",
                type: "Payment",
                date: "2024-03-20T15:30:00Z",
                amount: "1,234.56",
                description: "Payment transaction to rGFuMiw48HdbnrUbkRYuitXTmfrDBNTCnX"
            },
            {
                hash: "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0",
                type: "TrustSet",
                date: "2024-03-20T15:28:45Z",
                amount: "500.00",
                description: "Trust line established with issuer rXYZ..."
            },
            {
                hash: "1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF",
                type: "OfferCreate",
                date: "2024-03-20T15:25:12Z",
                amount: "789.12",
                description: "Offer created: XRP/USD"
            },
            {
                hash: "FEDCBA0987654321FEDCBA0987654321FEDCBA0987654321FEDCBA0987654321",
                type: "OfferCancel",
                date: "2024-03-20T15:20:00Z",
                amount: "0.00",
                description: "Cancelled offer #123456"
            },
            {
                hash: "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF",
                type: "Payment",
                date: "2024-03-20T15:15:30Z",
                amount: "2,500.00",
                description: "Payment transaction from rABC..."
            },
            {
                hash: "ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789",
                type: "EscrowCreate",
                date: "2024-03-20T15:10:00Z",
                amount: "10,000.00",
                description: "Escrow created with finish time 2024-03-21"
            },
            {
                hash: "9876543210ABCDEF9876543210ABCDEF9876543210ABCDEF9876543210ABCDEF",
                type: "Payment",
                date: "2024-03-20T15:05:00Z",
                amount: "450.75",
                description: "Payment transaction to rDEF..."
            },
            {
                hash: "FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210",
                type: "NFTokenMint",
                date: "2024-03-20T15:00:00Z",
                amount: "50.00",
                description: "NFT minted: TokenID #98765"
            }
        ];
    },

    getNFTBuyOffers() {
        return [
            {
                hash: "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0",
                type: "NFT Offer",
                date: "2024-03-20T16:30:00Z",
                amount: "5,000.00",
                description: "Offer for XRPL Punks #1234"
            },
            {
                hash: "B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1",
                type: "NFT Offer",
                date: "2024-03-20T16:25:00Z",
                amount: "2,500.00",
                description: "Bid for XRP Dogs Collection #789"
            },
            {
                hash: "C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2",
                type: "NFT Offer",
                date: "2024-03-20T16:20:00Z",
                amount: "10,000.00",
                description: "Offer for Rare XRPL Land Plot #456"
            },
            {
                hash: "D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3",
                type: "NFT Offer",
                date: "2024-03-20T16:15:00Z",
                amount: "1,500.00",
                description: "Bid for XRP Artists Series #234"
            },
            {
                hash: "E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4",
                type: "NFT Offer",
                date: "2024-03-20T16:10:00Z",
                amount: "7,500.00",
                description: "Offer for XRPL Genesis #567"
            },
            {
                hash: "F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5",
                type: "NFT Offer",
                date: "2024-03-20T16:05:00Z",
                amount: "3,000.00",
                description: "Bid for XRP Legends #890"
            },
            {
                hash: "G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6",
                type: "NFT Offer",
                date: "2024-03-20T16:00:00Z",
                amount: "15,000.00",
                description: "Offer for XRPL Rare Collection #123"
            },
            {
                hash: "H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7",
                type: "NFT Offer",
                date: "2024-03-20T15:55:00Z",
                amount: "4,500.00",
                description: "Bid for XRP Art Series #345"
            }
        ];
    },

    getNFTSellOffers() {
        return [
            {
                hash: "J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H3I4J5K6L7",
                type: "NFT Sale",
                date: "2024-03-20T16:45:00Z",
                amount: "8,500.00",
                description: "Selling XRPL Punks #5678 - Ultra Rare"
            },
            {
                hash: "K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9",
                type: "NFT Sale",
                date: "2024-03-20T16:40:00Z",
                amount: "3,200.00",
                description: "Selling XRP Metaverse Plot #432"
            },
            {
                hash: "L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0",
                type: "NFT Sale",
                date: "2024-03-20T16:35:00Z",
                amount: "12,000.00",
                description: "Selling XRPL Genesis Card #789 - Limited Edition"
            },
            {
                hash: "M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0P1",
                type: "NFT Sale",
                date: "2024-03-20T16:30:00Z",
                amount: "2,800.00",
                description: "Selling XRP Collectible #567"
            },
            {
                hash: "N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0P1Q2",
                type: "NFT Sale",
                date: "2024-03-20T16:25:00Z",
                amount: "6,500.00",
                description: "Selling XRPL Artists Series #321 - Animated"
            },
            {
                hash: "O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0P1Q2R3",
                type: "NFT Sale",
                date: "2024-03-20T16:20:00Z",
                amount: "4,700.00",
                description: "Selling XRP Gaming Asset #098"
            },
            {
                hash: "P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0P1Q2R3S4",
                type: "NFT Sale",
                date: "2024-03-20T16:15:00Z",
                amount: "15,500.00",
                description: "Selling XRPL Founders Collection #234"
            },
            {
                hash: "Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0P1Q2R3S4T5",
                type: "NFT Sale",
                date: "2024-03-20T16:10:00Z",
                amount: "5,900.00",
                description: "Selling XRP Digital Art #876"
            }
        ];
    }
}

export default xrplService
