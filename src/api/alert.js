import request from '@/utils/request'
import { network, video } from '@/config/gateway'

export const queryAlarmRecord = function (params) {
  return request({
    url: `${network}/${video}/faceControl/queryAlarmRecord/1/1`,
    method: 'get',
    params
  })
}
