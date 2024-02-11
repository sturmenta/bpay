import { Text } from "react-native"

import { useRemainingTime } from "@/hooks"

export const RemainingTime = ({ expired_time }: { expired_time: string }) => {
  const { remainingTime } = useRemainingTime({ expired_time })

  return <Text>{remainingTime}</Text>
}
