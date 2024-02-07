import { BadgeCheckIcon } from "lucide-react-native"
import { Text, View } from "react-native"

import { C_Card, Footer } from "@/components/for_this_app"
import { C_Button, Screen } from "@/components/generic"
import { usePaymentStore } from "@/store"
import { getCoinSvg } from "@/utils"

const MakePayment = () => {
  const { payment } = usePaymentStore()

  const CoinSvg = getCoinSvg(payment!.coin)

  return (
    <Screen>
      <Text className="m-4 mb-0 text-lg">Resumen del pedido</Text>
      <C_Card>
        <Row>
          <Text className="flex flex-1">Importe:</Text>
          <Text>{payment?.amount} EUR</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex flex-1">Moneda seleccionada:</Text>
          <CoinSvg height={18} width={18} className="mr-2" />
          <Text>{payment?.coin}</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex flex-1">Comercio:</Text>
          <BadgeCheckIcon size={18} className="mr-1 text-cyan-500" />
          <Text>Comercio de pruebas de Semega</Text>
        </Row>
        <Row>
          <Text className="flex flex-1">Fecha:</Text>
          <Text>21/01/2022 08:52</Text>
        </Row>
        <Spacer />
        <Row>
          <Text className="flex flex-1">Concepto:</Text>
          <Text>{payment?.description}</Text>
        </Row>
        {/*  */}
        <View className="h-5" />
        {/*  */}
        <C_Button title="Continuar" />
      </C_Card>
      {/*  */}
      <Footer />
    </Screen>
  )
}

export default MakePayment

// ─────────────────────────────────────────────────────────────────────────────

const Row = ({ children }: { children: React.ReactNode }) => (
  <View className="flex flex-row items-center px-2 py-3">{children}</View>
)

const Spacer = () => <View className="my-2 border-t border-gray-200" />
