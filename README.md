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

## Problem code

Input:
```javascript
// start solution
function print(value) {
  console.log(value);
}
// end solution
/* start problem
function print(value) {
  // your code here

}
end problem */

const pilot = 'Poe';
print(pilot);
// → Poe
```

Output:
```javascript
function print(value) {
  // your code here

}

const pilot = 'Poe';
print(pilot);
// → Poe
```

## Solution code

Input:
```javascript
// start solution
function print(value) {
  console.log(value);
}
// end solution
/* start problem
function print(value) {
  // your code here

}
end problem */

const pilot = 'Poe';
print(pilot);
// → Poe
```

Output:
```javascript
function print(value) {
  console.log(value);
}

const pilot = 'Poe';
print(pilot);
// → Poe
```
