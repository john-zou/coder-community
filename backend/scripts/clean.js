// Deletes dist, and clears out public, private and tmp directories, other than

/* eslint-disable @typescript-eslint/no-var-requires */
const del = require('del');

console.log('Deleting dist...');
del.sync('./dist');

console.log('Clearing public...');
del.sync(['./public/*'], {
  ignore: ['./public/README.md', './public/**/README.md'],
});

console.log('Clearing private...');
del.sync(['./private/*'], {
  ignore: ['./private/README.md', './private/**/README.md'],
});

console.log('Clearing tmp...');
del.sync(['./tmp/*'], { ignore: ['../tmp/README.md'] });

console.log('All done!');
