import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'
// 获取楼栋信息
export const getToken = function (params) {
  return request({
    url: `${network}/${webPlatform}/singlePoint/getNCZZToken`,
    method: 'get',
    params
  })
}
