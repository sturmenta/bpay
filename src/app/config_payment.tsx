import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"
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
import { AXIOS_BASE_CONFIG } from "@/config"
import { BASE_API_URL } from "@/constants"
import { usePaymentStore } from "@/store"

// ─────────────────────────────────────────────────────────────────────────────

type Inputs = {
  payment_amount: string
  description: string
}

// https://payments.pre-bnvo.com/redoc/#operation/orders_create
type Payment = {
  expected_output_amount: number // (required) Payment amount in fiat (€).
  input_currency: string // The cryptocurrency that will be use to make the payment.
  notes: string // (<= 512 characters) Product or service description of the payment.
}

// to not show "no options" when start and have better user experience
const PAYMENT_AMOUNT__START_VALUE = 0.5

// ─────────────────────────────────────────────────────────────────────────────

const ConfigPayment = () => {
  const { setPayment } = usePaymentStore()
  const router = useRouter()
  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      payment_amount: PAYMENT_AMOUNT__START_VALUE.toString().replace(".", ","),
      description: ""
    }
  })
  const { isPending, mutate } = useMutation({
    mutationFn: (payment: Payment) =>
      axios.post(`${BASE_API_URL}/orders/`, payment, AXIOS_BASE_CONFIG),
    onSuccess: (data, variables, context) =>
      onSuccess(data, variables, context),
    onError: (error, variables, context) => onError(error, variables, context)
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
      // check if all the fields are filled to enable the button
      setCtaButtonEnabled(Boolean(value.description && value.payment_amount))

      // only one comma is allowed
      if (value.payment_amount?.replace(",", ".").includes(",")) {
        Toast.show({
          type: "error",
          text1: "Error ❌",
          text2: "El importe debe ser un número válido"
        })
        setCtaButtonEnabled(false)
      } else {
        setPaymentAmount(parsePaymentAmount(value.payment_amount))
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  // ─────────────────────────────────────────────────────────────────────

  const onSubmit = (data: { payment_amount: string; description: string }) => {
    mutate({
      expected_output_amount: parsePaymentAmount(data.payment_amount),
      input_currency: selectedCoin.value,
      notes: data.description
    })
  }

  const onSuccess = (
    data: UseMutationResult["data"],
    variables: Payment,
    context: UseMutationResult["context"]
  ) => {
    setPayment({
      amount: variables.expected_output_amount,
      description: variables.notes,
      coin: variables.input_currency,
      image: selectedCoin.image
    })

    router.push("/make_payment")
  }

  const onError = (
    error: UseMutationResult["error"],
    variables: Payment,
    context: UseMutationResult["context"]
  ) => {
    if (!error) return

    Toast.show({
      type: "error",
      text1: "Error ❌",
      text2: "No se ha podido crear el pago"
    })
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
                disabled={isPending}
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
              paymentAmount,
              disabled: isPending
            }}
          />

          <View className="h-5" />

          <Controller
            control={control}
            rules={{ maxLength: 512, required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <C_TextInput
                disabled={isPending}
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
            isLoading={isPending}
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

// ─────────────────────────────────────────────────────────────────────────────

const parsePaymentAmount = (value?: string) =>
  parseFloat(value?.replace(",", ".") || "0")
