'use strict';

const ncp = require('ncp');
const pify = require('pify');
const rejectGitignore = require('../lib/rejectGitignore');

module.exports = function (srcDir, destDir, transformFn) {
  // match root directory name without slashes
  const regex = /.*?\/*([^<>:"\/\\|?*]+)\/*$/;
  const rootDirname = srcDir.replace(regex, '$1');
  let fileCount = 0;
  const ncpOptions = {
    stopOnErr: true,
    filter: rejectGitignore,
    transform(fileReadable, fileWriteable) {
      let file = '';
      fileReadable.on('data', chunk => {
        file += chunk;
      });

      fileReadable.on('end', () => {
        const srcName = fileReadable.path;
        const srcIndex = srcName.lastIndexOf(rootDirname);
        const destName = fileWriteable.path;
        const destIndex = destName.lastIndexOf(rootDirname);
        console.log(`${++fileCount}. ${srcName.slice(srcIndex)} → ${destName.slice(destIndex)}`);
        fileWriteable.end(transformFn(file));
      });

      fileReadable.on('error', err => {
        throw err;
      });

      fileWriteable.on('error', err => {
        throw err;
      });
    }
  };

  return pify(ncp)(srcDir, destDir, ncpOptions);
};
