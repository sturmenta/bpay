import { Link } from "expo-router"
import { Text, View } from "react-native"

import { Screen } from "@/components/generic"

const PaymentFeedback = () => {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text className="mb-5">Payment feedback screen</Text>
        <Link href="/config_payment">Back to - Config payment screen</Link>
      </View>
    </Screen>
  )
}

export default PaymentFeedback
