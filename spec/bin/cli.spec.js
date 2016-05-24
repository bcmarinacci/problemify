/* eslint-disable prefer-arrow-callback */
'use strict';

const { readFileSync } = require('fs');
const { execFileSync } = require('child_process');

const fixturePaths = {
  problemForEach: '../fixtures/utils-problem/higher-order/for-each/for-each.js',
  problemMap: '../fixtures/utils-problem/higher-order/map/map.js',
  problemPrint: '../fixtures/utils-problem/print/print.js',
  solutionForEach: '../fixtures/utils-solution/higher-order/for-each/for-each.js',
  solutionMap: '../fixtures/utils-solution/higher-order/map/map.js',
  solutionPrint: '../fixtures/utils-solution/print/print.js'
};

const results = {};
results.problemForEach = `'use strict';

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

results.problemMap = `'use strict';

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

results.problemPrint = `'use strict';

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

results.solutionForEach = `'use strict';

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

results.solutionMap = `'use strict';

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

results.solutionPrint = `'use strict';

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

describe('cli', function () {
  it('should write the correct content', function (done) {
    const pathKeys = Object.keys(fixturePaths);
    execFileSync(`${__dirname}/../../bin/cli.js`, [`${__dirname}/../fixtures/utils`]);
    const files = pathKeys.map(pathKey => {
      const path = fixturePaths[pathKey];

      return readFileSync(`${__dirname}/${path}`, 'utf8');
    });

    files.forEach((file, i) => {
      const pathKey = pathKeys[i];
      const result = results[pathKey];

      expect(result).toEqual(file);
      done();
    });
  });
});
