import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule ,{
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors();
  app.setGlobalPrefix('api'); // prefix 설정
  app.useGlobalPipes(new ValidationPipe({transform: true})); // Validate with 자동 변환 처리

  const config = new DocumentBuilder()
    .setTitle('Workplace Exporter')
    .setDescription("Export tool for workplace's group posts")
    .setVersion('1.0')
    .addTag('workplace')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
