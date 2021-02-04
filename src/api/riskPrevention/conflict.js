import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 出租房县区分布
export const queryConflictCenter = function () {
  return request({
    url: `${network}/${webPlatform}/keyLocation/queryConflictCenter`,
    method: 'get'
  })
}

// 查询中华情详情
export const getZhqInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/conflictZhq/getZhqInfo`,
    method: 'get',
    params
  })
}

// 分页查询事件列表
export const queryEventList = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/event/pageQuery/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 查询中华情人员详情
export const getZhqInfoByIdCards = function (data) {
  return request({
    url: `${network}/${webPlatform}/conflictZhq/getZhqInfoByIdCards`,
    method: 'post',
    data
  })
}
