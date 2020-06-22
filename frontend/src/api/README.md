# API Client

This folder contains a client generated using [Swagger Codegen](https://swagger.io/tools/swagger-codegen/).

Running `yarn gen` will create a version consistent with the current back end REST API controllers.

Example Usage:

```typescript
import { AuthenticationApiFp } from "./api";

...

const loginResult = await AuthenticationApiFp().authControllerLoginGitHub({ /* params */ });
```

Notes:

- The 'Fp' stands for **f**unctional **p**rogramming interface; there are alternatives (see `api.ts`)
- Tip: have the back end running (`yarn start` the back end), visit `localhost:3000/api` in the browser to see the API document.
  - In the document, end points are grouped into categories based on the `@ApiTags` decorator in the back end controller code. The generated API client is nested by these tags also, e.g. `<Tag>ApiFp()`
  - The "leaf" functions are named after the controllers followed by controller method.
