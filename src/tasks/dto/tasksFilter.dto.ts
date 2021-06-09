import { TaskStatus } from './../task.modal';

export class TasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
