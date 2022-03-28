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
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() filterTasksDto: FilterTasksDto) {
    return this.tasksService.getTasks(filterTasksDto);
  }

  // @Get()
  // getTasks(@Query() filterTasksDto: FilterTasksDto) {
  //   // if it contains search/filter , then use getTasksWithFilter
  //   if (Object.keys(filterTasksDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterTasksDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  // @Get(':id')
  // getTask(@Param('id') id: string) {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto) {
  //   // Alternative (2): descructuring body for each paramater
  //   // createTask(
  //   //   @Body('title') title: string,
  //   //   @Body('description') description: string,
  //   // ) {
  //   // Alternative (3) way to use body - the entire body object
  //   // createTask(@Body() body) {
  //   //
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
