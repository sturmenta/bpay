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
  success: (props: BaseToastProps) => <SuccessToast {...props} />,
  error: (props: BaseToastProps) => <ErrorToast {...props} />
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
