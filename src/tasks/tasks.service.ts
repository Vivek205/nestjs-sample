import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto as UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  // getAllTasks() {
  //   return this.tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  // getTaskById(id: string) {
  //   const task = this.tasks.find((el) => el.id === id);
  //   if (!task) {
  //     throw new NotFoundException('Task not found');
  //   }
  //   return task;
  // }

  async getTasks(filterDto: FilterTasksDto) {
    return this.taskRepository.getTasks(filterDto);
  }

  // getTasksWithFilter(filterDto: FilterTasksDto) {
  //   const { search, status } = filterDto;
  //   let filteredTasks = [];
  //   if (status) {
  //     filteredTasks = this.tasks.filter((el) => el.status === status);
  //   }
  //   if (search) {
  //     filteredTasks = filteredTasks.filter(
  //       (el) => el.title.includes(search) || el.description.includes(search),
  //     );
  //   }
  //   return filteredTasks;
  // }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  // createTask(createTaskDto: CreateTaskDto) {
  //   const task = {
  //     id: uuid(),
  //     title: createTaskDto.title,
  //     description: createTaskDto.description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    const task = await this.getTaskById(id);
    task.status = updateTaskStatusDto.status;
    await this.taskRepository.save(task);
    return task;
  }

  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
  //   const index = this.tasks.findIndex((el) => el.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException('Task not found');
  //   }
  //   const updatedTask = {
  //     ...this.tasks[index],
  //     status: updateTaskStatusDto.status,
  //   };
  //   this.tasks.splice(index, 1, updatedTask);
  //   return this.tasks[index];
  // }

  async deleteTask(id: string) {
    await this.taskRepository.deleteTask(id);
  }

  // deleteTask(id: string) {
  //   const index = this.tasks.findIndex((el) => el.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException('task not found');
  //   }
  //   this.tasks.splice(index, 1);
  //   return `Deleted task: ${id}`;
  // }
}
