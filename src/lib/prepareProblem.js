import trim from './trimTrailingWhitespace';

export default function (str) {
  // Match anything between and including `// start solution` and `// end solution` as well as `/* start problem` and `end problem */` comments
  const problemRegex = /.*\/\/.*start solution.*\n[\s\S]*?.*\/\/.*end solution.*\n|.*\/\*.*start problem.*\n|.*end problem.*\*\/.*\n/gim;
  const problem = str.replace(problemRegex, '');

  return trim(problem);
}
