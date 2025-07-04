export interface CreatePayment {
  name: string
  payedDueDate: Date
  amount: number
  userId: number
  isPayed: boolean
}

export interface CreatePaymentDB {
  name: string
  payed_due_date: Date
  amount: number
  user_id: number
  is_payed: boolean

}
export interface PutPayment extends CreatePayment {
  id: number
}



export interface PaymentDB extends CreatePaymentDB {
  id: number
  created_at: Date
  updated_at: Date
}


export class Payment {
  id: number
  name: string
  payedDueDate: Date
  amount: number
  userId: number
  isPayed: boolean
  createdAt: Date
  updatedAt: Date
  constructor({ id, name, payed_due_date, amount, user_id, is_payed, created_at, updated_at }: PaymentDB) {
    this.id = id
    this.name = name
    this.payedDueDate = payed_due_date
    this.amount = amount
    this.userId = user_id
    this.isPayed = is_payed
    this.createdAt = created_at
    this.updatedAt = updated_at
  }


}
