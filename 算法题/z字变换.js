// 给定字符和行数,编程z 形状
// 1234567890

/**
 *  结果:
 *  159
    24680
    37
 * */
const result = (s, numRow) => {
  if (s.length === 0 || s.legnth <= numRow) return s
  let arr = new Array(numRow).fill('')
  let idx = 0
  let step = 1

  for (const char of s) {
    arr[idx] += char
    if (idx === numRow - 1) {
      step = -1
    } else if (idx === 0) {
      step = 1
    }
    idx += step // index 的变换是根据 step 步骤走的
  }

  return arr.join('\n')
}
console.log(result('1234567890', 3))
