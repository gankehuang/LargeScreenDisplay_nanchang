import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'

// 获取人员搜索列表
export const getSearchPeopleList = function(pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/search/population/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 获取单位搜索列表
export const getSearchUnitList = function(pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/search/unit/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 获取车辆搜索列表
export const getSearchCarList = function(pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/search/vehicle/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 获取人物关系图
export const getRelationList = function(params) {
  return request({
    url: `${network}/${webPlatform}/population/relationDiagram`,
    method: 'get',
    params
  })
}

// 获取人物基本信息
export const getPopulationList = function(params) {
  return request({
    url: `${network}/${webPlatform}/population/selectById`,
    method: 'get',
    params
  })
}

// 获取房屋信息
export const getRoomList = function(params) {
  return request({
    url: `${network}/${webPlatform}/population/relateRoom`,
    method: 'get',
    params
  })
}

// 获取车辆信息
export const getCarList = function(params) {
  return request({
    url: `${network}/${webPlatform}/population/vehicles`,
    method: 'get',
    params
  })
}

// 获取通行记录
export const getAccessList = function(pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/population/accessRecords/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 获取告警事件
export const getEventList = function(pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/population/event/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 获取告警事件
export const getSnapList = function(pageNum, pageSize, data) {
  return request({
    url: `${network}/${video}/faceSnap/queryWithPage/${pageNum}/${pageSize}`,
    // headers: {"Content-Type": "multipart/form-data"},
    method: 'post',
    data
  })
}
