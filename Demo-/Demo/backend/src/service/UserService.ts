import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../dto/user.dto';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async register(userDto: UserDTO) {
    const { username, password } = userDto;
    const existingUser = await this.userModel.findOne({ where: { username } });
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;

    await this.userModel.save(newUser);
    return { success: true };
  }

  async login(userDto: UserDTO) {
    const { username, password } = userDto;
    const user = await this.userModel.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, message: 'Invalid username or password' };
    }

    // 可以在此处生成JWT令牌
    return { success: true, userId: user.id };
  }

  async getUser(uid: number) {
    return await this.userModel.findOne({ where: { id: uid } });
  }
}