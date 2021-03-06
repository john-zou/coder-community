import { Logger } from '@nestjs/common';

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { initializeMongo } from './mongoModels';
import { Secrets } from './secrets';
import { initializeStorageDirectories } from './storage/initializeStorageDirectories';
import { GlobalRedirectForReact } from './GlobalRedirectForReact';


async function bootstrap() {
  // Connect to MongoDB and set up Models.
  await initializeMongo(Secrets.MongoConnectionString);

  initializeStorageDirectories();

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalRedirectForReact());

  // CORS
  app.enableCors(
    { origin: 'http://localhost:3000' }
  )
  app.setGlobalPrefix('api');


  const options = new DocumentBuilder()
    .setTitle('Coder Community')
    .setDescription('The Coder Community API description')
    .setVersion('0.0.3')
    .addServer('http://ec2-13-229-215-75.ap-southeast-1.compute.amazonaws.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
