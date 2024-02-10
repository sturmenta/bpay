declare type Currency = {
  symbol: string
  name: string
  min_amount: string
  max_amount: string
  image: string
}

declare type FiatType = [
  "EUR",
  "USD",
  "GBP",
  "ARS",
  "AUD",
  "BGN",
  "BOB",
  "BRL",
  "CAD",
  "CHF",
  "CLP",
  "COP",
  "DKK",
  "DOP",
  "GEL",
  "HUF",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "NOK",
  "NZD",
  "PEN",
  "PLN",
  "PYG",
  "RON",
  "SEK",
  "SGD",
  "SVC",
  "UYU"
]

// https://payments.pre-bnvo.com/redoc/#operation/orders_create
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
