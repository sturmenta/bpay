import { Link } from "expo-router"
import { useEffect } from "react"
import { Text, View } from "react-native"

import { Screen } from "@/components/generic"
import { usePaymentStore } from "@/store"

const MakePayment = () => {
  const { payment } = usePaymentStore()

  useEffect(() => {
    console.log(`payment`, payment)
  }, [payment])

  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text className="mb-5">Make payment screen</Text>
        <Link href="/payment_feedback">Go to - Payment feedback screen</Link>
      </View>
    </Screen>
  )
}

export default MakePayment
