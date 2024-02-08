import * as Clipboard from "expo-clipboard"
import { CopyIcon, TimerIcon } from "lucide-react-native"
import { useState } from "react"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"
import QRCode from "react-native-qrcode-svg"
import Toast from "react-native-toast-message"

import { C_Card, Footer, OrderSummary } from "@/components/for_this_app"
import { Screen } from "@/components/generic"
import { usePaymentStore } from "@/store"

const MakePayment = () => {
  const [orderSummaryViewedOnce, setOrderSummaryViewedOnce] = useState(false)
  const [showQrTab, setShowQrTab] = useState(true)

  const { payment } = usePaymentStore()
  if (!payment) return null

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text)
    Toast.show({
      type: "success",
      text2: "El texto fue copiado al portapapeles! ✅",
      text2Style: { color: "#222", fontSize: 12 }
    })
  }

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
            <View className="items-center py-2">
              <View className="flex-row items-center space-x-1">
                <TimerIcon size={20} color="#333" />
                <Text className="mt-0.5 text-xs">05:08</Text>
              </View>

              <View className="flex-row space-x-2 p-4">
                <SmallButton
                  selected={showQrTab}
                  onPress={() => setShowQrTab(true)}
                  title="Smart QR"
                />
                <SmallButton
                  selected={!showQrTab}
                  onPress={() => setShowQrTab(false)}
                  title="Web3"
                />
              </View>

              {showQrTab ? (
                <View className="items-center space-y-4 px-8">
                  <C_Card>
                    <QRCode value="http://awesome.link.qr" />
                  </C_Card>
                  <View className="flex-row space-x-1">
                    <Text>Enviar</Text>
                    <Text className="mr-1 font-medium">108,02 XRP</Text>
                    <TouchableOpacity
                      onPress={() => copyToClipboard("108,02 XRP")}>
                      <CopyIcon size={15} />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row space-x-2">
                    <Text className="text-center text-xs">
                      Xp4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        copyToClipboard(
                          "Xp4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L"
                        )
                      }>
                      <CopyIcon size={15} />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row space-x-2">
                    <View className="h-4 w-4 items-center justify-center rounded-full bg-yellow-400">
                      <Text className="text-xs font-medium">i</Text>
                    </View>
                    <Text className="text-center text-xs">
                      Etiqueta de destino: 2557164061
                    </Text>
                    <TouchableOpacity
                      onPress={() => copyToClipboard("2557164061")}>
                      <CopyIcon size={15} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text>Web3</Text>
              )}
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
  onPress,
  ...props
}: {
  title: string
  selected?: boolean
  onPress: () => void
  props?: TouchableOpacityProps
}) => (
  <TouchableOpacity
    {...props}
    onPress={onPress}
    className={`rounded-full ${selected ? "bg-blue-800" : "bg-gray-100"} p-1 px-3`}>
    <Text
      className={`text-sm font-medium ${selected ? "text-white" : "text-gray-600"}`}>
      {title}
    </Text>
  </TouchableOpacity>
)
