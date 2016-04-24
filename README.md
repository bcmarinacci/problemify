# problemify [![Build Status](https://travis-ci.org/bcmarinacci/problemify.svg?branch=master)](https://travis-ci.org/bcmarinacci/problemify)

> Create problem and solution versions of a directory.

## Install
```bash
npm install -g problemify
```

## Usage
```bash
$ problemify --help

  Usage
      $ problemify <directory>

  Example
    $ problemify death-star-plans
    $ ls
    death-star-plans  death-star-plans-problem  death-star-plans-solution
```

## Problem code syntax
```javascript
/* start problem
function print(value) {
  // your code here

}
end problem */
```

## Solution code syntax
```javascript
// start solution
function print(value) {
  console.log(value);
}
// end solution
```
