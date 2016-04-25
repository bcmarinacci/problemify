#!/usr/bin/env node

import chalk from 'chalk';
import meow from 'meow';
import {ncp} from 'ncp';
import pify from 'pify';
import formatPath from '../lib/formatPath';
import prepareProblem from '../lib/prepareProblem';
import prepareSolution from '../lib/prepareSolution';

const problemify = async function (srcDir, destDir, cb) {
  // match root directory name without slashes
  const regex = /.*?\/*([^<>:"\/\\|?*]+)\/*$/;
  const rootDirname = srcDir.replace(regex, '$1');
  const ncpOptions = {
    stopOnErr: true,
    // filter pathnames that contain '.git'
    filter(input) {
      return !(/\.git/g.test(input));
    },
    transform(fileReadable, fileWriteable) {
      let file = '';
      fileReadable.on('data', chunk => {
        file += chunk;
      });

      fileReadable.on('end', () => {
        fileWriteable.write(cb(file));
        const srcName = fileReadable.path;
        const srcIndex = srcName.lastIndexOf(rootDirname);
        const destName = fileWriteable.path;
        const destIndex = destName.lastIndexOf(rootDirname);
        console.log(`${srcName.slice(srcIndex)} → ${destName.slice(destIndex)}`);
        fileWriteable.end();
      });

      fileReadable.on('error', err => console.error(err));
      fileWriteable.on('error', err => console.error(err));
    }
  };

  await pify(ncp)(srcDir, destDir, ncpOptions);
};

const cli = meow(`
  Usage
    $ problemify <directory>

  Example
    $ problemify death-star-plans
    $ ls
    death-star-plans  death-star-plans-problem  death-star-plans-solution
`);

const cliInput = formatPath(cli.input[0]);
const problemDest = `${cliInput}-problem`;
const solutionDest = `${cliInput}-solution`;

(async () => {
  try {
    await problemify(cliInput, problemDest, prepareProblem);
    await problemify(cliInput, solutionDest, prepareSolution);
  } catch (err) {
    console.log(chalk.yellow("Something went wrong. See 'problemify --help' for usage information."));
    console.error(chalk.red(err.stack || err));
    process.exit(1);
  }
})();
