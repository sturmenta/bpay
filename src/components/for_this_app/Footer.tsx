import { Text, View } from "react-native"

export const Footer = () => {
  return (
    <View className="flex-1 justify-end">
      <Text className="mb-2 text-center text-xs text-gray-400">
        Technical challenge done by @sturmenta
      </Text>
      <Text className="text-center text-xs text-gray-400">
        Powered by Bitnovo. | © 2024 Bitnovo. All rights reserved.
      </Text>
    </View>
  )
}
