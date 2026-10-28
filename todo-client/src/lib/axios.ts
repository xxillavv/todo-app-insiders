import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message
    if (Array.isArray(message)) return message.join('\n')
    if (message) return message
  }
  return 'Something went wrong. Please try again.'
}
