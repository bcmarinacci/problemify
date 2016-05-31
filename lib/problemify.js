'use strict';

const { dirname, extname, resolve } = require('path');
const { readFile, stat, writeFile } = require('fs');
const co = require('co');
const mkdirp = require('mkdirp');
const listFilepaths = require('list-filepaths');
const prepareProblem = require('./prepare-problem');
const prepareSolution = require('./prepare-solution');

const mkdirpAsync = function (dirpath) {
  return new Promise((res, rej) => {
    mkdirp(dirpath, (err, made) => {
      if (err) {
        rej(err);
      } else {
        res(made);
      }
    });
  });
};

const readFileAsync = function (filepath, encoding) {
  return new Promise((res, rej) => {
    readFile(filepath, encoding, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
};

const statAsync = function (targetPath) {
  return new Promise((res, rej) => {
    stat(targetPath, (err, stats) => {
      if (err) {
        rej(err);
      } else {
        res(stats);
      }
    });
  });
};

const writeFileAsync = function (filepath, data) {
  return new Promise((res, rej) => {
    writeFile(filepath, data, err => {
      if (err) {
        rej(err);
      } else {
        // Resolve with the original filepath instead of the default value of undefined
        res(filepath);
      }
    });
  });
};

module.exports = co.wrap(function* (directory) {
  const stats = yield statAsync(directory);
  // If `directory` is not a directory
  if (!stats.isDirectory()) {
    // Throw an Error
    // TODO: Consider throwing a custom Error
    throw new Error('Please enter a valid directory.');
  }

  // Get absolute path
  const basepath = resolve(directory);
  // Create an absolute path for the problem directory
  const problemBasepath = `${basepath}-problem`;
  // Create an absolute path for the solution directory
  const solutionBasepath = `${basepath}-solution`;
  // Reject: .git, node_modules, dist, bower_components, tem, temp, jspm_packages, .DS_Store
  const gitIgnoreRegex = /\.git(\/|$)|node_modules(\/|$)|dist(\/|$)|bower_components(\/|$)|temp*(\/|$)|jspm_packages(\/|$)|\.DS_Store/g;
  // Get a list of file paths,
  const filepaths = yield listFilepaths(directory, { reject: gitIgnoreRegex });
  // Create new problem subdirectories using mkdirp and map the results to an array of promises
  const problemPromiseMap = filepaths.map(filepath => {
    // Replace the original base path with the problem base path
    const problemDirpath = dirname(filepath).replace(basepath, problemBasepath);
    return mkdirpAsync(problemDirpath);
  });

  // Create new solution subdirectories using mkdirp and map the results to an array of promises
  const solutionPromiseMap = filepaths.map(filepath => {
    // Replace the original base path with the solution base path
    const solutionDirpath = dirname(filepath).replace(basepath, solutionBasepath);
    return mkdirpAsync(solutionDirpath);
  });

  // Yield both promise maps
  yield Promise.all([...problemPromiseMap, ...solutionPromiseMap]);
  const writePromiseMap = [];
  // For each file path
  for (const filepath of filepaths) {
    const problemFilepath = filepath.replace(basepath, problemBasepath);
    const solutionFilepath = filepath.replace(basepath, solutionBasepath);
    // Get the contents of the original file
    const fileData = yield readFileAsync(filepath, 'utf8');
    // If the file is a JavaScript file
    if (extname(filepath) === '.js') {
      // Transform the contents into a problem version of the file and write the transformed
      // version to the the matching problem directory
      writePromiseMap.push(writeFileAsync(problemFilepath, prepareProblem(fileData)));
      // Transform the contents into a solution version of the file and write the transformed
      // version to the the matching problem directory
      writePromiseMap.push(writeFileAsync(solutionFilepath, prepareSolution(fileData)));
    } else {
      // Write the file data to the problem directory
      writePromiseMap.push(writeFileAsync(problemFilepath, fileData));
      // Write the file data to the solution directory
      writePromiseMap.push(writeFileAsync(solutionFilepath, fileData));
    }
  }

  // Return a list of created files
  return yield Promise.all(writePromiseMap);
});

// console.time('DONE');
// module.exports('./')
//   .then(result => {
//     console.log(result);
//     console.timeEnd('DONE');
//   })
//   .catch(console.error);
