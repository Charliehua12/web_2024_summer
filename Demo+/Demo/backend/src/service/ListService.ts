import { Inject, Provide } from '@midwayjs/decorator';
import { List } from '../entity/List';
import { Repository } from 'typeorm';

@Provide()
export class ListService {
  @Inject()
  listRepository: Repository<List>;
  constructor() {
    // 在构造函数中初始化属性
    this.listRepository = {} as Repository<List>;
  }
  async getListsByUser(userId: number): Promise<List[]> {
    return await this.listRepository.find({ where: { user: { id: userId } }, relations: ['tasks'] });
  }

  async createList(list: List): Promise<List> {
    return await this.listRepository.save(list);
  }
  async updateList(id: number, list: List): Promise<List> {
    await this.listRepository.update(id, list);
    const updatedList = await this.listRepository.findOne({ where: { id }, relations: ['tasks'] });
    if (!updatedList) {
      throw new Error('List not found');
    }
    return updatedList;
  }

  async deleteList(id: number): Promise<void> {
    await this.listRepository.delete(id);
  }
}
