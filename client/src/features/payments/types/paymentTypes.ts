import { z } from "zod/v4"
export interface CreatePayment {
  name: string
  payedDueDate: string
  amount: number
  isPayed: boolean
}
export interface AllPayments {
  maxResults: number
  payments: Payment[]
}

export interface Payment {
  id: number
  name: string
  payedDueDate: string
  amount: number
  userId: number
  isPayed: boolean
  createdAt: Date
  updatedAt: Date
}




export const paymentSchema = z.object({
  name: z.string().min(2, "This Field is Required"),
  // payedDueDate: z.date('Payed Due Date Required'),
  payedDueDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Payed Due Date Required" }),
  amount: z.coerce.number<number>().nonnegative().min(0.001, "Amount Required"),
  isPayed: z.coerce.boolean<boolean>()
}
)

export type PaymentSchema = z.infer<typeof paymentSchema>
