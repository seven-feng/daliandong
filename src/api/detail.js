import request from '@/utils/request'
import axios from 'axios'

// 废除事件
export function invalidEvent(id) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/invalidEvent',
    method: 'post',
    params: {
      id
    }
  })
}

// 获取打印信息
export function getEventGeneralInfo(eventId) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getEventGeneralInfo',
    method: 'post',
    params: {
      eventId
    }
  })
}

// 获取事件详情
export function getOne(id) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getOne',
    method: 'post',
    params: {
      id
    }
  })
}

// 获取反馈时间
export function getFeedbackTime(period) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getFeedbackTime',
    method: 'post',
    params: {
      delayDay: period
    }
  })
}

// 获取单位信息
export function getDepartmentChildren(id) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getDepartmentChildren',
    method: 'post',
    params: {
      id
    }
  })
}

// 获取办理进度
export function getEventLog(eventId) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getEventLog',
    method: 'post',
    params: {
      eventId
    }
  })
}

// 提交临时保存数据
export function postTempStorage(formData) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/tempStorage',
    method: 'post',
    params: {
      ...formData
    }
  })
}

// 提交临时保存数据
export function tempDealConfirm(formData) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/tempDealConfirm',
    method: 'post',
    params: {
      ...formData
    }
  })
}

// 回显临时保存数据
export function getTempStorage(eventId) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getTempStorage',
    method: 'post',
    params: {
      eventId
    }
  })
}

// 回显临时保存数据
export function getTempDealConfirm(eventId) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getTempDealConfirm',
    method: 'post',
    params: {
      eventId
    }
  })
}

// 提交表单数据
export function postFormData(formData) {
  return axios.post('/CLGSHZ/act/deal/doActTask', formData)
}

// 获取处理图片
export function getProcessImg(id) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getAllFilePathById',
    method: 'post',
    params: {
      id,
      isEvent: true
    }
  })
}

// 批量下载
export function fileToZip(id) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/fileToZip',
    method: 'post',
    params: {
      id
    }
  })
}

// 获取压缩文件下载地址
export function getZipFilePath(id) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getZipFilePath',
    method: 'post',
    params: {
      id
    }
  })
}

// 获取反映渠道、归属类型、从事职业、事件类型列表
export function getAllDict() {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getAllDict',
    method: 'post'
  })
}

// 获取事件一级类型
export function getIssueFirstType() {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getIssueFirstType',
    method: 'post'
  })
}

// 获取事件二级类型
export function getIssueSecondType(pid) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getIssueSecondType',
    method: 'post',
    params: {
      pid
    }
  })
}

// 修改详情保存
export function update(formData) {
  return axios.post('/CLGSHZ/eventBasicInfo/update', formData)
}

// 查看相似事件
export function getRelatedEvent(id, issueContent) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getRelatedEvent',
    method: 'post',
    params: {
      id,
      issueContent
    }
  })
}

// 获取待审信息
export function getConfirmInfo(eventId) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getConfirmInfo',
    method: 'post',
    params: {
      eventId
    }
  })
}

// 提交“备注”
export function remarkEvent(formData) {
  debugger
  return request({
    url: '/CLGSHZ/eventBasicInfo/remarkEvent',
    method: 'post',
    params: {
      ...formData
    }
  })
}

// 获取评价
export function getEvaluation(eventId) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getEvaluation',
    method: 'post',
    params: {
      eventId
    }
  })
}

// 修改评价
export function updateEvaluation(formData) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/updateEvaluation',
    method: 'post',
    params: {
      ...formData
    }
  })
}

// 获取协办部门办理状态
export function getAssitStatus(eventId) {
  return request({
    url: '/CLGSHZ/eventBasicInfo/getAssitStatus',
    method: 'post',
    params: {
      eventId
    }
  })
}

// 启动流程
export function startFlow(busId, nextUserIds) {
  return request({
    url: '/CLGSHZ/act/deal/startFlow',
    method: 'post',
    params: {
      busId,
      nextUserIds
    }
  })
}
