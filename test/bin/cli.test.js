import {readFile} from 'fs';
import {execFile} from 'child_process';
import pify from 'pify';
import test from 'ava';

const fixturePaths = {
  problemForEach: '../fixtures/mockUtils-problem/higherOrder/forEach/forEach.js',
  problemMap: '../fixtures/mockUtils-problem/higherOrder/map/map.js',
  problemPrint: '../fixtures/mockUtils-problem/print/print.js',
  solutionForEach: '../fixtures/mockUtils-solution/higherOrder/forEach/forEach.js',
  solutionMap: '../fixtures/mockUtils-solution/higherOrder/map/map.js',
  solutionPrint: '../fixtures/mockUtils-solution/print/print.js'
};

const results = {};
results.problemForEach = `// Write a function that invokes a callback on each element in an array
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

results.problemMap = `// Write a function that returns an array of mapped elements
// problem code
const map = function () {
  // your code here

};

// shared code
const numbers = [1, 2, 3, 4, 5];

map(numbers, n => n ** 2);
// [1, 4, 9, 16, 25]
`;

results.problemPrint = `// Write a function that prints a value to the console
// problem code
const print = function () {
  // your code here

};

// shared code
const jedi = 'Qui-Gon';

print(jedi);
// Qui-Gon
`;

results.solutionForEach = `// Write a function that invokes a callback on each element in an array
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

results.solutionMap = `// Write a function that returns an array of mapped elements
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

map(numbers, n => n ** 2);
// [1, 4, 9, 16, 25]
`;

results.solutionPrint = `// Write a function that prints a value to the console
// solution code
const print = function (value) {
  console.log(value);
};

// shared code
const jedi = 'Qui-Gon';

print(jedi);
// Qui-Gon
`;

test('should write the correct files', async t => {
  t.plan(6);

  try {
    await pify(execFile)('../../dist/bin/cli.js', ['../fixtures/mockUtils']);
    const pathKeys = Object.keys(fixturePaths);

    // Store output file contents in an array
    const files = await Promise.all(pathKeys.map(pathKey => {
      const path = fixturePaths[pathKey];

      return pify(readFile)(path, 'utf8');
    }));

    // Assert whether the contents of each output file is equal to each desired result
    files.forEach((file, i) => {
      const pathKey = pathKeys[i];
      const result = results[pathKey];

      t.is(file, result);
    });
  } catch (err) {
    t.fail(err.message);
  }
});
