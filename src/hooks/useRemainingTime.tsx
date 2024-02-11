import dayjs from "dayjs"
import { useEffect, useState } from "react"

// NOTE:
// show max 59:59 time remaining
// show 00:00 when time is expired

export const TIME_TO_SHOW_WHEN_EXPIRED = "00:00"
const TIME_TO_SHOW_AS_PLACEHOLDER = "..:.."

export const useRemainingTime = ({
  expired_time
}: {
  expired_time: string
}) => {
  const [remainingTime, setRemainingTime] = useState(
    TIME_TO_SHOW_AS_PLACEHOLDER
  )

  const _setRemainingTime = () => {
    if (expired_time) {
      const diff = dayjs(expired_time).diff(dayjs())
      if (diff < 0) return setRemainingTime(TIME_TO_SHOW_WHEN_EXPIRED)

      const dur = dayjs.duration(diff)
      const remaining = dayjs.utc(dur.asMilliseconds()).format("mm:ss")

      setRemainingTime(remaining)
    }
  }

  useEffect(() => {
    _setRemainingTime() // don't wait 1 second to show the time
    const setTimeInterval = setInterval(_setRemainingTime, 1000)

    if (remainingTime === TIME_TO_SHOW_WHEN_EXPIRED)
      clearInterval(setTimeInterval)

    return () => {
      clearInterval(setTimeInterval)
    }
  }, [remainingTime])

  return { remainingTime }
}

// why use utc? -> https://github.com/iamkun/dayjs/issues/641#issuecomment-643924034
