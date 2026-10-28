import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { JwtAuthGuard, type AuthenticatedRequest } from '../auth/guards/auth.guard.js';
import { CreateTaskDto, GetTasksQueryDto, UpdateTaskDto } from './dto/tasks.dto.js';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getAllTasks(@Req() req: AuthenticatedRequest, @Query() query: GetTasksQueryDto) {
    return this.tasksService.getAllTasks(req.user.sub, query)
  }

  @Get(':id')
  getTaskById(@Req() req: AuthenticatedRequest, @Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.getTaskById(req.user.sub, id)
  }

  @Post()
  createTask(@Req() req: AuthenticatedRequest, @Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(req.user.sub, dto)
  }

  @Patch(':id')
  updateTask(@Req() req: AuthenticatedRequest, @Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(req.user.sub, id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Req() req: AuthenticatedRequest, @Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.deleteTask(req.user.sub, id)
  }
}
