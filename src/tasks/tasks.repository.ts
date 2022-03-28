import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: FilterTasksDto): Promise<Task[]> {
    const { status, search } = filterDto;
    //   Query Builder
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    // Create a DB object - not persist
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // Persist the crated object to DB
    return this.save(task);
  }

  async deleteTask(id: string) {
    const result = await this.delete({ id });
    if (result.affected < 1) {
      throw new NotFoundException(`Task with the id: "${id}" does not exist`);
    }

    // Alternative
    // const task = await this.findOne({ id });
    // if (task) {
    //   return this.remove(task);
    // }
    // throw new NotFoundException(`Task with the id: ${id} does not exist`);
  }
}
