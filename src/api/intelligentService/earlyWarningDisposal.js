import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 分页查询事件列表
export const queryEventList = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/event/pageQuery/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 删除事件
export const deleteEvent = function (data) {
  return request({
    url: `${network}/${webPlatform}/event/deleteEvent`,
    method: 'DELETE',
    data
  })
}

// 事件核实
export const eventVerify = function (data) {
  return request({
    url: `${network}/${webPlatform}/event/verify`,
    method: 'post',
    data
  })
}

// 事件催单
export const eventReminder = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/reminder`,
    method: 'get',
    params
  })
}
