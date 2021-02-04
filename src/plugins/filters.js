// 脱敏姓名
const hideName = (val) => {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    val = val.replace(/（[^)]*）/g, '')
    const str = val.substr(0, val.length - 1)
    let xxx = ''
    for (let i = 0; i < str.length; i++) {
      xxx += '*'
    }
    return val.replace(str, xxx)
  } else {
    return val
  }
}

// 脱敏手机号码
const hidePhone = (val) => {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    const str = val.substr(3, 4)
    return val.replace(str, '****')
  } else {
    return val
  }
}

// 脱敏身份证号
const hideIdCard = (val) => {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    const str = val.substr(6, 8)
    return val.replace(str, '********')
  } else {
    return val
  }
}

// 脱敏地址
const hideAddress = (val) => {
  if (val && window.location.href.indexOf(window.location.href) > -1) {
    const str = val.slice(Math.floor(val.length / 2))
    let xxx = ''
    for (let i = 0; i < str.length; i++) {
      xxx += '*'
    }
    return val.replace(str, xxx)
  } else {
    return val
  }
}

// 处理模板数据为空
const resultDataIsNull = (val) => {
  if (resultDataIsNull) {
    return val
  }

  return '-'
}

export { hideName, hidePhone, hideIdCard, hideAddress, resultDataIsNull }
