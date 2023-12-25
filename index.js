// // 冒泡排序
// let list = [...new Set([1, 3, 4, 2, 5, 2, 6, 8, 2])]
// for (let i = 0; i < list.length; i++) {
//   console.log(i, 'i')
//   for (let j = 1; j < list.length - i; j++) {
//     console.log(j, 'j')
//     if (list[j] > list[j + 1]) {
//       ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
//     }
//   }
// }
// console.log('---', list)
// async function foo() {
//   const result1 = await new Promise((resolve) => setTimeout(() => resolve('1')))
//   const result2 = await new Promise((resolve) => setTimeout(() => resolve('2')))
// }

// foo()

function resolveAfter2Seconds() {
  console.log('starting slow promise')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('slow')
      console.log('slow promise is done')
    }, 2000)
  })
}

function resolveAfter1Second() {
  console.log('starting fast promise')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fast')
      console.log('fast promise is done')
    }, 1000)
  })
}

async function sequentialStart() {
  console.log('==SEQUENTIAL START==')

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds()
  console.log(slow) // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second()
  console.log(fast) // 3. this runs 3 seconds after 1.
}

async function concurrentStart() {
  console.log('==CONCURRENT START with await==')
  const slow = resolveAfter2Seconds() // starts timer immediately
  const fast = resolveAfter1Second() // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow) // 2. this runs 2 seconds after 1.
  console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

function concurrentPromise() {
  console.log('==CONCURRENT START with Promise.all==')
  //promise.all  等待数组中的异步代码执行完成,才去执行then 方法来链式调用.
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(
    (messages) => {
      console.log(messages[0]) // slow
      console.log(messages[1]) // fast
    }
  )
}

async function parallel() {
  console.log('==PARALLEL with await Promise.all==')

  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))(),
  ])
}

sequentialStart() // after 2 seconds, logs "slow", then after 1 more second, "fast"
// starting slow promise
// slow promise is done
// slow
// starting fast promise
// fast promise is done
// fast

// wait above to finish
// setTimeout(concurrentStart, 4000) // after 2 seconds, logs "slow" and then "fast"
// starting slow promise
// starting fast promise
// fast promise is done
// slow promise is done
// slow
// fast

// // wait again
// setTimeout(concurrentPromise, 7000) // same as concurrentStart
// starting slow promise
// starting fast promise
// fast promise is done
// slow promise is done
// slow
// fast

// // wait again
// setTimeout(parallel, 10000) // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"

// result:
// ==PARALLEL with await Promise.all==
// starting slow promise
// starting fast promise
// slow promise is done
// slow
// fast promise is done
// fast
