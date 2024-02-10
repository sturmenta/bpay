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
    <SuccessToast text2Style={{ color: "#ccc", fontSize: 12 }} {...props} />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      text1Style={{ fontSize: 13 }}
      text2Style={{ fontSize: 13, marginTop: 2 }}
      {...props}
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
