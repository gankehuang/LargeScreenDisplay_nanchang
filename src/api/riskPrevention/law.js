import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 自动登录
export const autoLogin = function() {
  return request({
    url: `${network}/${webPlatform}/singlePoint/getToken`,
    method: 'get'
  })
}
