import { Inject, Provide } from '@midwayjs/decorator';
import { Task } from '../entity/Task';
import { Repository } from 'typeorm';

@Provide()
export class TaskService {
  @Inject()
  taskRepository: Repository<Task>;
  constructor() {
    // 在构造函数中初始化属性
    this.taskRepository = {} as Repository<Task>;
  }
  async getTasksByList(listId: number): Promise<Task[]> {
    return await this.taskRepository.find({ where: { list: { id: listId } }, relations: ['comments'] });
  }

  async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, task: Task): Promise<Task> {
    await this.taskRepository.update(id, task);
    const updatedTask = await this.taskRepository.findOne({ where: { id }, relations: ['comments'] });
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  }
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
