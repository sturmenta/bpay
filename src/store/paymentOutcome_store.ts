import { create } from "zustand"
import { useShallow } from "zustand/react/shallow"

export type PaymentOutcome_Interface = {
  success: boolean
} | null

interface State {
  paymentOutcome: PaymentOutcome_Interface
  setPaymentOutcome: (value: PaymentOutcome_Interface) => void
}

const _usePaymentOutcomeStore = create<State>((set) => ({
  paymentOutcome: null,
  setPaymentOutcome: (value) => set({ paymentOutcome: value })
}))

// https://github.com/pmndrs/zustand#selecting-multiple-state-slices
export const usePaymentOutcomeStore = () => {
  const { paymentOutcome, setPaymentOutcome } = _usePaymentOutcomeStore(
    useShallow((state) => ({
      paymentOutcome: state.paymentOutcome,
      setPaymentOutcome: state.setPaymentOutcome
    }))
  )

  return { paymentOutcome, setPaymentOutcome }
}
