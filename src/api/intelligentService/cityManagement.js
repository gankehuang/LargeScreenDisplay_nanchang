import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 获取小区地图区域
export const cityManages = function() {
  return request({
    url: `${network}/${webPlatform}/workOrder/queryWorkOrder/1/100`,
    method: 'post'
  })
}

// 根据id查询事件
export function getEventById(params) {
  return request({
    url: `${network}/${webPlatform}/event/selectById`,
    method: 'get',
    params
  })
}
