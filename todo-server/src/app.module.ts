import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtSignOptions } from "@nestjs/jwt"
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), JwtModule.registerAsync({
    global: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.getOrThrow<JwtSignOptions['expiresIn']>('JWT_EXPIRES_IN'),
      },
    }),
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
