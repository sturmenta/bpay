import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"

import { colors } from "@/constants"

export const C_Button = ({
  title,
  disabled,
  isLoading,
  ...props
}: TouchableOpacityProps & {
  disabled?: boolean
  title: string
  isLoading?: boolean
}) => {
  return (
    <View
      pointerEvents={isLoading ? "none" : "auto"}
      className={`${isLoading ? "opacity-60" : ""}`}>
      <TouchableOpacity
        className={`items-center rounded-lg ${disabled ? "bg-blue-200" : colors.bitnovo_tailwind} p-3 text-white`}
        disabled={disabled}
        onPress={disabled ? () => {} : props.onPress}
        {...props}>
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text className="text-white">{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
