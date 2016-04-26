// Write a function that returns an array of mapped elements
// start solution
// solution code
const map = function (array, cb) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    result.push(cb(array[i], i, array))
  }

  return result
}
// end solution
/* start problem
// problem code
const map = function () {
  // your code here

}
end problem */

// shared code
const numbers = [1, 2, 3, 4, 5]

map(numbers, n => n ** 2)
// [1, 4, 9, 16, 25]
