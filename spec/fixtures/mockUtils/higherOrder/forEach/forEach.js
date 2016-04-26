// Write a function that invokes a callback on each element in an array
// start solution
// solution code
const forEach = function (array, cb) {
  for (let i = 0; i < array.length; i++) {
    cb(array[i], i, array)
  }
}
// end solution
/* start problem
// problem code
const forEach = function () {
  // your code here

}
end problem */

// shared code
const droids = ['R2-D2', 'C-3PO', 'BB-8']

forEach(droids, console.log)
// R2-D2
// C-3PO
// BB-8
