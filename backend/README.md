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

## Test

```bash
# unit tests (watch mode)
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```
