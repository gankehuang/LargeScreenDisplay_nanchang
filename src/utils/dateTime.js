export function dateFormat () {
  const date = new Date()
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return (
    year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  )
}

// 获取前n天的日期
export function getBeforeDate (number) {
  const num = number
  const date = new Date()
  let year = date.getFullYear()
  let mon = date.getMonth() + 1
  let day = date.getDate()
  if (day <= num) {
    if (mon > 1) {
      mon = mon - 1
    } else {
      year = year - 1
      mon = 12
    }
  }
  date.setDate(date.getDate() - num)
  year = date.getFullYear()
  mon = date.getMonth() + 1
  day = date.getDate()
  const s =
    year +
    '-' +
    (mon < 10 ? '0' + mon : mon) +
    '-' +
    (day < 10 ? '0' + day : day)
  return s
}

// 获取N个月前/后年月
export function getBeforeAndAfterDate (n) {
  const datePre = new Date()
  const nowYearPre = datePre.getFullYear()
  const nowMonthPre = datePre.getMonth() + 1
  let preMonth = 0
  let result = ''
  // 需要向前nyear个年
  let nyear = Math.floor(n / 12)

  // 需要向前nmon个月
  const nmon = n % 12

  // 向前月数大于等于当前月时，向前年数加一。
  if (nmon >= nowMonthPre) {
    nyear++
  }

  // 向前月数小于等于今年已过月数
  if (nmon <= nowMonthPre - 1) {
    preMonth = nowMonthPre - nmon
  } else {
    // 今天已过m个月，需再向前去n-m个月。
    preMonth = 12 - (nmon - (nowMonthPre - 1)) + 1
  }

  result = nowYearPre - nyear + '-' + getMonInMM(preMonth)
  return result
}

// 返回MM格式的月
const getMonInMM = function (mon) {
  if (mon < 10) {
    return '0' + mon
  } else {
    return mon
  }
}
