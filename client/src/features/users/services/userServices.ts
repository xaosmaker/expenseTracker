import { api } from "../../../services/api";
import type { RegisterUser } from "../schemas/regSchema";

const BASE_USER_URL = "/api/users/"

export async function loginUser(payload: Omit<RegisterUser, "confirmPassword">) {
  const res = await api.post(`${BASE_USER_URL}login`, payload)
  const data = await res.data
  return data
}


export async function registerUser(payload: RegisterUser) {
  const res = await api.post(`${BASE_USER_URL}`, payload)
  const data = await res.data
  return data
}
