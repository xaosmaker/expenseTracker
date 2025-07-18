import { AxiosError } from "axios";
import { api } from "../../../services/api";
import type { CreatePayment } from "../types/paymentTypes";

export async function getPayments() {
  const res = await api.get("/api/payments/")
  const data = await res.data
  return data

}

export async function createPayment(data: CreatePayment) {
  try {

    const res = await api.post("/api/payments", data)
    const resData = await res.data
    return resData
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log("createPayment axion instance:", e);
      throw new Error("Something went wrong")
    }
    console.log("createPayment: general error", e);

  }
}

export async function deletePaymentApi(id: number) {
  try {
    const res = await api.delete(`/api/payments/${id}`)
    return res.data
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log("deletePayment axion instance:", e);
      throw new Error("Something went wrong")
    }
    console.log("deletePayment: general error", e);

  }

}
