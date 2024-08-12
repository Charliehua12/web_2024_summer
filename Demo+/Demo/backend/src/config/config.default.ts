import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/User'; // 确保路径正确
import { List } from '../entity/List';
import { Task } from '../entity/Task';
import { Comment } from '../entity/Comment';

export default {
  // 用于 cookie 签名的密钥，请更换为你自己的
  keys: 'HZX',
  koa: {
    port: 7001, // Koa 服务器的端口号
  },
  cors: {
    origin: "*", // 配置 CORS 允许所有来源
  },
  typeorm: {
    type: 'mysql', // 数据库类型
    host: 'localhost', // 数据库主机
    port: 3306, // 数据库端口
    username: 'root', // 数据库用户名
    password: 'huazhen**499', // 数据库密码
    database: 'coteam', // 要连接的数据库名称
    synchronize: true, // 在开发环境下建议开启，生产环境关闭
    logging: false, // 是否开启日志记录
    entities: [User, List, Task, Comment], // 实体路径配置
    dataSource: {
      // 这里可以定义多个数据源
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'huazhen**499',
        database: 'coteam',
        entities: [User, List, Task, Comment], // 实体路径配置
      },
    },
  },
  middleware: [
    'logger', // 日志中间件
    'errorHandler', // 错误处理中间件
  ],
} as MidwayConfig;
