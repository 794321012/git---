// 定义一个函数，用于根据路径数组生成选择器字符串
function getSelectors(path) {
  // 反转路径数组，并过滤掉 window 和 document 元素
  return path
    .reverse()
    .filter((element) => {
      return element !== window && element !== document
    })
    .map((element) => {
      // 根据元素的属性生成选择器字符串
      if (element.id) {
        return `${element.tagName.toLowerCase()}#${element.id}`
      } else if (element.className && typeof element.className === 'string') {
        return `${element.nodeName.toLowerCase()}.${element.className}`
      } else {
        return element.nodeName.toLowerCase()
      }
    })
    .join(' ') // 将选择器字符串连接起来并返回
}

// 默认导出一个函数，用于根据路径数组或目标元素生成选择器字符串
export default function (pathsOrTarget) {
  if (Array.isArray(pathsOrTarget)) {
    // 如果传入的是路径数组
    return getSelectors(pathsOrTarget) // 调用 getSelectors 函数生成选择器字符串并返回
  } else {
    // 如果传入的是目标元素
    let path = []
    while (pathsOrTarget) {
      // 循环遍历目标元素的父节点，将其添加到路径数组中
      path.push(pathsOrTarget)
      pathsOrTarget = pathsOrTarget.parentNode
    }
    return getSelectors(path) // 调用 getSelectors 函数生成选择器字符串并返回
  }
}
