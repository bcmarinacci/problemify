'use strict';

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
