import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './../task.interfaces';

export class TasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
