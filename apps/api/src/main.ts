/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  const config = new DocumentBuilder()
    .setTitle('Starter')
    .setDescription('The starter API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
