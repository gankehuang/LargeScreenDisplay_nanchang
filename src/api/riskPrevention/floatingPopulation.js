import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 查询重点监控
export const getKeyMonitorList = function(params) {
  return request({
    url: `${network}/${webPlatform}/monitorMapLayer/keyMonitorList`,
    method: 'get',
    params
  })
}

// 查询流动人口详情
export const queryPopulationProvince = function(params) {
  return request({
    url: `${network}/${webPlatform}/composite/queryPopulationProvince`,
    method: 'get',
    params
  })
}

// 根据省编码查询流动人口
export const queryFlowPopulationByProvince = function(
  pageNum,
  pageSize,
  params
) {
  return request({
    url: `${network}/${webPlatform}/composite/queryFlowPopulationByProvince/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}

// 根据经纬度查询某范围内点位信息
export const selectByGeo = function(pageNum, pageSize, params) {
  return request({
    url: `${network}/${webPlatform}/positionInfo/selectByGeo/${pageNum}/${pageSize}`,
    method: 'get',
    params
  })
}