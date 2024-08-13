import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: 'HZX', // 用于生成和验证签名 cookie 的密钥

  // Koa 框架的配置
  koa: {
    port: 7001,
  },

  // TypeORM 的配置
  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'huazhen**499', // SOS ！！！ 请修改为自己数据库密码！！！
    database: 'coteam',
    synchronize: true,
    logging: false,
  },
} as MidwayConfig;
