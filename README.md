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
    $ problemify death-star-plans
    $ ls
    death-star-plans  death-star-plans-problem  death-star-plans-solution
```

### Problem comment syntax

Wrap problem code with `/* start problem` and `end problem*/` comments.

```javascript
/* start problem
function print(value) {
  // your code here

}
end problem */
```

### Problem comment syntax

Wrap solution code with `// start solution` and `// end solution` comments.

```javascript
// start solution
function print(value) {
  console.log(value);
}
// end solution
```

## Example

### death-star-plans

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

### death-star-plans-problem

```javascript
function print(value) {
  // your code here

}

const pilot = 'Poe';
print(pilot);
// → Poe
```

### death-star-plans-solution

```javascript
function print(value) {
  console.log(value);
}

const pilot = 'Poe';
print(pilot);
// → Poe
```
