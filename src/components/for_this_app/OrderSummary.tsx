import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react-native"
import { Dispatch, SetStateAction, useState } from "react"
import { Text, View } from "react-native"
import { ExpandableSection } from "react-native-ui-lib"

import { Payment_Interface } from "@/store"
import { getCoinSvg } from "@/utils"

import { C_Button } from "../generic"

import { C_Card } from "./C_Card"

export const OrderSummary = ({
  orderSummaryViewedOnce,
  setOrderSummaryViewedOnce,
  payment
}: {
  orderSummaryViewedOnce: boolean
  setOrderSummaryViewedOnce: Dispatch<SetStateAction<boolean>>
  payment: Payment_Interface
}) => {
  const [orderSummaryCollapsed, setOrderSummaryCollapsed] = useState(false)

  const CoinSvg = getCoinSvg(payment!.coin)

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
          <Text className="font-bold">{payment?.amount} EUR</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Moneda seleccionada:</Text>
          <CoinSvg height={18} width={18} className="mr-2" />
          <Text className="font-medium">{payment?.coin}</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Comercio:</Text>
          <BadgeCheckIcon size={18} className="mr-1 text-cyan-500" />
          <Text>Comercio de pruebas de Semega</Text>
        </Row>
        <Row>
          <Text className="flex-1 font-medium">Fecha:</Text>
          <Text>21/01/2022 08:52</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex-1 font-medium">Concepto:</Text>
          <Text>{payment?.description}</Text>
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
