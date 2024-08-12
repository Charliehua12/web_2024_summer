import { Controller, Get, Post, Put, Del, Param, Body } from '@midwayjs/decorator';
import { ListService } from '../service/ListService';
import { List } from '../entity/List';

@Controller('/api/list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/user/:userId')
  async getListsByUser(@Param('userId') userId: number): Promise<List[]> {
    return await this.listService.getListsByUser(userId);
  }

  @Post('/create')
  async createList(@Body() list: List): Promise<List> {
    return await this.listService.createList(list);
  }

  @Put('/update/:id')
  async updateList(@Param('id') id: number, @Body() list: List): Promise<List> {
    return await this.listService.updateList(id, list);
  }

  @Del('/delete/:id')
  async deleteList(@Param('id') id: number): Promise<void> {
    return await this.listService.deleteList(id);
  }
}
