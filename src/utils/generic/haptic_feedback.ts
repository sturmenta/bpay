import * as Haptics from "expo-haptics"

export const withLightHapticFeedback = async (callback: () => void) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  await callback()
}

export const runLightHapticFeedback = () =>
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

export const runSuccessHapticFeedback = () =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

export const runErrorHapticFeedback = () =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
