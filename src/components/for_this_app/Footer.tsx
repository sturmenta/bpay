import { Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const Footer = ({ noFlex1 }: { noFlex1?: boolean }) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      className={`${noFlex1 ? "" : "flex-1"} justify-end pt-4 ${insets.bottom < 10 ? "pb-5" : ""}`}>
      <Text className="mb-2 text-center text-xs text-gray-400">
        Technical challenge done by @sturmenta
      </Text>
      <Text className="text-center text-xs text-gray-400">
        Powered by Bitnovo. | © 2024 Bitnovo. All rights reserved.
      </Text>
    </View>
  )
}
