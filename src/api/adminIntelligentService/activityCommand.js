import request from '@/utils/request'
import { network, webPlatform } from '@/config/gateway'
// 分页获取活动
export const selectActivity = function (advancedForm, pageNum, pageSize) {
  return request({
    url: `${network}/${webPlatform}/activityBase/selectActivityBasePage/${pageNum}/${pageSize}`,
    method: 'get',
    params: advancedForm
  })
}
// 删除活动
export const deleteActivityBase = function (params) {
  return request({
    url: `${network}/${webPlatform}/activityBase/deleteActivityBase`,
    method: 'DELETE',
    params: params
  })
}

// 根据月份统计活动数量
export const countActivityBaseByMonth = function () {
  return request({
    url: `${network}/${webPlatform}/activityBase/countActivityBaseByMonth`,
    method: 'GET'
  })
}
