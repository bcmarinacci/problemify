'use strict';

const { trailing } = require('trim-whitespace');

const prepareProblem = str => {
  // Match anything between and including `// start solution` and `// end solution` as well as `/* start problem` and `end problem */` comments
  const jsRegex = /.*\/\/.*start solution.*\n[\s\S]*?.*\/\/.*end solution.*\n|.*\/\*.*start problem.*\n|.*end problem.*\*\/.*\n/gim;
  const htmlRegex = /.*<!--.*start solution.*-->.*\n[\s\S]*?.*<!--.*end solution.*-->.*\n|.*<!--.*start problem.*\n|.*end problem.*-->.*\n/gim;
  const problem = str.replace(jsRegex, '').replace(htmlRegex, '');

  return trailing(problem);
};

module.exports = prepareProblem;
