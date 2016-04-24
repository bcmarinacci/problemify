#!/usr/bin/env node

import chalk from 'chalk';
import meow from 'meow';
import {ncp} from 'ncp';
import pify from 'pify';
import formatPath from '../lib/formatPath';
import prepareProblem from '../lib/prepareProblem';
import prepareSolution from '../lib/prepareSolution';

const cli = meow(`
  Usage
    $ problemify <directory>

  Example
    $ problemify death-star-plans
    $ ls
    death-star-plans  death-star-plans-problem  death-star-plans-solution
`);

const problemify = async function (srcDir, destDir, cb) {
  // match root directory name without slashes
  const regex = /.*?\/*([^<>:"\/\\|?*]+)\/*$/;
  const rootDirname = srcDir.replace(regex, '$1');
  const ncpOptions = {
    stopOnErr: true,
    transform(fileReadable, fileWriteable) {
      const srcName = fileReadable.path;
      const srcIndex = srcName.lastIndexOf(rootDirname);
      const destName = fileWriteable.path;
      const destIndex = destName.lastIndexOf(rootDirname);
      const output = chalk.blue(`${srcName.slice(srcIndex)} → ${destName.slice(destIndex)}`);
      console.log(output);

      fileReadable.on('data', chunk => fileWriteable.write(cb(chunk.toString())));
      fileReadable.on('end', () => fileWriteable.end());
      fileReadable.on('error', err => console.error(err));
      fileWriteable.on('error', err => console.error(err));
    }
  };

  await pify(ncp)(srcDir, destDir, ncpOptions);
};

const sourceDirectory = formatPath(cli.input[0]);
const problemDestination = `${sourceDirectory}-problem`;
const solutionDestination = `${sourceDirectory}-solution`;

(async () => {
  try {
    await problemify(sourceDirectory, problemDestination, prepareProblem);
    await problemify(sourceDirectory, solutionDestination, prepareSolution);
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
})();
