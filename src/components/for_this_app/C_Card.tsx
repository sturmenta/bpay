import { View } from "react-native"

export const C_Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="m-4 rounded-lg bg-white p-5 shadow-md">{children}</View>
  )
}
