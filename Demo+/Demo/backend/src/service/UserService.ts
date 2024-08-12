import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  private readonly userRepository: Repository<User>;
  
  constructor() {
    // 在构造函数中初始化属性
    this.userRepository = {} as Repository<User>;
  }
  async registerUser(user: User): Promise<User> {
    // Hash the password before saving
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.save(user);
  }

  async loginUser(user: User): Promise<{ token: string }> {
    // Find the user by username
    const foundUser = await this.userRepository.findOne({ where: { username: user.username } });
    if (!foundUser || !(await bcrypt.compare(user.password, foundUser.password))) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: foundUser.id }, 'yourSecretKey', { expiresIn: '1h' });
    return { token };
  }

  async getUserById(userId: number): Promise<User> {
    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;  }
}
