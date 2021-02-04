import { Message } from 'element-ui'
import TRTC from 'trtc-js-sdk'
/**
 *  检测 TRTC Web SDK 是否支持当前浏览器
 * @param params
 */
function checkTRTC (params) {
  // v4.7.0 以下版本的 SDK
  return new Promise(resolve => {
    TRTC.checkSystemRequirements().then(({ result }) => {
      // console.log('-------------', result)
      if (!result) {
        console.log('Your browser is not compatible with TRTC')
        Message.error(
          'SDK 不支持当前浏览器，建议用户使用最新版本的 Chrome 浏览器。'
        )
      }
      resolve(result)
    })
  })
}

export default checkTRTC
