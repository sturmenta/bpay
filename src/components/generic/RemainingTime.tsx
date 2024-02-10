import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Text } from "react-native"

// NOTE:
// show max 59:59 time remaining
// show 00:00 when time is expired

export const RemainingTime = ({ expired_time }: { expired_time: string }) => {
  const [time, setTime] = useState("00:00")

  const _setTime = () => {
    const diff = dayjs(expired_time).diff(dayjs())
    if (diff < 0) return setTime("00:00")

    const dur = dayjs.duration(diff)
    const remaining = dayjs.utc(dur.asMilliseconds()).format("mm:ss")

    setTime(remaining)
  }

  useEffect(() => {
    _setTime() // don't wait 1 second to show the time
    const setTimeInterval = setInterval(_setTime, 1000)

    return () => {
      clearInterval(setTimeInterval)
    }
  }, [])

  return <Text>{time}</Text>
}

// why use utc? -> https://github.com/iamkun/dayjs/issues/641#issuecomment-643924034
