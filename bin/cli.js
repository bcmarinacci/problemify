#!/usr/bin/env node
'use strict';

const args = require('args');
const chalk = require('chalk');
const problemify = require('../index');

args.parse(process.argv, { value: '<directory>' });

const argv = args.sub;

if (argv.length === 0) {
  args.showHelp();
}

problemify(argv[0])
  .then(fileList => {
    fileList.forEach(filepath => console.log(filepath));
  })
  .catch(err => {
    console.log(
      chalk.yellow(
        "Something went wrong. See 'problemify --help' for usage information."
      )
    );
    console.error(chalk.red(err.stack || err));
    process.exit(1);
  });
