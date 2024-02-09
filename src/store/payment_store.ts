import { create } from "zustand"
import { useShallow } from "zustand/react/shallow"

export interface Payment_Interface {
  amount: number
  description: string
  coin: Currency["symbol"]
  image: Currency["image"]
}

interface State {
  payment: Payment_Interface | null
  setPayment: (value: Payment_Interface) => void
}

const _usePaymentStore = create<State>((set) => ({
  payment: null,
  setPayment: (value) => set({ payment: value })
}))

// https://github.com/pmndrs/zustand#selecting-multiple-state-slices
export const usePaymentStore = () => {
  const { payment, setPayment } = _usePaymentStore(
    useShallow((state) => ({
      payment: state.payment,
      setPayment: state.setPayment
    }))
  )

  return { payment, setPayment }
}
