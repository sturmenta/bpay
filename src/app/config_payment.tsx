import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import Toast from "react-native-toast-message"

import {
  C_Card,
  CryptoCoinPicker,
  Footer,
  SelectedCurrency_Type
} from "@/components/for_this_app"
import { C_Button, C_TextInput, Screen } from "@/components/generic"
import { usePaymentStore } from "@/store"

type Inputs = {
  payment_amount: string
  description: string
}

// to not show "no options" when start and have better user experience
const PAYMENT_AMOUNT__START_VALUE = 0.5

const ConfigPayment = () => {
  const { setPayment } = usePaymentStore()
  const router = useRouter()
  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      payment_amount: PAYMENT_AMOUNT__START_VALUE.toString().replace(".", ","),
      description: ""
    }
  })

  // ─────────────────────────────────────────────────────────────────────

  const [selectedCoin, setSelectedCoin] = useState<SelectedCurrency_Type>({
    value: "",
    image: ""
  })
  const [ctaButtonEnabled, setCtaButtonEnabled] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState<number | undefined>(
    PAYMENT_AMOUNT__START_VALUE
  )

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const subscription = watch((value) => {
      // check if the fields are filled to enable the button
      setCtaButtonEnabled(Boolean(value.description && value.payment_amount))

      // only one comma is allowed
      if (value.payment_amount?.replace(",", ".").includes(",")) {
        Toast.show({
          type: "error",
          text1: "Error ❌",
          text1Style: { fontSize: 13 },
          text2: "El importe debe ser un número válido",
          text2Style: { fontSize: 13, marginTop: 2 }
        })
        setCtaButtonEnabled(false)
      } else {
        setPaymentAmount(
          parseFloat(value.payment_amount?.replace(",", ".") || "0")
        )
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  // ─────────────────────────────────────────────────────────────────────

  const onSubmit = (data: { payment_amount: string; description: string }) => {
    setPayment({
      amount: parseFloat(data.payment_amount),
      description: data.description,
      coin: selectedCoin.value,
      image: selectedCoin.image
    })

    router.push("/make_payment")
  }

  // ─────────────────────────────────────────────────────────────────────

  return (
    <Screen>
      <C_Card>
        <Text className="p-5 text-center text-2xl font-medium">Crear pago</Text>
        <View className="mt-5">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <C_TextInput
                title="Importe a pagar"
                placeholder="Añade importe a pagar"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="payment_amount"
          />

          <View className="h-5" />

          <CryptoCoinPicker
            {...{
              selectedCoin,
              setSelectedCoin,
              paymentAmount
            }}
          />

          <View className="h-5" />

          <Controller
            control={control}
            rules={{ maxLength: 100, required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <C_TextInput
                title="Concepto"
                placeholder="Añade descripción del pago"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />

          <View className="h-5" />

          <C_Button
            title="Continuar"
            disabled={!(ctaButtonEnabled && selectedCoin.value)}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </C_Card>
      {/*  */}
      <Footer />
    </Screen>
  )
}

export default ConfigPayment
