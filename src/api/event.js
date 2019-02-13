import request from '@/utils/request'

// 代办件
export function getToDeallPage(params) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getToDeallPage',
    method: 'post',
    params
  })
}

// 交办跟踪件
export function getAssignTrackPage(params) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getAssignTrackPage',
    method: 'post',
    params
  })
}

// 延期审核件
export function getDelayConfirmPage(params) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getDelayConfirmPage',
    method: 'post',
    params
  })
}

// 退单审核件
export function getBackConfirmPage(params) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getBackConfirmPage',
    method: 'post',
    params
  })
}

// 结案审核件
export function getConfirmPage(params) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getConfirmPage',
    method: 'post',
    params
  })
}

// 已办结件
export function getFinishPage(params) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getFinishPage',
    method: 'post',
    params
  })
}
