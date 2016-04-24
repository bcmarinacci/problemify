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
  let counter = 0;
  const ncpOptions = {
    stopOnErr: true,
    transform(fileReadable, fileWriteable) {
      counter++;

      fileReadable.on('data', chunk => fileWriteable.write(cb(chunk.toString())));
      fileReadable.on('end', () => fileWriteable.end());
      fileReadable.on('error', err => console.error(err));
      fileWriteable.on('error', err => console.error(err));

      const srcName = fileReadable.path;
      const srcIndex = srcName.lastIndexOf(rootDirname);
      const destName = fileWriteable.path;
      const destIndex = destName.lastIndexOf(rootDirname);
      console.log(`${srcName.slice(srcIndex)} → ${destName.slice(destIndex)}`);
    }
  };

  await pify(ncp)(srcDir, destDir, ncpOptions);

  return counter;
};

const sourceDirectory = formatPath(cli.input[0]);
const problemDestination = `${sourceDirectory}-problem`;
const solutionDestination = `${sourceDirectory}-solution`;

(async () => {
  try {
    let filesCopied = await problemify(sourceDirectory, problemDestination, prepareProblem);
    filesCopied += await problemify(sourceDirectory, solutionDestination, prepareSolution);
    console.log(chalk.blue(`${filesCopied} files were successfully transferred.`));
  } catch (err) {
    console.log(chalk.yellow("Something went wrong. See 'problemify --help' for usage information."));
    console.error(chalk.red(err.stack));
    process.exit(1);
  }
})();
