import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import dayjs from "dayjs"
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react-native"
import { Dispatch, SetStateAction, useState } from "react"
import { Image, Text, View } from "react-native"
import { ExpandableSection } from "react-native-ui-lib"

import { AXIOS_BASE_CONFIG, USE_MOCKED__ORDER_INFO } from "@/config"
import { BASE_API_URL } from "@/constants"
import { MOCKED_CURRENCY_IMAGE_URL, MOCKED_ORDER_INFO } from "@/mocked_data"
import { usePaymentStore } from "@/store"

import { C_Button, FullScreenLoading } from "../generic"

import { C_Card } from "./C_Card"

export const OrderSummary = ({
  orderSummaryViewedOnce,
  setOrderSummaryViewedOnce
}: {
  orderSummaryViewedOnce: boolean
  setOrderSummaryViewedOnce: Dispatch<SetStateAction<boolean>>
}) => {
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

  const [orderSummaryCollapsed, setOrderSummaryCollapsed] = useState(false)

  // ─────────────────────────────────────────────────────────────────────────────

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
    <ExpandableSection
      expanded={!orderSummaryCollapsed}
      sectionHeader={
        <View className="m-4 mb-0 flex-row items-center justify-center">
          <Text className="flex-1 text-lg font-medium">Resumen del pedido</Text>
          {orderSummaryViewedOnce &&
            (orderSummaryCollapsed ? (
              <ChevronDownIcon size={20} color="#ccc" />
            ) : (
              <ChevronUpIcon size={20} color="#ccc" />
            ))}
        </View>
      }
      onPress={() => setOrderSummaryCollapsed(!orderSummaryCollapsed)}>
      <C_Card>
        <Row>
          <Text className="flex-1 font-medium">Importe:</Text>
          <Text className="font-bold">
            {data[0]?.fiat_amount} {data[0]?.fiat}
          </Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Moneda seleccionada:</Text>
          <Image
            source={{
              uri: USE_MOCKED__ORDER_INFO
                ? MOCKED_CURRENCY_IMAGE_URL
                : payment.image
            }}
            height={20}
            width={20}
            className="mr-2"
          />
          <Text className="font-medium">{data[0]?.currency_id}</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Comercio:</Text>
          <BadgeCheckIcon size={18} className="mr-1 text-cyan-500" />
          <Text>{data[0]?.merchant_device}</Text>
        </Row>
        <Row>
          <Text className="flex-1 font-medium">Fecha:</Text>

          <Text>{dayjs(data[0]?.created_at).format("DD/MM/YYYY HH:mm")}</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Concepto:</Text>
          <Text>{data[0]?.notes}</Text>
        </Row>
        {/*  */}
        <View className="h-5" />
        {/*  */}
        {!orderSummaryViewedOnce && (
          <C_Button
            title="Continuar"
            onPress={() => {
              setOrderSummaryViewedOnce(true)
              setOrderSummaryCollapsed(true)
            }}
          />
        )}
      </C_Card>
    </ExpandableSection>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const Row = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-row items-center px-2 py-3">{children}</View>
)

const Spacer = () => <View className="my-2 border-t border-gray-200" />
