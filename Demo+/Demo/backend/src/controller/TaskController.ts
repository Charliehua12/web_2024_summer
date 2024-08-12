import { Controller, Get, Post, Put, Del, Param, Body } from '@midwayjs/decorator';
import { TaskService } from '../service/TaskService';
import { Task } from '../entity/Task';

@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/list/:listId')
  async getTasksByList(@Param('listId') listId: number): Promise<Task[]> {
    return await this.taskService.getTasksByList(listId);
  }

  @Post('/create')
  async createTask(@Body() task: Task): Promise<Task> {
    return await this.taskService.createTask(task);
  }

  @Put('/update/:id')
  async updateTask(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    return await this.taskService.updateTask(id, task);
  }

  @Del('/delete/:id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.taskService.deleteTask(id);
  }
}
