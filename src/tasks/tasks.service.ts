import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksFilterDto } from './dto/tasksFilter.dto';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskStatus } from './task.interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  async getTasks(tasksFilterDto: TasksFilterDto): Promise<Task[]> {
    return await this.tasksRepository.getTasks(tasksFilterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    return await this.tasksRepository.remove(task);
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    return await this.tasksRepository.save(task);
  }
}
