import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"

export const Screen = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "white" }}>
      <StatusBar style="dark" />
      {children}
    </SafeAreaView>
  )
}
