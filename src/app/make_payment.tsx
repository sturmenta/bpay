import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import * as Clipboard from "expo-clipboard"
import { useRouter } from "expo-router"
import { CopyIcon, TimerIcon } from "lucide-react-native"
import { useCallback, useEffect, useState } from "react"
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
import {
  C_Card,
  Footer,
  ListenPaymentStatus,
  OrderSummary
} from "@/components/for_this_app"
import {
  FullScreenLoading,
  FullScreenText,
  RemainingTime,
  Screen
} from "@/components/generic"
import {
  AXIOS_BASE_CONFIG,
  MetamaskSdk,
  USE_MOCKED__ORDER_INFO
} from "@/config"
import { BASE_API_URL, colors } from "@/constants"
import { MOCKED_CURRENCY_IMAGE_URL, MOCKED_ORDER_INFO } from "@/mocked_data"
import { usePaymentOutcomeStore, usePaymentStore } from "@/store"

const MakePayment = () => {
  const router = useRouter()
  const { payment } = usePaymentStore()
  const { paymentOutcome } = usePaymentOutcomeStore()

  const {
    isPending,
    isError,
    data: orderInfo,
    error
  }: {
    data: OrderInfo
    isPending: boolean
    isError: boolean
    error: Error | null
  } = useQuery({
    enabled: !USE_MOCKED__ORDER_INFO, // NOTE: use mocked data to not get 429 for server overload
    queryKey: ["getOrderInfo"],
    initialData: USE_MOCKED__ORDER_INFO ? MOCKED_ORDER_INFO : undefined,
    queryFn: () =>
      axios
        .get(
          `${BASE_API_URL}/orders/info/${payment.identifier}`,
          AXIOS_BASE_CONFIG
        )
        .then((res) => res.data[0]) // NOTE: get the first order of the array
  })

  // ─────────────────────────────────────────────────────────────────────

  const [orderSummaryViewedOnce, setOrderSummaryViewedOnce] = useState(false)
  const [showQrTab, setShowQrTab] = useState(true)

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (paymentOutcome) router.push("/payment_outcome")
  }, [paymentOutcome])

  // ─────────────────────────────────────────────────────────────────────

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text)
    Toast.show({
      type: "success",
      text2: "El texto fue copiado al portapapeles! ✅"
    })
  }

  const hasOrderInfoRequiredValues = () => {
    if (!orderInfo) return false
    if (!orderInfo.crypto_amount) return false
    if (!orderInfo.expired_time) return false
    if (!orderInfo.address) return false
    return true
  }

  const onPressMetamask = useCallback(async () => {
    await MetamaskSdk.connect()
    const ethereum = MetamaskSdk.getProvider()

    const accounts = await ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.")
        } else {
          console.error(err)
        }
      })

    const account = (accounts as any)[0]

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: account, // The user's active address.
          to: orderInfo.address, // Required except during contract publications.
          value: Number(orderInfo.crypto_amount! * 1e18).toString(16), // Only required to send ether to the recipient from the initiating external account.
          gasLimit: "0x5028", // Customizable by the user during MetaMask confirmation.
          maxPriorityFeePerGas: "0x3b9aca00", // Customizable by the user during MetaMask confirmation.
          maxFeePerGas: "0x2540be400" // Customizable by the user during MetaMask confirmation.
        }
      ]
    })
  }, [orderInfo])

  // ─────────────────────────────────────────────────────────────────────

  if (isPending) return <FullScreenLoading />
  if (isError)
    return (
      <FullScreenText
        text={`ERROR: an error occurred while trying to get the order info\n\n${error?.message}`}
      />
    )
  if (!orderInfo) return <FullScreenText text="ERROR: No order info found" />
  if (!hasOrderInfoRequiredValues())
    return <FullScreenText text="ERROR: No orderInfo required values found" />

  return (
    <Screen>
      <ListenPaymentStatus
        paymentIdentifier={payment.identifier}
        paymentExpiredTime={orderInfo.expired_time!}
      />
      <ScrollView>
        <OrderSummary
          {...{ orderSummaryViewedOnce, setOrderSummaryViewedOnce }}
          orderInfo={orderInfo}
          currencyImageUrl={
            USE_MOCKED__ORDER_INFO ? MOCKED_CURRENCY_IMAGE_URL : payment.image
          }
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
                  <Text className="mt-0.5 text-xs">
                    <RemainingTime expired_time={orderInfo.expired_time!} />
                  </Text>
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
                        <QRCode value={orderInfo.address!} />
                      </C_Card>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={onPressMetamask}
                      className="my-5 h-40 w-40 items-center justify-center rounded-lg border border-gray-200 p-5">
                      <Image
                        source={image_metamask}
                        style={{ transform: [{ scale: 0.4 }] }}
                      />
                    </TouchableOpacity>
                  )}
                  <View className="flex-row space-x-1">
                    <Text>Enviar</Text>
                    <Text className="mr-1 font-medium">
                      {orderInfo.crypto_amount} {orderInfo.currency_id}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        copyToClipboard(orderInfo.crypto_amount!.toString())
                      }>
                      <CopyIcon size={15} color="#2e65dd" />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row space-x-2">
                    <Text className="text-center text-xs">
                      {orderInfo.address}
                    </Text>
                    <TouchableOpacity
                      onPress={() => copyToClipboard(orderInfo.address!)}>
                      <CopyIcon size={15} color="#2e65dd" />
                    </TouchableOpacity>
                  </View>
                  {orderInfo.tag_memo && (
                    <View className="flex-row space-x-2">
                      <View className="h-4 w-4 items-center justify-center rounded-full bg-yellow-400">
                        <Text className="text-xs font-medium">i</Text>
                      </View>
                      <Text className="text-center text-xs">
                        Etiqueta de destino: {orderInfo.tag_memo}
                      </Text>
                      <TouchableOpacity
                        onPress={() => copyToClipboard(orderInfo.tag_memo!)}>
                        <CopyIcon size={15} color="#2e65dd" />
                      </TouchableOpacity>
                    </View>
                  )}
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
