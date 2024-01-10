/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const n = nums.length - 1
  let ret = null
  let result
  for (let i = 0; n > i; i++) {
    ret = target - nums[i]
    nums.filter((item, index) => {
      if (i !== index && ret === item) {
        result = [index, i]
      }
    })
  }
  return result
}
const ret = twoSum([2, 5, 5, 11], 10)
console.log(ret, '---ret---')
