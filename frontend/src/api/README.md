# API Client

This folder contains a client generated using [Swagger Codegen](https://swagger.io/tools/swagger-codegen/).

Running `yarn gen` will create a version consistent with the current back end REST API controllers.

Example Usage:

```typescript
import { PostsApi } from "./api";

// Inside async function
const api = new PostsApi();
await api.PostsControllerCreatePost({title: "Example Post", content: "lorem ipsum", ... }); // The user (author) identity is automatically included in the JWT
```
