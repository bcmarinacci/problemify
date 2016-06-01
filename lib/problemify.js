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
    mkdirp(dirpath, err => {
      if (err) {
        rej(err);
      } else {
        // Resolve with the original directory path instead of the default value, `made`
        res(dirpath);
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
        // Resolve with the original file path instead of the default value, `undefined`
        res(filepath);
      }
    });
  });
};

module.exports = co.wrap(function* (directory) {
  const stats = yield statAsync(directory);
  if (!stats.isDirectory()) {
    // TODO: Consider throwing a custom Error
    throw new Error('Please enter a valid directory.');
  }

  const basepath = resolve(directory);
  const problemBasepath = `${basepath}-problem`;
  const solutionBasepath = `${basepath}-solution`;
  // Reject: .git, node_modules, dist, bower_components, tem, temp, jspm_packages, .DS_Store
  const gitIgnoreRegex = /\.git(\/|$)|node_modules(\/|$)|dist(\/|$)|bower_components(\/|$)|temp*(\/|$)|jspm_packages(\/|$)|\.DS_Store/g;
  const filepaths = yield listFilepaths(directory, { reject: gitIgnoreRegex });
  const problemPromiseMap = filepaths.map(filepath => {
    const problemDirpath = dirname(filepath).replace(basepath, problemBasepath);
    return mkdirpAsync(problemDirpath);
  });

  const solutionPromiseMap = filepaths.map(filepath => {
    const solutionDirpath = dirname(filepath).replace(basepath, solutionBasepath);
    return mkdirpAsync(solutionDirpath);
  });

  yield Promise.all([...problemPromiseMap, ...solutionPromiseMap]);
  const writePromiseMap = [];
  for (const filepath of filepaths) {
    const problemFilepath = filepath.replace(basepath, problemBasepath);
    const solutionFilepath = filepath.replace(basepath, solutionBasepath);
    const fileData = yield readFileAsync(filepath, 'utf8');
    if (extname(filepath) === '.js') {
      writePromiseMap.push(writeFileAsync(problemFilepath, prepareProblem(fileData)));
      writePromiseMap.push(writeFileAsync(solutionFilepath, prepareSolution(fileData)));
    } else {
      writePromiseMap.push(writeFileAsync(problemFilepath, fileData));
      writePromiseMap.push(writeFileAsync(solutionFilepath, fileData));
    }
  }

  return yield Promise.all(writePromiseMap);
});
