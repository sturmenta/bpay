// TODO: Add form validation

import { useRouter } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"

import { C_Card, CryptoCoinPicker, Footer } from "@/components/for_this_app"
import { C_Button, C_TextInput, Screen } from "@/components/generic"
import { CryptoCoin } from "@/constants"
import { usePaymentStore } from "@/store"

type Inputs = {
  payment_amount: string
  description: string
}

const ConfigPayment = () => {
  const [selectedCoin, setSelectedCoin] = useState<{ value: CryptoCoin }>({
    value: "BTC"
  })
  const { setPayment } = usePaymentStore()
  const router = useRouter()

  const {
    control,
    handleSubmit
    // formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      payment_amount: "222",
      description: "alo"
    }
  })

  const onSubmit = (data: { payment_amount: string; description: string }) => {
    setPayment({
      amount: parseFloat(data.payment_amount),
      description: data.description,
      coin: selectedCoin.value
    })

    router.push("/make_payment")
  }

  return (
    <Screen>
      <C_Card>
        <Text className="p-5 text-center text-2xl">Crear pago</Text>
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
          {/* {errors.payment_amount && <Text>This is required.</Text>} */}

          <View className="h-5" />

          <CryptoCoinPicker {...{ selectedCoin, setSelectedCoin }} />

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
            // disabled
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
