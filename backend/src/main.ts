require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { initializeMongo } from './mongoModels';
import { Secrets } from './secrets';

async function bootstrap() {
  // Connect to MongoDB and set up Models.
  await initializeMongo(Secrets.MongoConnectionString);

  const app = await NestFactory.create(AppModule);

  // CORS -- change origin to 
  app.enableCors(
    { origin: 'http://localhost:3000' }
  )
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Coder Community')
    .setDescription('The Coder Community API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
