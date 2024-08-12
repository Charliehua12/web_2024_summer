import { Configuration, App } from '@midwayjs/core';
import * as orm from '@midwayjs/orm';
import * as koa from '@midwayjs/koa';
import { join } from 'path';
import * as cors from '@koa/cors';

@Configuration({
  imports: [koa, orm],
  importConfigs: [
    join(__dirname, './config/'), // 指向 src 目录下的 config 文件夹
  ],
})
export class ContainerConfiguration {
  @App()
  app!: koa.Application; // 使用非空断言来告诉 TypeScript 这个属性一定会被赋值

  async onReady() {
    this.app.use(
      cors({
        origin: 'http://localhost:5173', // 允许的前端域名
        credentials: true, // 如果需要发送凭证（如 cookies），将其设置为 true
      })
    );
  }
}
