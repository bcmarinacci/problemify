# problemify

[![Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

> Create a problem and a solution version of a repository

The following project components are automatically excluded:
- .DS_Store
- .git
- bower_components
- dist
- jspm_packages
- node_modules
- tem
- temp

## Install

```bash
$ npm install -g problemify
```

## Usage

```bash
$ problemify <repository>
```

### Problem code

Wrap problem code with `/* start problem` and `end problem */` comments.

```javascript
/* start problem
const print = function (value) {
  // your code here

};
end problem */
```

### Solution code

Wrap solution code with `// start solution` and `// end solution` comments.

```javascript
// start solution
const print = function (value) {
  console.log(value);
};
// end solution
```

## Examples

```bash
$ problemify kessel-run
$ ls
kessel-run    kessel-run-problem    kessel-run-solution
```

### kessel-run

```javascript
// start solution
const print = function (value) {
  console.log(value);
};
// end solution
/* start problem
const print = function (value) {
  // your code here

};
end problem */

const pilot = 'Han Solo';
print(pilot);
// Han Solo
```

### kessel-run-problem

```javascript
const print = function (value) {
  // your code here

};

const pilot = 'Han Solo';
print(pilot);
// Han Solo
```

### kessel-run-solution

```javascript
const print = function (value) {
  console.log(value);
};

const pilot = 'Han Solo';
print(pilot);
// Han Solo
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/problemify.svg
[npm-url]: https://www.npmjs.com/package/problemify
[travis-image]: https://travis-ci.org/bcmarinacci/problemify.svg?branch=master
[travis-url]: https://travis-ci.org/bcmarinacci/problemify
[coveralls-image]: https://coveralls.io/repos/github/bcmarinacci/problemify/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/bcmarinacci/problemify?branch=master
