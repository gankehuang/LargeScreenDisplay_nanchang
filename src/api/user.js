import request from '@/utils/request'
import { network, auth } from '@/config/gateway'

// 登录
export const login = function (params) {
  return request({
    url: `${network}/${auth}/login`,
    method: 'POST',
    params
  })
}

// 登出
export function logout (params) {
  return request({
    url: `/${auth}/sso/logout`,
    method: 'get',
    params
  })
}
