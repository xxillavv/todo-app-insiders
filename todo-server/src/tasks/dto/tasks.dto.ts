import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from '../../generated/prisma/enums.js';

const STATUS_MESSAGE = `Status must be one of: ${Object.values(TaskStatus).join(', ')}`;

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255, { message: 'Title must be at most 255 characters long' })
  title!: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(2000, { message: 'Description must be at most 2000 characters long' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: STATUS_MESSAGE })
  status?: TaskStatus;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class GetTasksQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus, { message: STATUS_MESSAGE })
  status?: TaskStatus;
}
