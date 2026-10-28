import { IAuthUser } from "./auth.types"
import { api } from "@/lib/axios"

export const loginUser = (body: IAuthUser) => {
  return api.post('/auth/login', body)
}

export const registerUser = (body: IAuthUser) => {
  return api.post('/auth/register', body)
}

export const logoutUser = () => {
  return api.post('/auth/logout')
}