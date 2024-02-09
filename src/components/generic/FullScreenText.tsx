import { Text, View } from "react-native"

export const FullScreenText = ({ text }: { text: string }) => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-2xl text-black">{text}</Text>
  </View>
)
