import { ActivityIndicator, View } from "react-native"

import { colors } from "@/constants"

export const FullScreenLoading = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <ActivityIndicator color={colors.bitnovo} size="large" />
  </View>
)
