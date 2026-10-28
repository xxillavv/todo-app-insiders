import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  private static readonly SALT_ROUNDS = 10;

  constructor(private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async register(userEmail: string, userPassword: string) {
    const isExist = await this.prisma.user.findUnique({
      where: { email: userEmail }
    })

    if (isExist) throw new ConflictException('User with this email already exists')

    const hashPassword = await bcrypt.hash(userPassword, AuthService.SALT_ROUNDS)

    const user = await this.prisma.user.create({
      data: {
        email: userEmail,
        passwordHash: hashPassword
      }
    })

    return this.signToken(user.id, user.email)
  }

  async login(userEmail: string, userPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail }
    })

    const isPasswordValid = user && await bcrypt.compare(userPassword, user.passwordHash)

    if (!user || !isPasswordValid) throw new UnauthorizedException('Invalid email or password')

    return this.signToken(user.id, user.email)
  }

  private async signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email
    }

    const accessToken = await this.jwt.signAsync(payload)

    return { accessToken }
  }
}
