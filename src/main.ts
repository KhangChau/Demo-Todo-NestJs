import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import mongoose from 'mongoose';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
mongoose.set('debug', true);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useGlobalInterceptors(
    // new PostInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      // excludePrefixes: ['_'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Todos example')
    .setDescription('The Todos API documentations')
    .setVersion('1.0')
    // .addTag('todos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Object.values(document.paths).forEach((path) => {
  //   Object.values(path).forEach((method) => {
  //     if (
  //       Array.isArray(method.security) &&
  //       method.security.includes('public')
  //     ) {
  //       method.security = [];
  //     }
  //   });
  // });
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
