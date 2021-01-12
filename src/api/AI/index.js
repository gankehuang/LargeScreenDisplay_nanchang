import request from '@/utils/request'
import { network, video, webPlatform } from '@/config/gateway'

export const queryAlarmRecord = function(params) {
  return request({
    url: `${network}/${video}/faceControl/queryAlarmRecord/1/1`,
    method: 'get',
    params: params
  })
}

export const queryAlarmRecord1 = function(params) {
  return request({
    url: `${network}/${video}/faceControl/queryAlarmRecord/1/10`,
    method: 'get',
    params: params
  })
}

export const queryAlarmRecord2 = function() {
  return request({
    url: `${network}/${webPlatform}/event/pageQuery/1/10?eventCodeList=62053&eventCodeList=PETITIONER_GATHERING`,
    method: 'get'
  })
}
