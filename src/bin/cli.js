#!/usr/bin/env node

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
  // TODO: log relative paths of files written
  const ncpOptions = {
    stopOnErr: true,
    transform(srcFileStream, destFileStream) {
      let file = '';
      srcFileStream.on('data', chunk => {
        file += chunk;
      });

      srcFileStream.on('end', async () => {
        await pify(destFileStream.write(cb(file)));
        console.log('file written');
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
