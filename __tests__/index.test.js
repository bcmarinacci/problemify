'use strict';

const fs = require('fs');
const path = require('path');
const problemify = require('../index');

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

contents.problemIndex = `<body>

  <div class="x-wing"></div>

  <div class="problem"></div>

  <div class="y-wing"></div>
</body>
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
  let fileList;

  beforeEach(function () {
    fileList = [
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-problem', 'higher-order/for-each/for-each.js')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-problem', 'higher-order/map/map.js')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-problem', 'index.html')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-problem', 'print/print.js')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-problem', 'text.txt')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-solution', 'higher-order/for-each/for-each.js')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-solution', 'higher-order/map/map.js')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-solution', 'index.html')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-solution', 'print/print.js')),
      path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils-solution', 'text.txt'))
    ];
  });

  it('should return a list of written files', async () => {
    const files = await problemify(path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils')));

    expect(files).toEqual(fileList);
  });

  it('should write the correct content', async () => {
    const files = await problemify(path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils')));

    expect(fs.readFileSync(files[0], 'utf8')).toEqual(contents.problemForEach);
    expect(fs.readFileSync(files[1], 'utf8')).toEqual(contents.problemMap);
    expect(fs.readFileSync(files[2], 'utf8')).toEqual(contents.problemIndex);
    expect(fs.readFileSync(files[3], 'utf8')).toEqual(contents.problemPrint);
    expect(fs.readFileSync(files[5], 'utf8')).toEqual(contents.solutionForEach);
    expect(fs.readFileSync(files[6], 'utf8')).toEqual(contents.solutionMap);
    expect(fs.readFileSync(files[8], 'utf8')).toEqual(contents.solutionPrint);
  });

  it('should throw an error if an invalid directory path is passed in', async () => {
    try {
      await problemify(path.resolve(path.join(__dirname, '..', '__fixtures__', 'utils', 'print', 'print.js')));
    } catch (err) {
      expect(err.message).toMatch(/not a valid directory/);
    }
  });
});
