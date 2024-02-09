import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"

import { C_Card, CryptoCoinPicker, Footer } from "@/components/for_this_app"
import { C_Button, C_TextInput, Screen } from "@/components/generic"
import { usePaymentStore } from "@/store"

type Inputs = {
  payment_amount: string
  description: string
}

const ConfigPayment = () => {
  const [selectedCoin, setSelectedCoin] = useState<{
    value: Currency["symbol"]
  }>({ value: "" })
  const [selectedCoinImage, setSelectedCoinImage] =
    useState<Currency["symbol"]>("")
  const [ctaButtonEnabled, setCtaButtonEnabled] = useState(false)

  const { setPayment } = usePaymentStore()
  const router = useRouter()

  // ─────────────────────────────────────────────────────────────────────

  const { control, handleSubmit, getValues, watch } = useForm<Inputs>()

  // ─────────────────────────────────────────────────────────────────────

  const onSubmit = (data: { payment_amount: string; description: string }) => {
    setPayment({
      amount: parseFloat(data.payment_amount),
      description: data.description,
      coin: selectedCoin.value,
      image: selectedCoinImage
    })

    router.push("/make_payment")
  }

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const subscription = watch((value) => {
      setCtaButtonEnabled(Boolean(value.description && value.payment_amount))
    })
    return () => subscription.unsubscribe()
  }, [watch])

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
              payment_amount: parseFloat(getValues("payment_amount")),
              setSelectedCoinImage
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
            disabled={!ctaButtonEnabled}
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
