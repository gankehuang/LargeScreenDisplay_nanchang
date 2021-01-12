// 检测flash是否启用
export function hasUsableFlash() {
  var flashObj
  if (typeof window.ActiveXObject !== 'undefined') {
    // eslint-disable-next-line no-undef
    flashObj = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
  } else {
    flashObj = navigator.plugins['Shockwave Flash']
  }
  return !!flashObj
}
