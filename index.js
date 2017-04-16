'use strict';

const { dirname, extname, resolve } = require('path');
const { readFile, stat, writeFile } = require('fs');
const co = require('co');
const mkdirp = require('mkdirp');
const listFilepaths = require('list-filepaths');
const prepareProblem = require('./lib/prepare-problem');
const prepareSolution = require('./lib/prepare-solution');

const mkdirpAsync = function (dirpath) {
  return new Promise((res, rej) => {
    mkdirp(dirpath, (err, made) => {
      /* istanbul ignore if */
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
      /* istanbul ignore if */
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
      /* istanbul ignore if */
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
      /* istanbul ignore if */
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
    throw new TypeError(`not a valid directory, ${directory}`);
  }

  const basepath = resolve(directory);
  const problemBasepath = `${basepath}-problem`;
  const solutionBasepath = `${basepath}-solution`;
  // Reject: .git, node_modules, dist, bower_components, tem, temp, jspm_packages, .DS_Store
  const gitIgnoreRegex = /\.git(\/|$)|node_modules(\/|$)|dist(\/|$)|bower_components(\/|$)|temp*(\/|$)|jspm_packages(\/|$)|\.DS_Store/g;
  const filepaths = yield listFilepaths(directory, { reject: gitIgnoreRegex });
  const problemPromiseMap = filepaths.map(filepath => {
    const problemDirpath = dirname(filepath).replace(basepath, problemBasepath);
    const problemFilepath = filepath.replace(basepath, problemBasepath);
    return mkdirpAsync(problemDirpath)
      .then(() => readFileAsync(filepath, 'utf8'))
      .then(fileData => {
        if (extname(filepath) === '.js' || extname(filepath) === '.html') {
          return writeFileAsync(problemFilepath, prepareProblem(fileData));
        }

        return writeFileAsync(problemFilepath, fileData);
      });
  });

  const solutionPromiseMap = filepaths.map(filepath => {
    const solutionDirpath = dirname(filepath).replace(basepath, solutionBasepath);
    const solutionFilepath = filepath.replace(basepath, solutionBasepath);
    return mkdirpAsync(solutionDirpath)
      .then(() => readFileAsync(filepath, 'utf8'))
      .then(fileData => {
        if (extname(filepath) === '.js' || extname(filepath) === '.html') {
          return writeFileAsync(solutionFilepath, prepareSolution(fileData));
        }

        return writeFileAsync(solutionFilepath, fileData);
      });
  });

  return Promise.all([...problemPromiseMap, ...solutionPromiseMap]);
});
