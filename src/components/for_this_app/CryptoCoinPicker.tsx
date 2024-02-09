// TODO: filter the currencies showed by input changes (min/max amounts for every currency)

// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"
import _ from "lodash"
import {
  CheckIcon,
  ChevronDown,
  ChevronRight,
  InfoIcon
} from "lucide-react-native"
import { useEffect } from "react"
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { Picker, PickerProps } from "react-native-ui-lib"
import {
  PickerMultiValue,
  PickerValue
} from "react-native-ui-lib/src/components/picker/types"

// import { AXIOS_BASE_CONFIG } from "@/config"
import {
  colors,
  // BASE_API_URL,
  MOCKED_CURRENCIES_LIST
} from "@/constants"

// import { useFocusNotifyOnChangeProps } from "@/hooks"

import { FullScreenLoading } from "../generic"

type PickerOption = {
  value: Currency["symbol"]
  label: Currency["name"]
}

// ─────────────────────────────────────────────────────────────────────────────

export const CryptoCoinPicker = ({
  selectedCoin,
  setSelectedCoin,
  setSelectedCoinImage,
  payment_amount
}: {
  selectedCoin: { value: Currency["symbol"] }
  setSelectedCoin: React.Dispatch<
    React.SetStateAction<{ value: Currency["symbol"] }>
  >
  setSelectedCoinImage: React.Dispatch<React.SetStateAction<Currency["image"]>>
  payment_amount?: number
}) => {
  // const notifyOnChangeProps = useFocusNotifyOnChangeProps()

  // const { isLoading, error, data, isFetching } = useQuery({
  //   queryKey: ["getCurrencies"],
  //   queryFn: () =>
  //     axios
  //       .get(`${BASE_API_URL}/currencies`, AXIOS_BASE_CONFIG)
  //       .then((res) => res.data),
  //   notifyOnChangeProps
  // })

  const isLoading = false
  const error = { message: "" }
  const data = MOCKED_CURRENCIES_LIST // TODO: use mocked data to not make the request and not get 429 for server overload
  const isFetching = false

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (data) {
      setSelectedCoin({ value: data[0].symbol })
      setSelectedCoinImage(data[0].image)
    }
  }, [data])

  useEffect(() => {
    if (error) console.log(`error`, error)
  }, [error])

  // ─────────────────────────────────────────────────────────────────────

  const renderPicker: PickerProps["renderPicker"] = (
    value?: PickerMultiValue | undefined,
    label?: string
  ) => {
    const imageUri = getCurrencyImage(data, value!.toString())

    return (
      <View>
        <View className="mb-1 flex-row items-center">
          <Text className="mr-1 font-medium">Seleccionar moneda</Text>
          <TouchableOpacity>
            <InfoIcon color="#aaa" size={12} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center rounded border border-gray-300 p-2">
          <View className="flex-1 flex-row items-center">
            {!imageUri ? (
              <ActivityIndicator color={colors.bitnovo} size="small" />
            ) : (
              <Image
                source={{ uri: imageUri }}
                width={20}
                height={20}
                className="mr-2"
              />
            )}
            <Text>{label + " " + value}</Text>
          </View>
          <ChevronDown color="#ccc" size={15} />
        </View>
      </View>
    )
  }

  const renderItem =
    (option: PickerOption, index: number) => (value: PickerValue) => {
      const imageUri = getCurrencyImage(data, value!.toString())

      return (
        <>
          {index !== 0 && <View className="border-t border-gray-100" />}
          <View className="flex-row items-center p-3 px-5">
            {!imageUri ? (
              <ActivityIndicator color={colors.bitnovo} size="small" />
            ) : (
              <Image
                source={{ uri: imageUri }}
                width={30}
                height={30}
                className="mr-3"
              />
            )}
            <View className="flex-1">
              <Text>{option.label}</Text>
              <Text className="text-xs text-gray-400">{value}</Text>
            </View>
            {selectedCoin.value === value ? (
              <View
                className="h-4 w-4 items-center justify-center rounded-full"
                style={{ backgroundColor: "#69a3ea" }}>
                <CheckIcon size={12} color="#fff" />
              </View>
            ) : (
              <ChevronRight size={15} color="#aaa" />
            )}
          </View>
        </>
      )
    }

  if (isLoading || isFetching)
    return (
      <View className="p-10">
        <FullScreenLoading />
      </View>
    )
  if (data.length === 0)
    return (
      <View className="p-10">
        <Text>ERROR: No currencies found</Text>
      </View>
    )
  if (error && error.message)
    return (
      <View className="p-10">
        <Text>{`ERROR: an error occurred while trying to get the currencies\n\n${error.message}`}</Text>
      </View>
    )

  return (
    <Picker
      placeholder="Seleccionar criptomoneda"
      floatingPlaceholder
      value={selectedCoin.value}
      enableModalBlur={false}
      onChange={(item) => {
        setSelectedCoin({ value: item!.toString() })
        setSelectedCoinImage(getCurrencyImage(data, item!.toString()))
      }}
      topBarProps={{ title: "Seleccionar criptomoneda" }}
      showSearch
      useSafeArea
      searchPlaceholder="Buscar"
      searchStyle={{ color: "#333", placeholderTextColor: "#ccc" }}
      renderPicker={renderPicker}>
      {_.map(generatePickerOptions(data), (option, index) => (
        <Picker.Item
          key={option.value}
          value={option.value}
          label={option.label}
          renderItem={renderItem(option, index)}
        />
      ))}
    </Picker>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const generatePickerOptions = (data: Currency[]): PickerOption[] =>
  _.map(data, (currency: Currency) => ({
    label: currency.name,
    value: currency.symbol
  }))

const getCurrencyImage = (data: Currency[], value: Currency["symbol"]) => {
  const currency = _.find(data, { symbol: value })
  return currency?.image || ""
}

// ─────────────────────────────────────────────────────────────────────────────

// RNUILib - Picker - https://wix.github.io/react-native-ui-lib/docs/components/form/Picker/Picker#usage
// Picker code examples - https://github.com/wix/react-native-ui-lib/blob/e0d5423e48c4e5a43bbf54bc5f9200da03c7e08f/demo/src/screens/componentScreens/PickerScreen.tsx#L1 (permalink)
