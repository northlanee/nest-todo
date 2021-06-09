import { TasksFilterDto } from './dto/tasksFilter.dto';
import { Task, TaskStatus } from './task.modal';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  getTasks(@Query() tasksFilterDto: TasksFilterDto): Task[] {
    return this.tasksService.getTasks(tasksFilterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(Number(id));
  }

  @Post('/')
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatus(Number(id), status);
  }
}
