'use strict';

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const listFilepaths = require('list-filepaths');
const prepareProblem = require('./lib/prepare-problem');
const prepareSolution = require('./lib/prepare-solution');

const mkdirpAsync = dirpath => {
  return new Promise((resolve, reject) => {
    mkdirp(dirpath, (err, made) => {
      /* istanbul ignore if */
      if (err) {
        reject(err);
      } else {
        resolve(made);
      }
    });
  });
};

const readFileAsync = (filepath, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err, data) => {
      /* istanbul ignore if */
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const statAsync = targetPath => {
  return new Promise((resolve, reject) => {
    fs.stat(targetPath, (err, stats) => {
      /* istanbul ignore if */
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};

const writeFileAsync = (filepath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, err => {
      /* istanbul ignore if */
      if (err) {
        reject(err);
      } else {
        // Resolve with the original file path instead of the default value, `undefined`
        resolve(filepath);
      }
    });
  });
};

const problemify = async directory => {
  const stats = await statAsync(directory);
  if (!stats.isDirectory()) {
    throw new TypeError(`not a valid directory, ${directory}`);
  }

  const basepath = path.resolve(directory);
  const problemBasepath = `${basepath}-problem`;
  const solutionBasepath = `${basepath}-solution`;
  // Reject: .git, node_modules, dist, bower_components, tem, temp, jspm_packages, .DS_Store
  const gitIgnoreRegex = /\.git(\/|$)|node_modules(\/|$)|dist(\/|$)|bower_components(\/|$)|temp*(\/|$)|jspm_packages(\/|$)|\.DS_Store/g;
  const filepaths = await listFilepaths(directory, { reject: gitIgnoreRegex });
  const problemPromiseMap = filepaths.map(filepath => {
    const problemDirpath = path
      .dirname(filepath)
      .replace(basepath, problemBasepath);
    const problemFilepath = filepath.replace(basepath, problemBasepath);
    return mkdirpAsync(problemDirpath)
      .then(() => readFileAsync(filepath, 'utf8'))
      .then(fileData => {
        if (
          path.extname(filepath) === '.js' || path.extname(filepath) === '.html'
        ) {
          return writeFileAsync(problemFilepath, prepareProblem(fileData));
        }

        return writeFileAsync(problemFilepath, fileData);
      });
  });

  const solutionPromiseMap = filepaths.map(filepath => {
    const solutionDirpath = path
      .dirname(filepath)
      .replace(basepath, solutionBasepath);
    const solutionFilepath = filepath.replace(basepath, solutionBasepath);
    return mkdirpAsync(solutionDirpath)
      .then(() => readFileAsync(filepath, 'utf8'))
      .then(fileData => {
        if (
          path.extname(filepath) === '.js' || path.extname(filepath) === '.html'
        ) {
          return writeFileAsync(solutionFilepath, prepareSolution(fileData));
        }

        return writeFileAsync(solutionFilepath, fileData);
      });
  });

  return Promise.all([...problemPromiseMap, ...solutionPromiseMap]);
};

module.exports = problemify;
