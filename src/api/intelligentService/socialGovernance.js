import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 分页查询综治事件列表
export const queryGovernEvent = function (pageNum, pageSize, data) {
  return request({
    url: `${network}/${webPlatform}/event/queryGovernEvent/${pageNum}/${pageSize}`,
    method: 'post',
    data
  })
}

// 查看综治事件详情
export const queryGovernEventDetail = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/queryGovernEventDetail`,
    method: 'get',
    params
  })
}

// 根据字典类型编码查询
export const treeList = function (params) {
  return request({
    url: `${network}/${webPlatform}/dict/data/treeList`,
    method: 'get',
    params
  })
}

// 根据父网格id查询网格
export const queryGridByParentId = function (params) {
  return request({
    url: `${network}/${webPlatform}/grid/queryGridByParentId`,
    method: 'get',
    params
  })
}

// 根据父网格id查询网格
export const queryGovernEventProcessInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/queryGovernEventProcessInfo`,
    method: 'get',
    params
  })
}
