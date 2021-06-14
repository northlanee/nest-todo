import { TasksFilterDto } from './dto/tasksFilter.dto';
import { CreateTaskDto } from './dto/createTask.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.interfaces';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(tasksFilterDto: TasksFilterDto): Promise<Task[]> {
    const { search, status } = tasksFilterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const result = await query.getMany();
    return result;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });
    const result = await this.save(task);
    return result;
  }
}
