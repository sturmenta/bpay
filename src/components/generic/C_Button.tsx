import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import { colors } from "@/constants"

export const C_Button = ({
  title,
  disabled,
  ...props
}: TouchableOpacityProps & { disabled?: boolean; title: string }) => {
  return (
    <TouchableOpacity
      className={`items-center rounded-lg ${disabled ? "bg-blue-200" : colors.bitnovo_tailwind} p-3 text-white`}
      disabled={disabled}
      onPress={disabled ? () => {} : props.onPress}
      {...props}>
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  )
}
