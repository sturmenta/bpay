import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"

export const Screen = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      {children}
    </SafeAreaView>
  )
}
