import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'

// 捕捞收入
export const fishingIncome = function() {
  return request({
    url: `${network}/${webPlatform}/keyWaters/fishingIncome`,
    method: 'get'
  })
}
