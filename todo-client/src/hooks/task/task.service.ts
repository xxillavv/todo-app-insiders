import { ICreateTask, ITask, IUpdateTask, TaskStatus } from "./task.type"
import { api } from "@/lib/axios"

export const getTasks = async (status?: TaskStatus) => {
  const { data } = await api.get<ITask[]>('/tasks', { params: { status } })
  return data
}

export const createTask = async (body: ICreateTask) => {
  const { data } = await api.post<ITask>('/tasks', body)
  return data
}

export const updateTask = async (id: string, body: IUpdateTask) => {
  const { data } = await api.patch<ITask>(`/tasks/${id}`, body)
  return data
}

export const deleteTask = (id: string) => {
  return api.delete(`/tasks/${id}`)
}
