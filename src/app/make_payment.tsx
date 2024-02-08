import { TimerIcon } from "lucide-react-native"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { C_Card, Footer, OrderSummary } from "@/components/for_this_app"
import { Screen } from "@/components/generic"
import { usePaymentStore } from "@/store"

const MakePayment = () => {
  const [orderSummaryViewedOnce, setOrderSummaryViewedOnce] = useState(false)
  const [showQrTab, setShowQrTab] = useState(true)

  const { payment } = usePaymentStore()
  if (!payment) return null

  return (
    <Screen>
      <OrderSummary
        {...{ orderSummaryViewedOnce, setOrderSummaryViewedOnce, payment }}
      />
      {orderSummaryViewedOnce && (
        <>
          <View className="mb-2 mt-5 px-5">
            <Spacer />
          </View>
          <View className="m-4 mb-0 flex-row items-center justify-center">
            <Text className="flex-1 text-lg font-medium">Realiza el pago</Text>
          </View>
          <C_Card>
            <View className="items-center">
              <View className="flex-row items-center">
                <TimerIcon size={20} color="#333" />
                <Text className="ml-1 mt-0.5 text-xs">05:08</Text>
              </View>

              <View className="flex-row p-4">
                <SmallButton
                  selected={showQrTab}
                  onPress={() => setShowQrTab(true)}
                  title="Smart QR"
                />
                <View className="w-4" />
                <SmallButton
                  selected={!showQrTab}
                  onPress={() => setShowQrTab(false)}
                  title="Web3"
                />
              </View>

              {showQrTab ? <Text>QR</Text> : <Text>Web3</Text>}
            </View>
          </C_Card>
        </>
      )}
      {/*  */}
      <Footer />
    </Screen>
  )
}

export default MakePayment

// ─────────────────────────────────────────────────────────────────────────────

const Spacer = () => <View className="my-2 border-t border-gray-200" />

const SmallButton = ({
  title,
  selected,
  onPress
}: {
  title: string
  selected?: boolean
  onPress: () => void
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`rounded-full ${selected ? "bg-blue-500" : "bg-gray-100"} p-2 px-3`}>
    <Text
      className={`text-xs font-medium ${selected ? "text-white" : "text-gray-600"}`}>
      {title}
    </Text>
  </TouchableOpacity>
)
