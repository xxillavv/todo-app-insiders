import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto.email, dto.password)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() dto: LoginUserDto) {
    return this.authService.login(dto.email, dto.password)
  }
}
