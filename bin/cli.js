#!/usr/bin/env node
'use strict';

const args = require('args');
const chalk = require('chalk');
const formatPath = require('../lib/formatPath');
const prepareProblem = require('../lib/prepareProblem');
const prepareSolution = require('../lib/prepareSolution');
const copyDirectory = require('../lib/copy-directory');

args
  .command('<directory>', 'The directory to copy')
  .parse(process.argv);

const argv = args.sub;
if (argv.length === 0) {
  args.showHelp();
}

const formattedInput = formatPath(argv[0]);
const problemDest = `${formattedInput}-problem`;
const solutionDest = `${formattedInput}-solution`;
copyDirectory(formattedInput, problemDest, prepareProblem)
  .then(() => copyDirectory(formattedInput, solutionDest, prepareSolution))
  .catch(err => {
    console.log(chalk.yellow("Something went wrong. See 'problemify --help' for usage information."));
    console.error(chalk.red(err.stack || err));
    process.exit(1);
  });
