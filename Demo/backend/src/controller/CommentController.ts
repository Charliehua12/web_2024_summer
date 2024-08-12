import { Controller, Get, Post, Put, Del, Param, Body } from '@midwayjs/decorator';
import { CommentService } from '../service/CommentService';
import { Comment } from '../entity/Comment.js';

@Controller('/api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Get('/task/:taskId')
  async getCommentsByTask(@Param('taskId') taskId: number): Promise<Comment[]> {
    return await this.commentService.getCommentsByTask(taskId);
  }

  @Post('/create')
  async createComment(@Body() comment: Comment): Promise<Comment> {
    return await this.commentService.createComment(comment);
  }

  @Put('/update/:id')
  async updateComment(@Param('id') id: number, @Body() comment: Comment): Promise<Comment> {
    return await this.commentService.updateComment(id, comment);
  }

  @Del('/delete/:id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    return await this.commentService.deleteComment(id);
  }
}
