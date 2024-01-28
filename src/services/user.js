import request from '@/utils/request'
import { stringify } from 'qs'

// 登录
export async function loginAccount(data) {
  return request('/api/service-user/passport/doLogin?', {
    method: 'POST',
    data,
  })
}

// 获取验证码
export async function getSMSCode(data) {
  return request(`/api/service-user/passport/getSMSCode?${stringify(data)}`)
}

// 得到用户信息
export async function getAccount(data) {
  return request(`/api/service-user/user/getUserInfo?${stringify(data)}`, {
    method: 'POST',
  })
}

// 退出登录
export async function logoutAccount() {
  return request('/api/logout', { method: 'POST' })
}

// 修改用户信息
export async function modifyAccount(data) {
  return request('/api/update/account', { method: 'POST', data })
}
