var canSeePersonsCount = function (heights) {
  let ret = []
  let idx = 0
  let v = 0
  for (let i = 0; i < heights.length; i++) {
    if (i === heights.legnth - 1) {
      ret.push(0)
      return
    } else {
      idx++
    }
    if (i === heights.legnth - 1) {
    }
    while (heights[i + v + 1] > heights[i + v]) {
      idx++
    }
    ret.push(idx)
    idx = 0
  }
}
console.log(canSeePersonsCount([10, 6, 8, 5, 11, 9]))
