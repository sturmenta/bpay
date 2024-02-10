import * as Clipboard from "expo-clipboard"
// import { useRouter } from "expo-router"
import { CopyIcon, TimerIcon } from "lucide-react-native"
import { useState } from "react"
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import QRCode from "react-native-qrcode-svg"
import Toast from "react-native-toast-message"

import { image_metamask } from "@/assets/images"
import { C_Card, Footer, OrderSummary } from "@/components/for_this_app"
import {
  FullScreenText,
  Screen
  // C_Button,
} from "@/components/generic"
import { colors } from "@/constants"
import {
  // usePaymentOutcomeStore,
  usePaymentStore
} from "@/store"

const MakePayment = () => {
  // const router = useRouter()
  const { payment } = usePaymentStore()
  // const { setPaymentOutcome } = usePaymentOutcomeStore()

  const [orderSummaryViewedOnce, setOrderSummaryViewedOnce] = useState(false)
  const [showQrTab, setShowQrTab] = useState(true)

  if (!payment) return <FullScreenText text="ERROR: No payment data" />

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text)
    Toast.show({
      type: "success",
      text2: "El texto fue copiado al portapapeles! ✅"
    })
  }

  // const onSuccess = () => {
  //   setPaymentOutcome({ success: true })
  //   router.push("/payment_outcome")
  // }

  // const onError = () => {
  //   setPaymentOutcome({ success: false })
  //   router.push("/payment_outcome")
  // }

  return (
    <Screen>
      <ScrollView>
        <OrderSummary
          {...{ orderSummaryViewedOnce, setOrderSummaryViewedOnce, payment }}
        />
        {orderSummaryViewedOnce && (
          <>
            <View className="mb-2 mt-5 px-5">
              <Spacer />
            </View>
            <View className="m-4 mb-0 flex-row items-center justify-center">
              <Text className="flex-1 text-lg font-medium">
                Realiza el pago
              </Text>
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

                <View className="items-center space-y-4 px-8">
                  {showQrTab ? (
                    <View className="my-5 h-40 w-40 items-center justify-center p-5">
                      <C_Card>
                        <QRCode value="http://awesome.link.qr" />
                      </C_Card>
                    </View>
                  ) : (
                    <View className="my-5 h-40 w-40 items-center justify-center rounded-lg border border-gray-200 p-5">
                      <Image
                        source={image_metamask}
                        style={{ transform: [{ scale: 0.4 }] }}
                      />
                    </View>
                  )}
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
              </View>
            </C_Card>
          </>
        )}
        {/*  */}
        {/* <View className="p-10">
          <C_Button
            title="Go to payment outcome - success"
            onPress={onSuccess}
          />
          <View className="h-5" />
          <C_Button title="Go to payment outcome - error" onPress={onError} />
        </View> */}
      </ScrollView>
      {/*  */}
      <Footer noFlex1 />
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
    className={`rounded-full ${selected ? colors.bitnovo_tailwind : "bg-gray-100"} p-1 px-3`}>
    <Text
      className={`text-sm font-medium ${selected ? "text-white" : "text-gray-600"}`}>
      {title}
    </Text>
  </TouchableOpacity>
)
