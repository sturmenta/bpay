import { Link } from "expo-router"
import { Text, View } from "react-native"

import { Screen } from "@/components/generic"

const ConfigPayment = () => {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text className="mb-5">Config payment screen</Text>
        <Link href="/make_payment">Go to - Make payment screen</Link>
      </View>
    </Screen>
  )
}

export default ConfigPayment
