import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

export const C_Button = ({
  title,
  disabled,
  ...props
}: TouchableOpacityProps & { disabled?: boolean; title: string }) => {
  return (
    <TouchableOpacity
      className={`items-center rounded-lg ${disabled ? "bg-blue-200" : "bg-blue-500"} p-3 text-white`}
      disabled={disabled}
      onPress={disabled ? () => {} : props.onPress}
      {...props}>
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  )
}
