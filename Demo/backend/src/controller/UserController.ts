import { Controller, Post, Body, Get, Param, Inject } from '@midwayjs/decorator';
import { UserService } from '../service/UserService';
import { User } from '../entity/User';

@Controller('/api/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post('/register')
  async registerUser(@Body() user: User): Promise<User> {
    return this.userService.registerUser(user);
  }

  @Post('/login')
  async loginUser(@Body() user: User): Promise<{ token: string }> {
    return this.userService.loginUser(user);
  }

  @Get('/me/:userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
