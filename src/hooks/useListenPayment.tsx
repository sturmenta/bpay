import { useEffect, useState } from "react"

import { WEBSOCKET_URL } from "@/constants"

import { TIME_TO_SHOW_WHEN_EXPIRED, useRemainingTime } from "./useRemainingTime"

export const useListenPayment = ({
  identifier,
  expired_time
}: {
  identifier: string
  expired_time: string
}) => {
  const { remainingTime } = useRemainingTime({ expired_time })

  const [paymentStatus, setPaymentStatus] = useState<"success" | "error" | "">(
    ""
  )

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL(identifier))

    ws.onopen = () => {
      console.log("useListenPayment - onopen")
    }

    ws.onmessage = (e) => {
      console.log("useListenPayment - onmessage.data", e.data)
      const orderInfo: OrderInfo = JSON.parse(e.data)

      // if the order_info.status is equal to "CO" or "AC" -> return status=success
      if (orderInfo.status === "CO" || orderInfo.status === "AC") {
        setPaymentStatus("success")
      }

      // if the order_info.status is equal to "EX" or "OC" -> return status=error
      if (orderInfo.status === "EX" || orderInfo.status === "OC") {
        setPaymentStatus("error")
      }
    }

    ws.onerror = (e) => {
      console.log(
        "useListenPayment - onerror.message",
        (e as WebSocketErrorEvent).message
      )
    }

    ws.onclose = (e) => {
      console.log(
        "useListenPayment - onclose.code",
        e.code,
        "onclose.reason",
        e.reason
      )
    }

    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    // when the payment is expired -> return paymentStatus: "error"
    if (remainingTime === TIME_TO_SHOW_WHEN_EXPIRED) setPaymentStatus("error")
  }, [remainingTime])

  return { paymentStatus }
}
