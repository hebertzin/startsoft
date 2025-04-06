import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './middlewares/ExceptionMiddleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = new DocumentBuilder()
    .setTitle('starsoft challenge')
    .setDescription(
      'Technical test documentation for bakend developer at starsoft',
    )
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix('/api/v1');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
