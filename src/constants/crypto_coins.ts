export const crypto_coins = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  LTC: "Litecoin",
  MATIC: "Polygon",
  XRP: "Ripple",
  USDC: "USD Coin"
} as const

export type CryptoCoin = keyof typeof crypto_coins
export type CryptoCoinLabel = (typeof crypto_coins)[keyof typeof crypto_coins]
