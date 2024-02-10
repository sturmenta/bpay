import { create } from "zustand"
import { useShallow } from "zustand/react/shallow"

export interface Payment_Interface {
  image: Currency["image"]
  identifier: string
}

const defaultData: Payment_Interface = {
  image: "",
  identifier: ""
}

interface State {
  payment: Payment_Interface
  setPayment: (value: Payment_Interface) => void
}

const _usePaymentStore = create<State>((set) => ({
  payment: defaultData,
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
