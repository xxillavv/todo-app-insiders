import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto.js';
import { ACCESS_TOKEN_COOKIE } from './auth.constants.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.register(dto.email, dto.password)

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.login(dto.email, dto.password)

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE, {
      httpOnly: true,
      sameSite: 'lax',
    })
  }
}
