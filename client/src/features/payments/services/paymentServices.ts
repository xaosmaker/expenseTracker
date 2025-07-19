import { AxiosError } from "axios";
import { api } from "../../../services/api";
import type { CreatePayment, Payment } from "../types/paymentTypes";

export async function getPayments(params: URLSearchParams) {

  const res = await api.get(`/api/payments/?${params.toString()}`)
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

export async function getSinglePaymentApi(id: string) {
  try {
    const res = await api.get(`/api/payments/${id}`)
    return res.data
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log("get Single payment axios instance:", e);
      throw new Error("Something went wrong")
    }
    console.log("get Single payment: general error", e);

  }

}

export async function putSinglePaymentApi(id: string, data: Partial<Payment>) {
  try {
    const res = await api.put(`/api/payments/${id}`, data)
    return res.data
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log("putSinglePaymentApi axion instance:", e);
      throw new Error("Something went wrong")
    }
    console.log("putSinglePaymentApi: general error", e);

  }

}
