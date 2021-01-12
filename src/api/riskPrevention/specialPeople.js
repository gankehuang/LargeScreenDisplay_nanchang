import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 获取中华情列表
export const getZhqList = function() {
  return request({
    url: `${network}/${webPlatform}/conflictZhq/getZhqList`,
    method: 'get'
  })
}

// name查询中华情详情
export const getZhqInfoByName = function(params) {
  return request({
    url: `${network}/${webPlatform}/conflictZhq/getZhqInfoByName`,
    method: 'get',
    params
  })
}
