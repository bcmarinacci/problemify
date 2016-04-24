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
`, {
  string: ['_']
});

const problemify = async function (srcDir, destDir, cb) {
  // match root directory name without slashes
  const regex = /.*?\/*([^<>:"\/\\|?*]+)\/*$/;
  const rootDirname = srcDir.replace(regex, '$1');
  const ncpOptions = {
    stopOnErr: true,
    transform(srcFileStream, destFileStream) {
      let file = '';
      srcFileStream.on('data', chunk => {
        file += chunk;
      });

      srcFileStream.on('end', async () => {
        await pify(destFileStream.write(cb(file)));
        const srcName = srcFileStream.path;
        const srcIndex = srcName.lastIndexOf(rootDirname);
        const destName = destFileStream.path;
        const destIndex = destName.lastIndexOf(rootDirname);
        const output = chalk.blue(`${srcName.slice(srcIndex)} → ${destName.slice(destIndex)}`);
        console.log(output);
      });
    }
  };

  try {
    await pify(ncp)(srcDir, destDir, ncpOptions);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const sourceDirectory = formatPath(cli.input[0]);
const problemDestination = `${sourceDirectory}-problem`;
const solutionDestination = `${sourceDirectory}-solution`;

problemify(sourceDirectory, problemDestination, prepareProblem);
problemify(sourceDirectory, solutionDestination, prepareSolution);
