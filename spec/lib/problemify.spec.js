/* eslint-disable prefer-arrow-callback */
'use strict';

const { readFileSync } = require('fs');
const { resolve } = require('path');
// const { execFileSync } = require('child_process');
const problemify = require('../../lib/problemify');

const contents = {};
contents.problemForEach = `'use strict';

// Write a function that invokes a callback on each element in an array
// problem code
const forEach = function () {
  // your code here

};

// shared code
const droids = ['R2-D2', 'C-3PO', 'BB-8'];

forEach(droids, console.log);
// R2-D2
// C-3PO
// BB-8
`;

contents.problemMap = `'use strict';

// Write a function that returns an array of mapped elements
// problem code
const map = function () {
  // your code here

};

// shared code
const numbers = [1, 2, 3, 4, 5];

map(numbers, n => n * n);
// [1, 4, 9, 16, 25]
`;

contents.problemPrint = `'use strict';

// Write a function that prints a value to the console
// problem code
const print = function () {
  // your code here

};

// shared code
const jedi = 'Qui-Gon';

print(jedi);
// Qui-Gon
`;

contents.solutionForEach = `'use strict';

// Write a function that invokes a callback on each element in an array
// solution code
const forEach = function (array, cb) {
  for (let i = 0; i < array.length; i++) {
    cb(array[i], i, array);
  }
};

// shared code
const droids = ['R2-D2', 'C-3PO', 'BB-8'];

forEach(droids, console.log);
// R2-D2
// C-3PO
// BB-8
`;

contents.solutionMap = `'use strict';

// Write a function that returns an array of mapped elements
// solution code
const map = function (array, cb) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(cb(array[i], i, array));
  }

  return result;
};

// shared code
const numbers = [1, 2, 3, 4, 5];

map(numbers, n => n * n);
// [1, 4, 9, 16, 25]
`;

contents.solutionPrint = `'use strict';

// Write a function that prints a value to the console
// solution code
const print = function (value) {
  console.log(value);
};

// shared code
const jedi = 'Qui-Gon';

print(jedi);
// Qui-Gon
`;

describe('problemify', function () {
  beforeEach(function () {
    this.fileList = [
      resolve(`${__dirname}/../fixtures/utils-problem/higher-order/for-each/for-each.js`),
      resolve(`${__dirname}/../fixtures/utils-problem/higher-order/map/map.js`),
      resolve(`${__dirname}/../fixtures/utils-problem/print/print.js`),
      resolve(`${__dirname}/../fixtures/utils-solution/higher-order/for-each/for-each.js`),
      resolve(`${__dirname}/../fixtures/utils-solution/higher-order/map/map.js`),
      resolve(`${__dirname}/../fixtures/utils-solution/print/print.js`)
    ];
  });

  it('should return a list of written files', function (done) {
    problemify(`${__dirname}/../fixtures/utils`)
      .then(files => {
        expect(files).toEqual(this.fileList);
        done();
      })
      .catch(done.fail);
  });

  it('should write the correct content', function (done) {
    problemify(`${__dirname}/../fixtures/utils`)
      .then(files => {
        expect(readFileSync(files[0], 'utf8')).toEqual(contents.problemForEach);
        expect(readFileSync(files[1], 'utf8')).toEqual(contents.problemMap);
        expect(readFileSync(files[2], 'utf8')).toEqual(contents.problemPrint);
        expect(readFileSync(files[3], 'utf8')).toEqual(contents.solutionForEach);
        expect(readFileSync(files[4], 'utf8')).toEqual(contents.solutionMap);
        expect(readFileSync(files[5], 'utf8')).toEqual(contents.solutionPrint);
        done();
      })
      .catch(done.fail);
  });

  it('should throw an error if an invalid directory path is passed in', function (done) {
    problemify(`${__dirname}/../fixtures/utils/print/print.js`)
      .then(done.fail)
      .catch(err => {
        expect(err).toMatch(/not a valid directory/);
        done();
      });
  });
});
