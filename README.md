# problemify [![Build Status](https://travis-ci.org/bcmarinacci/problemify.svg?branch=master)](https://travis-ci.org/bcmarinacci/problemify) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Create a problem and a solution version of a repository.

Automatically exlcluded project components:
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

### Problem comment syntax

Wrap problem code with `/* start problem` and `end problem */` comments.

```javascript
/* start problem
function print(value) {
  // your code here

}
end problem */
```

### Solution comment syntax

Wrap solution code with `// start solution` and `// end solution` comments.

```javascript
// start solution
function print(value) {
  console.log(value)
}
// end solution
```

## Example

### kessel-run

```javascript
// start solution
function print(value) {
  console.log(value)
}
// end solution
/* start problem
function print(value) {
  // your code here

}
end problem */

const pilot = 'Han Solo'
print(pilot)
// → Han Solo
```

### kessel-run-problem

```javascript
function print(value) {
  // your code here

}

const pilot = 'Han Solo'
print(pilot)
// → Han Solo
```

### kessel-run-solution

```javascript
function print(value) {
  console.log(value)
}

const pilot = 'Han Solo'
print(pilot)
// → Han Solo
```
