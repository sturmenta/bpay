// types created from docs https://payments.pre-bnvo.com/redoc

declare type FiatType =
  | "EUR"
  | "USD"
  | "GBP"
  | "ARS"
  | "AUD"
  | "BGN"
  | "BOB"
  | "BRL"
  | "CAD"
  | "CHF"
  | "CLP"
  | "COP"
  | "DKK"
  | "DOP"
  | "GEL"
  | "HUF"
  | "ISK"
  | "JPY"
  | "KRW"
  | "MXN"
  | "NOK"
  | "NZD"
  | "PEN"
  | "PLN"
  | "PYG"
  | "RON"
  | "SEK"
  | "SGD"
  | "SVC"
  | "UYU"

declare type CreateOrderResponse = {
  identifier: string
  reference: string | null
  payment_uri: string | null
  web_url: string
  address: string | null
  tag_memo: string | null
  input_currency: string | null
  expected_input_amount: number | null
  rate: number | null
  notes: string
  fiat: FiatType
  language: string
}

declare type OrderInfo_Status =
  | "NR"
  | "PE"
  | "AC"
  | "IA"
  | "CO"
  | "CA"
  | "EX"
  | "OC"
  | "RF"
  | "FA"
  | "DE"

declare type OrderInfo_Transaction = {
  confirmed: boolean
  currency: string
  amount: number
  tx_hash: string
  block: number
  created_at: string
}

declare type OrderInfo = {
  identifier: string
  reference: string | null
  created_at: string
  edited_at: string
  status: OrderInfo_Status
  fiat_amount: number
  crypto_amount: number | null
  unconfirmed_amount: number
  confirmed_amount: number
  currency_id: string
  merchant_device_id: number
  merchant_device: string
  address: string | null
  tag_memo: string | null
  url_ko: string | null
  url_ok: string | null
  url_standby: string | null
  expired_time: string | null
  good_fee: boolean
  notes: string
  rbf: boolean
  safe: boolean
  fiat: FiatType
  language: string
  percentage: number
  received_amount: number
  balance_based: string
  internal_data: string | null
  transactions: OrderInfo_Transaction[]
}

// ─────────────────────────────────────────────────────────────────────────────

// custom type
declare type Currency = {
  symbol: string
  name: string
  min_amount: string
  max_amount: string
  image: string
}
