import { Controller, Post, Body } from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';  // 确保从正确的包导入 Inject
import { UserService } from '../service/UserService';
import { UserDTO } from '../dto/user.dto';

@Controller('/api/user')
export class UserController {
  @Inject()  // 确保正确使用 Inject 注解
  private userService: UserService;

  @Post('/register')
  async register(@Body() userDto: UserDTO) {
    return await this.userService.register(userDto);
  }

  @Post('/login')
  async login(@Body() userDto: UserDTO) {
    return await this.userService.login(userDto);
  }
}
