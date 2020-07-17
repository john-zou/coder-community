// Copies all .ws.dto.ts files from backend/src to frontend/src/ws-dto

/* eslint-disable @typescript-eslint/no-var-requires */
const copy = require('recursive-copy');
const path = require('path');

const options = {
  overwrite: true,
  filter: [
    '**/*.ws.dto.ts',
  ],
  results: true
}

const src = path.join(__dirname, "..", "src");
const dest = path.join(__dirname, "..", "..", "frontend", "src", "ws-dto");
console.log("Copying files ending in .ws.dto.ts to frontend/src/ws-dto ...");
copy(src, dest, options).then(results => {
  console.log("Done! Copied:", results.map(result => ({src: result.src, dest: result.dest})));
});