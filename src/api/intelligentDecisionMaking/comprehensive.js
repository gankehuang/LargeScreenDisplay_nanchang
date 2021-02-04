import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 安全评分按按月变化情况
export const monthDataList = function (params) {
  return request({
    url: `${network}/${webPlatform}/composite/securityAssess/monthDataList`,
    method: 'get',
    params
  })
}

// 安全指数统计
export const querySecurityAssessInfo = function (params) {
  return request({
    url: `${network}/${webPlatform}/composite/securityAssess/querySecurityAssessInfo`,
    method: 'get',
    params
  })
}

// 各县区评分排名
export const querySecurityAssessList = function (params) {
  return request({
    url: `${network}/${webPlatform}/composite/securityAssess/querySecurityAssessList`,
    method: 'get',
    params
  })
}

// 督导事件
export const genSupervisionEvent = function (data) {
  return request({
    url: `${network}/${webPlatform}/event/genSupervisionEvent`,
    method: 'post',
    data
  })
}

// 根据区县及一级指标类型获取二三级指标值
export const getSubLevelByRegion = function (params) {
  return request({
    url: `${network}/${webPlatform}/composite/securityAssess/getSubLevelByRegion`,
    method: 'get',
    params
  })
}

// 根据区县及一级指标类型获取二三级指标值
export const superviseStatisticByRegion = function (params) {
  return request({
    url: `${network}/${webPlatform}/composite/securityAssess/superviseStatisticByRegion`,
    method: 'get',
    params
  })
}
