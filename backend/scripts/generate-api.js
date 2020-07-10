/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { NestFactory } = require('@nestjs/core');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const { AppModule } = require('../dist/app.module');
const axios = require('axios');
const fs = require('fs');
const extract = require('extract-zip');
const lineReplace = require('line-replace');
const replaceInFile = require('replace-in-file');

const endpoint = 'https://generator3.swagger.io/api/generate';
const dest = __dirname + '/generated-api-client.zip';

console.log(
  'Processing back end controllers, DTOs, models to generate API document...',
);

(async () => {
  // Create Swagger (OpenAPI) document
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('Coder Community')
    .setDescription('The Coder Community API description')
    .setVersion('0.0.2')
    .addServer('http://localhost:3001')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  console.log('Done!');

  // Send to swagger.io
  const data = {
    spec: document,
    type: 'CLIENT',
    lang: 'typescript-fetch',
  };

  console.log('Requesting generated SDK from swagger.io...');
  const response = await axios.post(endpoint, data, {
    responseType: 'arraybuffer',
  });
  console.log('Done!');

  // Save to file locally
  console.log('Creating ' + dest);

  fs.writeFileSync(dest, response.data);
  console.log('Done!');

  // Extract
  console.log('Extracting...');
  await extract(dest, {
    dir: __dirname + '../../../frontend/src/api',
  });
  console.log('Done!');

  console.log('Manually replacing " id: string; " to " _id: string; " in api.ts');
  const replaceOptionsForId = {
    files: __dirname + '../../../frontend/src/api/api.ts',
    from: / id: string;/g,
    to: ' _id: string; // modified by backend/scripts/generate-api.js'
  }
  console.log('Replacement results:', await replaceInFile(replaceOptionsForId));
  console.log('Done!');

  console.log('Manually replacing " _private: boolean; " to " private: boolean; " in api.ts')
  const replaceOptionsForPrivate = {
    files: __dirname + '../../../frontend/src/api/api.ts',
    from: / _private: boolean;/g,
    to: ' private: boolean; // modified by backend/scripts/generate-api.js'
  }
  console.log('Replacement results:', await replaceInFile(replaceOptionsForPrivate));

  console.log('Done!');

  console.log(
    'Modifying line 16 of api.ts so that the helper functions automatically include user token',
  );
  lineReplace({
    file: __dirname + '../../../frontend/src/api/api.ts',
    line: 16,
    text: `import portableFetch from "../api-auth/fetch-container"; // modified by backend/scripts/generate-api.js`,
    addNewLine: true,
    callback: () => {
      console.log('Done!');
    },
  });

  console.log('Done!');

  console.log(
    'frontend/src/api now contains up-to-date Typescript fetch helpers for the back end endpoints. Can safely exit if it hasnt exited',
  );
})();
