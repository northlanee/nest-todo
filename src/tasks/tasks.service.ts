import { TasksFilterDto } from './dto/tasksFilter.dto';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task, TaskStatus } from './task.modal';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idGen = 1;

  getTasks(tasksFilterDto: TasksFilterDto): Task[] {
    const { search, status } = tasksFilterDto;
    let tasks = this.tasks;

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status.toUpperCase());
    }

    return tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.idGen,
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    this.idGen++;
    return task;
  }

  deleteTask(id: number): Task {
    const taskIdx = this.tasks.findIndex((task) => task.id === id);
    const task = this.tasks[taskIdx];
    this.tasks.splice(taskIdx, 1);
    return task;
  }

  updateStatus(id: number, status: TaskStatus): Task {
    const taskIdx = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIdx].status = status;
    return this.tasks[taskIdx];
  }
}
