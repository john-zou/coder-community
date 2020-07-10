# Coder Community Back End

[![Generic badge](https://img.shields.io/badge/Runtime-Node%20JS-green.svg)](https://nodejs.org/en/)
[![Generic badge](https://img.shields.io/badge/Framework-Express%20JS-blue.svg)](https://expressjs.com/)
[![Generic badge](https://img.shields.io/badge/DB-MongoDB-green.svg)](https://www.mongodb.com/)

[![Generic badge](https://img.shields.io/badge/Language-TS-blue.svg)](https://www.typescriptlang.org/)
[![Generic badge](https://img.shields.io/badge/Architecture-Nest%20JS-red.svg)](https://nestjs.com/)
[![Generic badge](https://img.shields.io/badge/OpenAPI-%203-green.svg)](https://swagger.io/specification/)

## Installation

```bash
yarn install
```

## Running the server on port 3001

```bash
# development (watch mode)
yarn start

# production
yarn start:prod
```

## Generating `frontend/src/api` code

```bash
yarn gen
```

#### Note: Any Data Transfer Objects with both key `id` and type `string` will be transformed to `_id` in order to fix [this](https://github.com/john-zou/coder-community/issues/99). So, please do not use `id` as a key in any request or response, as it will break the code generation!

## Generating `backend/docs` (English)

```bash
yarn doc

```

See backend/docs/index.html

## Generating `backend/docs-cn` (Chinese)

```bash
yarn doc:cn
```

See backend/docs-cn/index.html

## MongoDB; Environment Variables

- This project is configured to use `.env`. Copy paste it to your repo locally (get it from our Slack/Whatsapp). It needs to end up at `backend/.env`
- Usage of Local MongoDB is the default setting. To change to remote, change `USE_LOCAL_MONGODB=true` to `USE_LOCAL_MONGODB=false` in `.env`
- We use a library for Mongoose called [Typegoose](https://github.com/typegoose/typegoose).
  - To create a model, see any of the `.schema.ts` files, such as [user.schema.ts](https://github.com/john-zou/coder-community/blob/master/backend/src/user/user.schema.ts)
  - Then, add it to `backend/mongoModels.ts` like the other models have been
  - To use the model, treat it as a global variable, like `UserModel.find({_id: "12345678"})` or `new UserModel({userID: "example"})`

## Authentication

- See `backend/src/auth/README.md`

## Test

```bash
# unit tests (watch mode)
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Create NestJS module

```bash
nest generate module [module_name]
```

Shorthand:

```bash
nest g mo [module_name]
```

If the above doens't work, then do the below:

```bash
yarn nestgen module [module_name]
```

Can also do co (controller), service, etc.
