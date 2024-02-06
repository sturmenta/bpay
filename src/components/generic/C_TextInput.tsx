import { Text, TextInput, TextInputProps, View } from "react-native"

export const C_TextInput = ({
  title,
  ...props
}: TextInputProps & {
  title: string
}) => {
  return (
    <View>
      <Text className="mb-1">{title}</Text>
      <TextInput className="rounded border border-gray-300 p-2" {...props} />
    </View>
  )
}
