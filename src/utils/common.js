// 数组的项为对象，根据某个属性，进行去重
const toArrRepeat = (arr, key) => {
  const res = new Map()
  return arr.filter(
    list => !res.has(list[key]) && res.set(list[key], 1)
  )
}

export {
  toArrRepeat
}
