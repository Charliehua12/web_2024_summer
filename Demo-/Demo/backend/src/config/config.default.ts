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
    password: 'huazhen**499',
    database: 'coteam',
    synchronize: true, // 在生产环境中建议将其设为 false
    logging: false,
  },
} as MidwayConfig;
