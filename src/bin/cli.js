#!/usr/bin/env node

import meow from 'meow';
import {ncp} from 'ncp';
import pify from 'pify';
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
  // TODO: format `srcDir`
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

  await pify(ncp)(srcDir, destDir, ncpOptions);
};

const sourceDirectory = cli.input[0];
console.log('input: ', sourceDirectory);

const problemDestination = `${sourceDirectory}-problem`;
const solutionDestination = `${sourceDirectory}-solution`;

problemify(sourceDirectory, problemDestination, prepareProblem);
problemify(sourceDirectory, solutionDestination, prepareSolution);
