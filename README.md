# problemify [![Build Status](https://travis-ci.org/bcmarinacci/problemify.svg?branch=master)](https://travis-ci.org/bcmarinacci/problemify)

> Create a problem and a solution version of a repository.

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
npm install -g problemify
```

## Usage

```bash
$ problemify --help

  Usage
    $ problemify <repository>

  Example
    $ problemify kessel-run
    $ ls
    kessel-run    kessel-run-problem    kessel-run-solution
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

## Example

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
