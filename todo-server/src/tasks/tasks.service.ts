import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto, GetTasksQueryDto, UpdateTaskDto } from './dto/tasks.dto.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) { }

  getAllTasks(userId: string, query: GetTasksQueryDto) {
    return this.prisma.task.findMany({
      where: { userId, status: query.status },
      orderBy: { createdAt: 'desc' }
    })
  }

  getTaskById(userId: string, taskId: string) {
    return this.findTaskOrThrow(userId, taskId)
  }

  createTask(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...dto, userId }
    })
  }

  async updateTask(userId: string, taskId: string, dto: UpdateTaskDto) {
    await this.findTaskOrThrow(userId, taskId)

    return this.prisma.task.update({
      where: { id: taskId },
      data: dto
    })
  }

  async deleteTask(userId: string, taskId: string) {
    await this.findTaskOrThrow(userId, taskId)

    await this.prisma.task.delete({
      where: { id: taskId }
    })
  }

  private async findTaskOrThrow(userId: string, taskId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId }
    })

    if (!task) throw new NotFoundException('Task not found')

    return task
  }
}
