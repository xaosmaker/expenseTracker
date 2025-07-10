import { api } from "../../services/api";

export async function getPayments() {
  const res = await api.get("/api/payments/")
  const data = await res.data
  return data

}
