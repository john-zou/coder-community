# `localhost:3001/api/dev`

This module is for convenience end points for development, such as user creation, token creation, etc.

The easiest way to use these is to use the Swagger API Document UI: `localhost:3001/api`.

- For example, go to the Dev section and click "Try it out" then "Execute".
  - If you get `TypeError: Failed to Fetch`, it might mean your back end is not running.

There may be some "dev" endpoints elsewhere but I will try to consolidate them here, so that, when deploying, we can remove `DevModule` from `AppModule`'s `imports` to easily get rid of these.
