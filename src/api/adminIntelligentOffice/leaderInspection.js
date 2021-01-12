import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'
// 获取楼栋信息
export const leadershipInspectPage = function(data) {
  return request({
    url: `${network}/${webPlatform}/leadershipInspect/page`,
    method: 'post',
    data
  })
}
