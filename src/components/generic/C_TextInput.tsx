import { Text, TextInput, TextInputProps, View } from "react-native"

export const C_TextInput = ({
  title,
  disabled,
  ...props
}: TextInputProps & {
  title: string
  disabled?: boolean
}) => {
  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      className={`${disabled ? "opacity-60" : ""}`}>
      <Text className="mb-1 font-medium">{title}</Text>
      <TextInput className="rounded border border-gray-300 p-2" {...props} />
    </View>
  )
}
