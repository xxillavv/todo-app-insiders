import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser())
  app.enableCors({
    origin: config.getOrThrow<string>('CLIENT_URL'),
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(config.getOrThrow<string>('PORT'));
}
await bootstrap();
