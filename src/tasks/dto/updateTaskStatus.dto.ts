import { IsEnum } from 'class-validator';
import { TaskStatus } from './../task.interfaces';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
