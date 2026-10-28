import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { type AuthenticatedRequest, JwtAuthGuard } from '../auth/guards/auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.sub)
  }
}
