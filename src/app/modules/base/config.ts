import { Application } from 'egg';
import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块的配置
 */
export default (app: Application) => {
  return {
    // 模块名称
    name: '权限管理',
    // 模块描述
    description: '基础的权限管理功能，包括登录，权限校验',
    // 中间件
    globalMiddlewares: [
      'baseAuthorityMiddleware',
      'baseLogMiddleware',
      'baseSwaggerMiddleware',
    ],
    // jwt 生成解密token的
    jwt: {
      // 注意： 最好重新修改，防止破解
      secret: 'JINHAI',
      // token
      token: {
        expire: 200 * 3600,
        refreshExpire: 2400 * 3600 * 15,
      },
    },
  } as ModuleConfig;
};
