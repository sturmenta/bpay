import { Platform, View } from "react-native"

export const C_Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      className={`m-4 rounded-lg bg-white p-5 ${Platform.OS === "android" ? "shadow-xl shadow-black/40" : "shadow-md"}`}>
      {children}
    </View>
  )
}
