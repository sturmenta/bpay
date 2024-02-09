import { CourierPrime_400Regular } from "@expo-google-fonts/courier-prime"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { FullScreenLoading } from "@/components/generic"
import { Root_Toast, toastConfig } from "@/config"

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router"

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({ Courier: CourierPrime_400Regular })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return <FullScreenLoading />

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <Root_Toast config={toastConfig} />
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
