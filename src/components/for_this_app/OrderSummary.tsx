import dayjs from "dayjs"
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react-native"
import { Dispatch, SetStateAction, useState } from "react"
import { Image, Text, View } from "react-native"
import { ExpandableSection } from "react-native-ui-lib"

import { C_Button } from "../generic"

import { C_Card } from "./C_Card"

export const OrderSummary = ({
  orderSummaryViewedOnce,
  setOrderSummaryViewedOnce,
  orderInfo
}: {
  orderSummaryViewedOnce: boolean
  setOrderSummaryViewedOnce: Dispatch<SetStateAction<boolean>>
  orderInfo: {
    fiat_amount: number
    fiat: string
    currency_id: string
    merchant_device: string
    created_at: string
    notes: string
    currency_image_url: string
  }
}) => {
  const [orderSummaryCollapsed, setOrderSummaryCollapsed] = useState(false)

  return (
    <ExpandableSection
      expanded={!orderSummaryCollapsed}
      sectionHeader={
        <View className="m-4 mb-0 flex-row items-center justify-center pr-2">
          <Text className="flex-1 text-lg font-medium">Resumen del pedido</Text>
          {orderSummaryViewedOnce &&
            (orderSummaryCollapsed ? (
              <ChevronDownIcon size={22} color="#222" />
            ) : (
              <ChevronUpIcon size={22} color="#222" />
            ))}
        </View>
      }
      onPress={() => setOrderSummaryCollapsed(!orderSummaryCollapsed)}>
      <C_Card>
        <Row>
          <Text className="flex-1 font-medium">Importe:</Text>
          <Text className="font-bold">
            {orderInfo.fiat_amount} {orderInfo.fiat}
          </Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Moneda seleccionada:</Text>
          <Image
            source={{ uri: orderInfo.currency_image_url }}
            height={20}
            width={20}
            className="mr-2"
          />
          <Text className="font-medium">{orderInfo.currency_id}</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Comercio:</Text>
          <BadgeCheckIcon size={18} className="mr-1 text-cyan-500" />
          <Text>{orderInfo.merchant_device}</Text>
        </Row>
        <Row>
          <Text className="flex-1 font-medium">Fecha:</Text>

          <Text>{dayjs(orderInfo.created_at).format("DD/MM/YYYY HH:mm")}</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Concepto:</Text>
          <Text>{orderInfo.notes}</Text>
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
