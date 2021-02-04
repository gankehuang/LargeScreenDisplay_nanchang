import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 出租房县区分布
export const queryRentRoomDistributed = function () {
  return request({
    url: `${network}/${webPlatform}/rentRoom/queryRentRoomDistributed`,
    method: 'get'
  })
}

// 房屋数量
export const queryRoomCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/rentRoom/queryRoomCount`,
    method: 'get',
    params
  })
}

// 出租房使用类型
export const queryUseTypeRoomRentCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/rentRoom/queryUseTypeRoomRentCount`,
    method: 'get',
    params
  })
}
// 获取小区数
export const queryCommunityTree = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryCommunityTree`,
    method: 'get',
    params
  })
}

// 根据小区编号获取楼栋
export const queryBuildingByCommunity = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryBuildingByCommunity`,
    method: 'get',
    params
  })
}

// 根据楼栋编号获取单元
export const queryUnitByBuilding = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryUnitByBuilding`,
    method: 'get',
    params
  })
}

// 根据楼栋编号获取房屋
export const queryRoomByBuilding = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryRoomByBuilding`,
    method: 'get',
    params
  })
}

// 根据单元编号获取房屋
export const queryRoomByUnit = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryRoomByUnit`,
    method: 'get',
    params
  })
}

// 获取房屋人口详情
export const queryRoomUserByRoom = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryRoomUserByRoom`,
    method: 'get',
    params
  })
}

// 根据区县或小区统计房屋、人口数量
export const statisticRoomAndUser = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/statisticRoomAndUser`,
    method: 'get',
    params
  })
}
