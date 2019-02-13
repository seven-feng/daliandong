import request from '@/utils/request'

// export function login(username, password) {
//   return request({
//     url: '/a/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

export function login(username, password) {
  return request({
    url: '/CLGSHZ/auth/login',
    method: 'post',
    params: {
      account: username,
      password: password
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/a/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getInfo(token) {
  return request({
    url: '/CLGSHZ/userInfo/getLoginUserInfo',
    method: 'get',
    params: { token }
  })
}

// export function logout() {
//   return request({
//     url: '/a/user/logout',
//     method: 'post'
//   })
// }

export function logout() {
  return request({
    url: '/CLGSHZ/auth/logout',
    method: 'post'
  })
}
