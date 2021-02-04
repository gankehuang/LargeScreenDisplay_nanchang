import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 获取监控设备 列表
export const getDepartmentList = function () {
  return request({
    url: '/qfqzVisualization/queryUserInfos',
    method: 'post'
  })
}

// 获取设备路径信息 根据日期
export const getPathByDate = function (params) {
  return request({
    url: '/qfqzVisualization/queryPosInfos',
    method: 'post',
    params
  })
}

// 获取设备路径信息 根据日期范围
export const queryPosInfosDateRange = function (params) {
  return request({
    url: '/qfqzVisualization/queryPosInfosDateRange',
    method: 'post',
    params
  })
}

// 获取序列号,验证码
export const getSeq = function () {
  return request({
    url: '/qfqzVisualization/getSeq',
    method: 'post'
  })
}

// 开启设备录像
export const openVideo = function (userId) {
  return request({
    url: '/qfqzVisualization/startVideo',
    method: 'post',
    params: { userId }
  })
}

// 关闭设备录像
export const stopVideo = function (userId) {
  return request({
    url: '/qfqzVisualization/stopVideo',
    method: 'post',
    params: { userId }
  })
}

// 切换清晰度
export const changeDeinition = function (defintion, userId) {
  return request({
    url: '/qfqzVisualization/changeDefinition',
    method: 'post',
    params: { defintion, userId }
  })
}

// 延长播放时间
export const changeMaxTimer = function (time, userId) {
  return request({
    url: '/qfqzVisualization/changeMaxTime',
    method: 'post',
    params: { time, userId }
  })
}

// 文字广播
export const sendMessage = function (content, userIds) {
  return request({
    url: '/qfqzVisualization/facadeSendBroadcast',
    method: 'post',
    params: { content, userIds: userIds.toString() }
  })
}

// 新增活动
export const addOrUpdateActivityBase = function (data) {
  return request({
    url: `${network}/${webPlatform}/activityBase/addOrUpdateActivityBase`,
    method: 'post',
    data: data
  })
}

// 修改活动
export const updateOrUpdateActivityBase = function (data) {
  return request({
    url: `${network}/${webPlatform}/activityBase/updateOrUpdateActivityBase`,
    method: 'post',
    data: data
  })
}

// 根据id查询活动
export const selectActivityBase = function (params) {
  return request({
    url: `${network}/${webPlatform}/activityBase/selectActivityBase`,
    method: 'get',
    params
  })
}

// 查询活动列表
export const selectActivityBasePage = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/activityBase/selectActivityBasePage/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 新增活动
export const selectGridAdminByGridCode = function (params) {
  return request({
    url: `${network}/${webPlatform}/activityBase/selectGridAdminByGridCode`,
    method: 'get',
    params
  })
}

// 根据经纬度查询某范围内点位信息
export const selectByGeo = function (pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/positionInfo/selectByGeo/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 根据网格员id查询客户端信息
export const selectByGridAdminClientById = function (params) {
  return request({
    url: `${network}/${webPlatform}/gridAdminClient/selectByGridAdminClientById`,
    method: 'get',
    params
  })
}

// 透传消息
export const transmission = function (params) {
  return request({
    url: `${network}/${webPlatform}/push/transmission`,
    method: 'get',
    params
  })
}

// 消息通知
export const notification = function (params) {
  return request({
    url: `${network}/${webPlatform}/push/notification`,
    method: 'get',
    params
  })
}
