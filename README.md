# problemify [![Build Status](https://travis-ci.org/bcmarinacci/problemify.svg?branch=master)](https://travis-ci.org/bcmarinacci/problemify)

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
    $ problemify map-to-luke
    $ ls
    map-to-luke    map-to-luke-problem    map-to-luke-solution
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
  console.log(value);
}
// end solution
```

## Example

### map-to-luke

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

### map-to-luke-problem

```javascript
function print(value) {
  // your code here

}

const pilot = 'Poe';
print(pilot);
// → Poe
```

### map-to-luke-solution

```javascript
function print(value) {
  console.log(value);
}

const pilot = 'Poe';
print(pilot);
// → Poe
```
