import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import * as Clipboard from "expo-clipboard"
import { CopyIcon, TimerIcon } from "lucide-react-native"
import { useCallback, useState } from "react"
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
import { FullScreenLoading, Screen } from "@/components/generic"
import { AXIOS_BASE_CONFIG, USE_MOCKED__ORDER_INFO } from "@/config"
import { BASE_API_URL, colors } from "@/constants"
import { MOCKED_CURRENCY_IMAGE_URL, MOCKED_ORDER_INFO } from "@/mocked_data"
import { usePaymentStore } from "@/store"

const MakePayment = () => {
  const { payment } = usePaymentStore()

  const { isPending, isError, data, error } = useQuery({
    enabled: !USE_MOCKED__ORDER_INFO, // NOTE: use mocked data to not get 429 for server overload
    queryKey: ["getOrderInfo"],
    initialData: USE_MOCKED__ORDER_INFO ? MOCKED_ORDER_INFO : undefined,
    queryFn: () =>
      axios
        .get(
          `${BASE_API_URL}/orders/info/${payment.identifier}`,
          AXIOS_BASE_CONFIG
        )
        .then((res) => res.data)
  })

  // ─────────────────────────────────────────────────────────────────────

  const [orderSummaryViewedOnce, setOrderSummaryViewedOnce] = useState(false)
  const [showQrTab, setShowQrTab] = useState(true)

  // ─────────────────────────────────────────────────────────────────────

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text)
    Toast.show({
      type: "success",
      text2: "El texto fue copiado al portapapeles! ✅"
    })
  }

  const getOrderInfo = useCallback(
    () => ({
      fiat_amount: data[0]?.fiat_amount,
      fiat: data[0]?.fiat,
      currency_id: data[0]?.currency_id,
      merchant_device: data[0]?.merchant_device,
      created_at: data[0]?.created_at,
      notes: data[0]?.notes,
      currency_image_url: USE_MOCKED__ORDER_INFO
        ? MOCKED_CURRENCY_IMAGE_URL
        : payment.image
    }),
    [data, payment.image]
  )

  // ─────────────────────────────────────────────────────────────────────

  if (isPending)
    return (
      <View className="p-10">
        <FullScreenLoading />
      </View>
    )
  if (isError)
    return (
      <View className="p-10">
        <Text>{`ERROR: an error occurred while trying to get the order info\n\n${error.message}`}</Text>
      </View>
    )
  if (!data || data.length === 0)
    return (
      <View className="p-10">
        <Text>ERROR: No order info found</Text>
      </View>
    )

  return (
    <Screen>
      <ScrollView>
        <OrderSummary
          {...{ orderSummaryViewedOnce, setOrderSummaryViewedOnce }}
          orderInfo={getOrderInfo()}
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
