import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"

import { CryptoCoinPicker } from "@/components/for_this_app"
import { C_Button, C_TextInput, Screen } from "@/components/generic"

type Inputs = {
  payment_amount: string
  description: string
}

const ConfigPayment = () => {
  const {
    control,
    handleSubmit
    // formState: { errors }
  } = useForm<Inputs>()
  const onSubmit = (data: { payment_amount: string; description: string }) =>
    console.log(data)

  return (
    <Screen>
      <View className="m-4 mb-20 rounded-lg bg-white p-5 shadow-md">
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
              />
            )}
            name="payment_amount"
          />
          {/* {errors.payment_amount && <Text>This is required.</Text>} */}

          <View className="h-5" />

          <CryptoCoinPicker />

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
            disabled
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <View className="flex-1 justify-end">
        <Text className="text-center text-xs text-gray-400">
          Powered by Bitnovo. | © 2022 Bitnovo. All rights reserved.
        </Text>
      </View>
    </Screen>
  )
}

export default ConfigPayment
