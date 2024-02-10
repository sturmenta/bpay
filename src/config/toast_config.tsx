import React from "react"
import Toast, {
  BaseToastProps,
  ErrorToast,
  SuccessToast,
  ToastProps
} from "react-native-toast-message"

import {
  runErrorHapticFeedback,
  runSuccessHapticFeedback
} from "@/utils/generic"

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <SuccessToast {...props} text2Style={{ color: "#222", fontSize: 12 }} />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{ fontSize: 13 }}
      text2Style={{ fontSize: 13, marginTop: 2 }}
    />
  )
}

export const Root_Toast = (props: ToastProps) => {
  return (
    <Toast
      visibilityTime={8 * 1000}
      position="bottom"
      onShow={() =>
        props.type === "error"
          ? runErrorHapticFeedback()
          : runSuccessHapticFeedback()
      }
      {...props}
    />
  )
}
