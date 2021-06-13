import { IsEnum } from 'class-validator';
import { TaskStatus } from './../task.modal';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
