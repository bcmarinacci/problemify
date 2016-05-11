'use strict';

const { trailing } = require('trim-whitespace');

module.exports = function (str) {
  // Match anything between and including `/* start problem` and `end problem */` as well as `// start solution` and `// end solution` comments
  const problemRegex = /.*\/\*.*start problem.*\n[\s\S]*?.*end problem.*\*\/.*\n|.*\/\/.*start solution.*\n|.*\/\/.*end solution.*\n/gim;
  const problem = str.replace(problemRegex, '');

  return trailing(problem);
};
