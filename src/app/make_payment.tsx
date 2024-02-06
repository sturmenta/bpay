import { Link } from "expo-router"
import { Text, View } from "react-native"

import { Screen } from "@/components/generic"

const MakePayment = () => {
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
