import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: 'HZX', // 这里可以是任意字符串，最好是随机生成的字符串
  koa: {
    port: 7001,
  },
  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'huazhen**499',
    database: 'coteam',
    entities: ['./src/entity/*.ts'],// 确保路径正确
    synchronize: true, // 注意：生产环境下建议关闭
    logging: false,
  },
  middleware: [
    'logger', // 确保你有实现并注册了这个中间件
    'errorHandler' // 确保你有实现并注册了这个中间件
  ],
  // 其他配置
} as MidwayConfig;
