export const BASE_API_URL = "https://payments.pre-bnvo.com/api/v1"
export const WEBSOCKET_URL = (identifier: string) =>
  `wss://payments.pre-bnvo.com/ws/${identifier}`
