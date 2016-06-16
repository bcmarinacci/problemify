# problemify

[![NPM Version][npm-image]][npm-url]
[![Build Status][circleci-image]][circleci-url]
[![Coverage Status][coveralls-image]][coveralls-url]

> Create problem and solution versions of a directory

## Install

```bash
$ npm install -g problemify
```

## Usage

```bash
$ problemify <directory>
```

The following project components are automatically excluded:
- .DS_Store
- .git
- bower_components
- dist
- jspm_packages
- node_modules
- tem
- temp

### Problem code

Wrap JavaScript problem code with `/* start problem` and `end problem */` comments.

```javascript
/* start problem
const print = function (value) {
  // your code here

};
end problem */
```

Wrap HTML problem code with `<!-- start problem` and `end problem -->` comments.

```html
<!-- start problem
<div class="problem"></div>
end problem -->
```

### Solution code

Wrap JavaScript solution code with `// start solution` and `// end solution` comments.

```javascript
// start solution
const print = function (value) {
  console.log(value);
};
// end solution
```

Wrap HTML solution code with `<!-- start solution -->` and `<!-- end solution -->` comments.

```html
<!-- start solution -->
<div class="solution"></div>
<!-- end solution -->
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

```html
<body>
  <!-- start solution -->
  <div class="solution"></div>
  <!-- end solution -->

  <div class="x-wing"></div>

  <!-- start problem
  <div class="problem"></div>
  end problem -->

  <div class="y-wing"></div>
</body>
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

```html
<body>

  <div class="x-wing"></div>

  <div class="problem"></div>

  <div class="y-wing"></div>
</body>
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

```html
<body>
  <div class="solution"></div>

  <div class="x-wing"></div>


  <div class="y-wing"></div>
</body>
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/problemify.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/problemify
[circleci-image]: https://img.shields.io/circleci/project/bcmarinacci/problemify/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/bcmarinacci/problemify/tree/master
[coveralls-image]: https://img.shields.io/coveralls/bcmarinacci/problemify/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/bcmarinacci/problemify?branch=master
