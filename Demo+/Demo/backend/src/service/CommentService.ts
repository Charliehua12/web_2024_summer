import { Inject, Provide } from '@midwayjs/decorator';
import { Comment } from '../entity/Comment.js';
import { Repository } from 'typeorm';

@Provide()
export class CommentService {
  @Inject()
  private readonly commentRepository: Repository<Comment>;
  constructor() {
    // 在构造函数中初始化属性
    this.commentRepository = {} as Repository<Comment>;
  }
  async getCommentsByTask(taskId: number): Promise<Comment[]> {
    return await this.commentRepository.find({ where: { task: { id: taskId } } });
  }

  async createComment(comment: Comment): Promise<Comment> {
    return await this.commentRepository.save(comment);
  }

  async updateComment(id: number, comment: Comment): Promise<Comment> {
    await this.commentRepository.update(id, comment);
    const updatedComment = await this.commentRepository.findOne({ where: { id } });
    if (!updatedComment) {
      throw new Error('Comment not found');
    }
    return updatedComment;
  }

  async deleteComment(id: number): Promise<void> {
    const deleteResult = await this.commentRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error('Comment not found');
    }
  }
}
