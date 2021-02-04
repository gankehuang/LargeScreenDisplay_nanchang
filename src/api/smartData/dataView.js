import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'

// 数据总量和今日新增
export const queryDataGeneral = function () {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryDataGeneral`,
    method: 'get'
  })
}

// 重点人口
export const queryKeyPersonnel = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/keyPersonnel`,
    method: 'get',
    params
  })
}

// 人口结构
export const structure = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/structure`,
    method: 'get',
    params
  })
}

// 人口结构
export const populationVariation = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/populationVariation`,
    method: 'get',
    params
  })
}

// 人口概况
// export const queryOverview = function(params) {
//   return request({
//     url: `${network}/${webPlatform}/wisdomPopulation/overview`,
//     method: 'get',
//     params
//   })
// }

//  人口概况-SC
export const queryOverview = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPopulation/overview`,
    method: 'get',
    params
  })
}

// 组织
export const queryOrgGeneral = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryOrgGeneral`,
    method: 'get',
    params
  })
}

export const getZZOrg = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getZZOrg`,
    method: 'get',
    params
  })
}

// 网
export const queryGridGeneral = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryGridGeneral`,
    method: 'get',
    params
  })
}

// 物 公共交通
export const queryCommonPlay = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomThings/queryCommonPlay`,
    method: 'get',
    params
  })
}

// 物 公共交通
export const queryCommonCarNum = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomThings/queryCommonCarNum`,
    method: 'get',
    params
  })
}

// 物 分页查询快递信息
export const queryExpressInfo = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/wisdomThings/queryExpressInfo/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 物 查询公共视频资源数量
export const queryVideo = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomThings/queryVideo`,
    method: 'get',
    params
  })
}

// 地 重点场所
export const queryKeyPlaceCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryKeyPlaceCount`,
    method: 'get',
    params
  })
}

// 地 经营场所
export const queryOperatingPlaceCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryOperatingPlaceCount`,
    method: 'get',
    params
  })
}

// 地
export const queryRoomGeneral = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryRoomGeneral`,
    method: 'get',
    params
  })
}

export const queryPayPlace = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryPayPlace`,
    method: 'get',
    params
  })
}

export const queryCommonPlace = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryCommonPlace`,
    method: 'get',
    params
  })
}

// 地
export const queryWeightPlace = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryWeightPlace`,
    method: 'get',
    params
  })
}

// 地  出租房屋
export const queryRentRoomCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryRentRoomCount`,
    method: 'get',
    params
  })
}

// 地  实有房屋
export const queryRoomCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryRoomCount`,
    method: 'get',
    params
  })
}

// 地 公共安全
export const queryPubSafetyCount = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomPlace/queryPubSafetyCount`,
    method: 'get',
    params
  })
}

// 组织 基层党组织
export const getDangOrg = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getDangOrg`,
    method: 'get',
    params
  })
}

// 组织 社会组织
export const getCommunityOrg = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getCommunityOrg`,
    method: 'get',
    params
  })
}

// 总览 部门数据量
export const getDeptData = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getDeptData`,
    method: 'get',
    params
  })
}

// 总览 主题库数据
export const getThemeLibrary = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getThemeLibrary`,
    method: 'get',
    params
  })
}

// 红色驿站撒点
export const getSCHsPost = function (params) {
  return request({
    url: `${network}/${webPlatform}/keyLocation/getSCHsPost`,
    method: 'get',
    params
  })
}
// 红色物业撒点
export const getSCHsProperty = function (params) {
  return request({
    url: `${network}/${webPlatform}/keyLocation/getSCHsProperty`,
    method: 'get',
    params
  })
}

// 社会组织点位撒点
export const getquerySocialOrg = function (params) {
  return request({
    url: `${network}/${webPlatform}/keyLocation/querySocialOrg`,
    method: 'get',
    params
  })
}

// 孵化中心点位撒点
export const getqueryHFZX = function (params) {
  return request({
    url: `${network}/${webPlatform}/keyLocation/queryHFZX`,
    method: 'get',
    params
  })
}

// 综治中心点位撒点
export const getqueryZZZX = function (params) {
  return request({
    url: `${network}/${webPlatform}/keyLocation/queryZZZX`,
    method: 'get',
    params
  })
}

// 党群服务中心
export const getQueryDQFWZX = function (params) {
  return request({
    url: `${network}/${webPlatform}/keyLocation/queryDQFWZX`,
    method: 'get',
    params
  })
}

// 查询法治宣传教育
export const selectSafetyLocation = function (params) {
  return request({
    url: `${network}/${webPlatform}/safetyLocation/selectSafetyLocation`,
    method: 'get',
    params
  })
}

// 事件概况
export const queryEventGeneral = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomEvent/queryEventGeneral`,
    method: 'get',
    params
  })
}

// 事件处理
export const queryEventHandle = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomEvent/queryEventHandle`,
    method: 'get',
    params
  })
}

// 事件来源
export const queryEventSource = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomEvent/queryEventSource`,
    method: 'get',
    params
  })
}

// 事件类型
export const queryEventType = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomEvent/queryEventType`,
    method: 'get',
    params
  })
}

// 人脸
export const faceSnapCount = function (params) {
  return request({
    url: `${network}/${video}/faceSnap/count`,
    method: 'get',
    params
  })
}

// 查询南昌市法治文化公园
export const queryFZWHGY = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryFZWHGY`,
    method: 'get',
    params
  })
}

// 见义勇为
export const getJYYWData = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getJYYWData`,
    method: 'get',
    params
  })
}

// 司法责任制改革
export const getSFZRZData = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getSFZRZData`,
    method: 'get',
    params
  })
}
// 获取法律服务中心数据
export const getFLFWData = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getFLFWData`,
    method: 'get',
    params
  })
}

// 新时代文明促进站
export const queryXSDWMCJZ = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/queryXSDWMCJZ`,
    method: 'get',
    params
  })
}

// 获取智慧平安小区数据
export const getZHPAXQData = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getZHPAXQData`,
    method: 'get',
    params
  })
}

// 获取邻里中心数据
export const getLLZXData = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getLLZXData`,
    method: 'get',
    params
  })
}

// 获取宗教活动场所
export const getZJHDCSData = function () {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getZJHDCSData`,
    method: 'get'
  })
}

// 获取基层民主协商
export const getJCMZXSData = function (params) {
  return request({
    url: `${network}/${webPlatform}/wisdomGeneral/getJCMZXSData`,
    method: 'get',
    params
  })
}
