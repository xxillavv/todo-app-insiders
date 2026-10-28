export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITask {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface ICreateTask {
  title: string
  description?: string
  status?: TaskStatus
}

export type IUpdateTask = Partial<ICreateTask>
