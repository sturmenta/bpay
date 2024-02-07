import _ from "lodash"
import {
  CheckIcon,
  ChevronDown,
  ChevronRight,
  InfoIcon
} from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { Picker, PickerProps } from "react-native-ui-lib"
import {
  PickerMultiValue,
  PickerValue
} from "react-native-ui-lib/src/components/picker/types"

import { crypto_coins, CryptoCoin, CryptoCoinLabel } from "@/constants"
import { getCoinSvg } from "@/utils"

// ─────────────────────────────────────────────────────────────────────────────

const options: {
  label: CryptoCoinLabel
  value: CryptoCoin
}[] = Object.keys(crypto_coins).map((coin) => ({
  label: crypto_coins[coin as CryptoCoin],
  value: coin as CryptoCoin
}))

// ─────────────────────────────────────────────────────────────────────────────

export const CryptoCoinPicker = ({
  selectedCoin,
  setSelectedCoin
}: {
  selectedCoin: { value: CryptoCoin }
  setSelectedCoin: React.Dispatch<React.SetStateAction<{ value: CryptoCoin }>>
}) => {
  const renderPicker: PickerProps["renderPicker"] = (
    value?: PickerMultiValue | undefined,
    label?: string
  ) => {
    const CoinSvg = getCoinSvg(
      (value?.toString() as CryptoCoin) || options[0].value
    )

    return (
      <View>
        <View className="mb-1 flex flex-row items-center">
          <Text className="mr-1">Seleccionar moneda</Text>
          <TouchableOpacity>
            <InfoIcon color="#aaa" size={12} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center rounded border border-gray-300 p-2">
          <View className="flex flex-1 flex-row items-center">
            <CoinSvg width={20} height={20} className="mr-2" />
            <Text>{label + " " + value}</Text>
          </View>
          <ChevronDown color="#ccc" size={15} />
        </View>
      </View>
    )
  }

  const renderItem =
    (option: { label: string; value: string }, index: number) =>
    (value: PickerValue) => {
      const CoinSvg = getCoinSvg(
        (value?.toString() as CryptoCoin) || options[0].value
      )
      return (
        <>
          {index !== 0 && <View className="border-t border-gray-100" />}
          <View className="flex flex-row items-center p-3 px-5">
            <CoinSvg width={20} height={20} className="mr-3" />
            <View className="flex flex-1">
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

  return (
    <Picker
      placeholder="Seleccionar criptomoneda"
      floatingPlaceholder
      value={selectedCoin.value}
      enableModalBlur={false}
      onChange={(item) =>
        setSelectedCoin({ value: (item?.toString() as CryptoCoin) || "" })
      }
      topBarProps={{ title: "Seleccionar criptomoneda" }}
      showSearch
      useSafeArea
      searchPlaceholder="Buscar"
      searchStyle={{ color: "#333", placeholderTextColor: "#ccc" }}
      renderPicker={renderPicker}>
      {_.map(options, (option, index) => (
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

// RNUILib - Picker - https://wix.github.io/react-native-ui-lib/docs/components/form/Picker/Picker#usage
// Picker code examples - https://github.com/wix/react-native-ui-lib/blob/e0d5423e48c4e5a43bbf54bc5f9200da03c7e08f/demo/src/screens/componentScreens/PickerScreen.tsx#L1 (permalink)
