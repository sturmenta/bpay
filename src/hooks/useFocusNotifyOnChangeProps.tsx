// disable re-renders on out of focus Screens = https://tanstack.com/query/v4/docs/framework/react/react-native#disable-re-renders-on-out-of-focus-screens

import { useFocusEffect } from "@react-navigation/native"
import { NotifyOnChangeProps } from "@tanstack/query-core"
import React from "react"

export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps
) {
  const focusedRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, [])
  )

  return () => {
    if (!focusedRef.current) {
      return []
    }

    if (typeof notifyOnChangeProps === "function") {
      return notifyOnChangeProps()
    }

    return notifyOnChangeProps || []
  }
}
