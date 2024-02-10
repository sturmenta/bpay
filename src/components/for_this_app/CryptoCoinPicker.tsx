import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import _ from "lodash"
import {
  CheckIcon,
  ChevronDown,
  ChevronRight,
  InfoIcon
} from "lucide-react-native"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import Toast from "react-native-toast-message"
import { Picker, PickerProps } from "react-native-ui-lib"
import {
  PickerMultiValue,
  PickerValue
} from "react-native-ui-lib/src/components/picker/types"

import { AXIOS_BASE_CONFIG, USE_MOCKED__CURRENCIES } from "@/config"
import { BASE_API_URL, colors } from "@/constants"
import { MOCKED_CURRENCIES_LIST } from "@/mocked_data"

import { FullScreenLoading } from "../generic"

type PickerOption = {
  value: Currency["symbol"]
  label: Currency["name"]
  image: Currency["image"]
}

export type SelectedCurrency_Type = {
  value: Currency["symbol"]
  image: Currency["image"]
}

// ─────────────────────────────────────────────────────────────────────────────

export const CryptoCoinPicker = ({
  selectedCoin,
  setSelectedCoin,
  paymentAmount,
  disabled
}: {
  selectedCoin: SelectedCurrency_Type
  setSelectedCoin: React.Dispatch<React.SetStateAction<SelectedCurrency_Type>>
  paymentAmount?: number
  disabled?: boolean
}) => {
  const { isPending, isError, data, error } = useQuery({
    enabled: !USE_MOCKED__CURRENCIES, // NOTE: use mocked data to not get 429 for server overload
    queryKey: ["getCurrencies"],
    initialData: USE_MOCKED__CURRENCIES ? MOCKED_CURRENCIES_LIST : undefined,
    queryFn: () =>
      axios
        .get(`${BASE_API_URL}/currencies`, AXIOS_BASE_CONFIG)
        .then((res) => res.data)
  })

  // ─────────────────────────────────────────────────────────────────────

  const [pickerOptions, setPickerOptions] = useState<PickerOption[]>([])

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (data) {
      const _pickerOptions = generatePickerOptions(data, paymentAmount || 0)

      // if there are options, set the first one as the default selected
      if (_pickerOptions[0] && Object.keys(_pickerOptions[0]).length) {
        setPickerOptions(_pickerOptions)
        setSelectedCoin({
          value: _pickerOptions[0].value,
          image: _pickerOptions[0].image
        })
        Toast.hide()
      } else {
        // if there are no options, set the pickerOptions to an empty array and show a toast error
        setPickerOptions(_pickerOptions)
        setSelectedCoin({ value: "", image: "" })
        showToastError_noOptions()
      }
    }
  }, [paymentAmount, data])

  // ─────────────────────────────────────────────────────────────────────

  const showToastError_noOptions = () =>
    Toast.show({
      type: "error",
      text1: "No hay opciones disponibles ❌",
      text2: "Prueba cambiando el importe ingresado"
    })

  const renderPicker: PickerProps["renderPicker"] = (
    value?: PickerMultiValue | undefined,
    label?: string
  ) => {
    const imageUri = value ? getCurrencyImage(data, value.toString()) : ""

    return (
      <TouchableOpacity
        onPress={() => (!value ? showToastError_noOptions() : null)}>
        <View className="mb-1 flex-row items-center">
          <Text className="mr-1 font-medium">Seleccionar moneda</Text>
          <TouchableOpacity>
            <InfoIcon color="#aaa" size={12} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center rounded border border-gray-300 p-2">
          <View className="flex-1 flex-row items-center">
            {!value && !label ? (
              <Text>No hay opciones disponibles ❌</Text>
            ) : (
              <>
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
                <Text>{`${label || ""} ${value || ""}`}</Text>
              </>
            )}
          </View>
          <ChevronDown color="#ccc" size={15} />
        </View>
      </TouchableOpacity>
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

  if (isPending)
    return (
      <View className="p-10">
        <FullScreenLoading />
      </View>
    )
  if (isError)
    return (
      <View className="p-10">
        <Text>{`ERROR: an error occurred while trying to get the currencies\n\n${error.message}`}</Text>
      </View>
    )
  if (!data || data.length === 0)
    return (
      <View className="p-10">
        <Text>ERROR: No currencies found</Text>
      </View>
    )

  // if no picker options -> return a "freezed-no-options" picker and when touched fire the toast error again
  if (pickerOptions.length === 0) return renderPicker(undefined, "")

  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      className={`${disabled ? "opacity-60" : ""}`}>
      <Picker
        placeholder="Seleccionar criptomoneda"
        floatingPlaceholder
        value={selectedCoin.value}
        enableModalBlur={false}
        onChange={(item) => {
          setSelectedCoin({
            value: item!.toString(),
            image: getCurrencyImage(data, item!.toString())
          })
        }}
        topBarProps={{ title: "Seleccionar criptomoneda" }}
        showSearch
        useSafeArea
        searchPlaceholder="Buscar"
        searchStyle={{ color: "#333", placeholderTextColor: "#ccc" }}
        renderPicker={renderPicker}>
        {_.map(pickerOptions, (option, index) => (
          <Picker.Item
            key={option.value}
            value={option.value}
            label={option.label}
            renderItem={renderItem(option, index)}
          />
        ))}
      </Picker>
    </View>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const generatePickerOptions = (
  data: Currency[],
  paymentAmount: number
): PickerOption[] => {
  // make allOptions comply with min and max amounts
  const optionsFilteredByPaymentAmount = data.filter(
    (option) =>
      paymentAmount >= parseFloat(option.min_amount) &&
      paymentAmount <= parseFloat(option.max_amount)
  )

  const pickerOptions = _.map(
    optionsFilteredByPaymentAmount,
    (currency: Currency) => ({
      label: currency.name,
      value: currency.symbol,
      image: currency.image
    })
  )

  return pickerOptions
}

const getCurrencyImage = (data: Currency[], value: Currency["symbol"]) =>
  _.find(data, { symbol: value })?.image || ""

// ─────────────────────────────────────────────────────────────────────────────

// RNUILib - Picker - https://wix.github.io/react-native-ui-lib/docs/components/form/Picker/Picker#usage
// Picker code examples - https://github.com/wix/react-native-ui-lib/blob/e0d5423e48c4e5a43bbf54bc5f9200da03c7e08f/demo/src/screens/componentScreens/PickerScreen.tsx#L1 (permalink)
