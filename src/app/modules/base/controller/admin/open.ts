import {
  Provide,
  Body,
  ALL,
  Inject,
  Post,
  Get,
  Query,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { CoolController, BaseController } from '@cool-midway/core';
import { LoginDTO } from '../../dto/login';
import { BaseSysLoginService } from '../../service/sys/login';

/**
 * 不需要登录的后台接口
 */
@Provide()
@CoolController()
export class BaseOpenController extends BaseController {
  @Inject()
  baseSysLoginService: BaseSysLoginService;

  @Inject()
  ctx: Context;

  @Inject('cool:eps:open')
  eps;

  /**
   * 实体信息与路径
   * @returns
   */
  @Get('/eps', { summary: '实体信息与路径' })
  public async getEps() {
    return this.ok(this.eps);
  }

  /**
   * 登录
   * @param login
   */
  @Post('/login', { summary: '登录' })
  async login(@Body(ALL) login: LoginDTO) {
    return this.ok(await this.baseSysLoginService.login(login));
  }

  /**
   * 获得验证码
   */
  @Get('/captcha', { summary: '验证码' })
  async captcha(
    @Query() type: string,
    @Query() width: number,
    @Query() height: number
  ) {
    return this.ok(await this.baseSysLoginService.captcha(type, width, height));
  }

  /**
   * 刷新token
   */
  @Get('/refreshToken', { summary: '刷新token' })
  async refreshToken(@Query() refreshToken: string) {
    return this.ok(await this.baseSysLoginService.refreshToken(refreshToken));
  }
}
