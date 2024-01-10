/**
 * @param {number[]} heights
 * @return {number[]}
 */
var canSeePersonsCount = function (heights) {
  const stack = []
  const n = heights.length
  const ans = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length) {
      ans[i]++
      // 因为是从 n-1 向前遍历的，heights 前面的一定看不到栈中的人，所以 pop 即可
      if (heights[i] > heights[stack[stack.length - 1]]) {
        stack.pop()
      } else {
        break
      }
    }
    stack.push(i)
  }
  return ans
}
const ret = canSeePersonsCount([10, 6, 8, 5, 11, 9])
console.log(ret)
