import {
  Svg_Bitcoin,
  Svg_Ethereum,
  Svg_Litecoin,
  Svg_Polygon,
  Svg_Ripple,
  Svg_Usdc
} from "@/assets/crypto_coins"
import { CryptoCoin } from "@/constants"

export const getCoinSvg = (coin: CryptoCoin) => {
  switch (coin) {
    case "BTC":
      return Svg_Bitcoin
    case "ETH":
      return Svg_Ethereum
    case "LTC":
      return Svg_Litecoin
    case "MATIC":
      return Svg_Polygon
    case "XRP":
      return Svg_Ripple
    case "USDC":
      return Svg_Usdc
    default:
      return Svg_Bitcoin
  }
}
