import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 警情数量
export const alertNumber = function() {
  return request({
    url: `${network}/${webPlatform}/alertPosture/selectCount`,
    method: 'get'
  })
}

// 警情县区分布
export const alertDistribution = function() {
  return request({
    url: `${network}/${webPlatform}/alertPosture/alertDistribution`,
    method: 'get'
  })
}

// 警情环比同比
export const alertDate = function(params) {
  return request({
    url: `${network}/${webPlatform}/alertPosture/alertDate`,
    method: 'get',
    params: params
  })
}

// 警情问题突出领域top5
export const alertTop5 = function() {
  return request({
    url: `${network}/${webPlatform}/alertPosture/alertHighlighted`,
    method: 'get'
  })
}
