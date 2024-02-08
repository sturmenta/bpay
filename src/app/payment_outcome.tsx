import { useRouter } from "expo-router"
import { Image, Text, View } from "react-native"

import { image_error, image_success } from "@/assets/images"
import { C_Card, Footer } from "@/components/for_this_app"
import { C_Button, Screen } from "@/components/generic"
import { usePaymentOutcomeStore } from "@/store"

const PaymentOutcome = () => {
  const router = useRouter()

  const { paymentOutcome } = usePaymentOutcomeStore()

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <C_Card>
          <View className="p-2 pt-6">
            <View className="mb-10 items-center px-3">
              <Image
                source={paymentOutcome?.success ? image_success : image_error}
                style={{ transform: [{ scale: 0.8 }] }}
              />
              <Text className="mb-3 text-lg font-medium">
                {`¡Pago ${paymentOutcome?.success ? "completado" : "cancelado"}!`}
              </Text>
              <Text className="text-center text-gray-500">
                Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor
                et varius dolor elit facilisi enim. Nulla ut ut eu nunc.
              </Text>
            </View>
            <C_Button
              title="Crear nuevo pago"
              onPress={() => router.replace("/config_payment")}
              style={{ backgroundColor: "#285ac5", width: "100%" }}
            />
          </View>
        </C_Card>
      </View>
      {/*  */}
      <Footer noFlex1 />
    </Screen>
  )
}

export default PaymentOutcome
