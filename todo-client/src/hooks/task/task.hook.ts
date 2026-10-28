import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ICreateTask, IUpdateTask, TaskStatus } from "./task.type"
import { createTask, deleteTask, getTasks, updateTask } from "./task.service"

export const useTasks = (status?: TaskStatus) => {
  const queryClient = useQueryClient()

  const invalidateTasks = () => queryClient.invalidateQueries({ queryKey: ['tasks'] })

  const tasksQuery = useQuery({
    queryKey: ['tasks', status ?? 'ALL'],
    queryFn: () => getTasks(status)
  })

  const createMutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (body: ICreateTask) => createTask(body),
    onSuccess: invalidateTasks
  })

  const updateMutation = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: ({ id, body }: { id: string, body: IUpdateTask }) => updateTask(id, body),
    onSuccess: invalidateTasks
  })

  const deleteMutation = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: invalidateTasks
  })

  return {
    tasks: tasksQuery,
    create: createMutation,
    update: updateMutation,
    remove: deleteMutation
  }
}
