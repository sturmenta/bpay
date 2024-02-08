import { CourierPrime_400Regular } from "@expo-google-fonts/courier-prime"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { Root_Toast, toastConfig } from "@/config/toast_config"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({ Courier: CourierPrime_400Regular })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
      <Root_Toast config={toastConfig} />
    </>
  )
}
