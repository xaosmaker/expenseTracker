import { z } from "zod/v4"
export interface CreatePayment {
  name: string
  payedDueDate: string
  amount: number
  isPayed: boolean
}

export interface Payment {
  id: number
  name: string
  payedDueDate: Date
  amount: number
  userId: number
  isPayed: boolean
  createdAt: Date
  updatedAt: Date
}




export const paymentSchema = z.object({
  name: z.string().min(2, "This Field is Required"),
  payedDueDate: z.coerce.date<Date>('Payed Due Date Required'),
  amount: z.coerce.number<number>().nonnegative().min(0.001, "Amount Required"),
  isPayed: z.coerce.boolean<boolean>()
}
)

export type PaymentSchema = z.infer<typeof paymentSchema>
