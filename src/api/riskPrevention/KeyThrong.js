import request from '@/utils/request'
import { network, webPlatform, video } from '@/config/gateway'

// 查询网格树形信息
export const queryGridTree = function (params) {
  return request({
    url: `${network}/${webPlatform}/grid/queryGridTree`,
    method: 'get',
    params
  })
}

// 查询保障资源
export const getGuaranteeResourcesList = function (params) {
  return request({
    url: `${network}/${webPlatform}/monitorMapLayer/guaranteeResourcesList`,
    method: 'get',
    params
  })
}

// 查询监控设备
export const getMonitorDeviceList = function (params) {
  return request({
    url: `${network}/${webPlatform}/monitorMapLayer/monitorDeviceList`,
    method: 'get',
    params
  })
}

// 查询重点监控
export const getKeyMonitorList = function (params) {
  return request({
    url: `${network}/${webPlatform}/monitorMapLayer/keyMonitorList`,
    method: 'get',
    params
  })
}

// 查询重点单位
export const getKeyUnitList = function (params) {
  return request({
    url: `${network}/${webPlatform}/monitorMapLayer/keyUnitList`,
    method: 'get',
    params
  })
}

// 查询重点项目
export const getKeyProjectList = function (params) {
  return request({
    url: `${network}/${webPlatform}/monitorMapLayer/keyProjectList`,
    method: 'get',
    params
  })
}

// 查询值守人员
export const getDutyOfficerList = function (params) {
  return request({
    url: `${network}/${webPlatform}/monitorMapLayer/dutyOfficerList`,
    method: 'get',
    params
  })
}

// 查询重点场所
export const getKeySafetyLocationList = function (params) {
  return request({
    url: `${network}/${webPlatform}/compositeSateMapLayer/keySafetyLocationList`,
    method: 'get',
    params
  })
}

// 查询行政中心09和市民广场27
export const getSafetyLocation = function (params) {
  return request({
    url: `${network}/${webPlatform}/safetyLocation/selectSafetyLocation`,
    method: 'get',
    params
  })
}

// 根据安全网点查询设备信息
export const queryCameraBySafeLocationId = function (params) {
  return request({
    url: `${network}/${webPlatform}/positionInfo/queryCameraBySafeLocationId`,
    method: 'post',
    params
  })
}

// 查询所有事件
export const getEventArr = function (params) {
  return request({
    url: `${network}/${webPlatform}/event/selectAll`,
    method: 'get',
    params
  })
}

// 事件处理
export const handleEvent = function (data) {
  return request({
    url: `${network}/${webPlatform}/event/handle`,
    method: 'post',
    data
  })
}

// 视频预览接口
export const startVideo = function (id) {
  return request({
    url: `${network}/${video}/camera/startVideo/${id}`,
    method: 'post'
  })
}

// 获取群防力量
export const getGroupForce = function () {
  return request({
    url: '/event/groupForce/getAll',
    method: 'get'
  })
}

// 事件指派
export const eventAssign = function (data) {
  return request({
    url: '/event/assign',
    method: 'post',
    data
  })
}

// 分页查询组织成员
export const queryOrgMember = function (params) {
  return request({
    url: `${network}/${webPlatform}/orgMember/queryOrgMember/1/50`,
    method: 'get',
    params
  })
}

// 抓拍检索
export const searchSnap = function (params) {
  return request({
    url: `${network}/${webPlatform}/yitu/searchSnap`,
    method: 'get',
    params
  })
}

// 经纬度查询事件
export const selectByGeo = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/event/selectByGeo/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}
