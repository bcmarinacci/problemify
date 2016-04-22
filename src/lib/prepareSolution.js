import trim from './trimTrailingWhitespace';

export default str => {
  // Match anything between and including `/* start problem` and `end problem */` as well as `// start solution` and `// end solution` comments
  const problemRegex = /.*\/\*.*start problem.*\n[\s\S]*?.*end problem.*\*\/.*\n|.*\/\/.*start solution.*\n|.*\/\/.*end solution.*\n/gim;
  const problem = str.replace(problemRegex, '');

  return trim(problem);
};
