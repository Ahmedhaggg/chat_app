import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("/api/")
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .addBearerAuth()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  
  SwaggerModule.setup('api', app, document);
  await app.listen(config().PORT);
}
bootstrap();
