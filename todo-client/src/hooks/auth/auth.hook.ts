import { useMutation } from "@tanstack/react-query"
import { IAuthUser } from "./auth.types"
import { loginUser, logoutUser, registerUser } from "./auth.service"


export const useAuth = () => {
  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (body: IAuthUser) => registerUser(body)
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: IAuthUser) => loginUser(body),
  })

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutUser
  })

  return {
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation
  }
}