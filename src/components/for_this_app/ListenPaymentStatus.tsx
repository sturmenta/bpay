import { useEffect } from "react"

import { useListenPayment } from "@/hooks"
import { usePaymentOutcomeStore } from "@/store"

// this component is for use the "useListenPayment" hook dynamically and comply with the rules of hooks
// - render after getting the expired_time

export const ListenPaymentStatus = ({
  paymentIdentifier,
  paymentExpiredTime
}: {
  paymentIdentifier: string
  paymentExpiredTime: string
}) => {
  const { setPaymentOutcome } = usePaymentOutcomeStore()

  const { paymentStatus } = useListenPayment({
    identifier: paymentIdentifier,
    expired_time: paymentExpiredTime
  })

  useEffect(() => {
    if (paymentStatus)
      setPaymentOutcome({ success: paymentStatus === "success" })
  }, [paymentStatus])

  return null
}
