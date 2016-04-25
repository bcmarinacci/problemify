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
    // filter pathnames that contain '.git'
    filter(input) {
      return !(/\.git/g.test(input));
    },
    transform(fileReadable, fileWriteable) {
      counter++;

      fileReadable.on('data', chunk => fileWriteable.write(cb(chunk.toString())));
      fileReadable.on('error', err => console.error(err));
      fileWriteable.on('error', err => console.error(err));
      fileReadable.on('end', () => {
        const srcName = fileReadable.path;
        const srcIndex = srcName.lastIndexOf(rootDirname);
        const destName = fileWriteable.path;
        const destIndex = destName.lastIndexOf(rootDirname);
        console.log(`${srcName.slice(srcIndex)} → ${destName.slice(destIndex)}`);
        fileWriteable.end();
      });
    }
  };

  await pify(ncp)(srcDir, destDir, ncpOptions);

  return counter;
};

const cliInput = formatPath(cli.input[0]);
const problemDest = `${cliInput}-problem`;
const solutionDest = `${cliInput}-solution`;

(async () => {
  try {
    let filesCopied = await problemify(cliInput, problemDest, prepareProblem);
    filesCopied += await problemify(cliInput, solutionDest, prepareSolution);
    console.log(chalk.blue(`\n${filesCopied} files were successfully created.`));
  } catch (err) {
    console.log(chalk.yellow("Something went wrong. See 'problemify --help' for usage information."));
    console.error(chalk.red(err.stack));
    process.exit(1);
  }
})();
