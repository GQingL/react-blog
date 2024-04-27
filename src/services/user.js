import request from '@/utils/request'
import { stringify } from 'qs'

// 定义API路径常量
const API_BASE = '/api/service-user'
const LOGIN_ACCOUNT_PATH = '/passport/doLogin'
const LOGIN_OUT_PATH = '/passport/logout'
const GET_SMS_CODE_PATH = '/passport/getSMSCode'
const GET_ACCOUNT_PATH = '/user/getUserInfo'
const GET_MODIFY_ACCOUNT_PATH = '/user/updateUserInfo'

/**
 * 登录账户
 * @param {Object} data - 包含登录所需信息的对象，如用户名和密码等
 * @returns {Promise} - 返回一个Promise对象，解析后的结果包含登录状态和信息
 */
export async function loginAccount(data) {
  return request(`${API_BASE}${LOGIN_ACCOUNT_PATH}?`, {
    method: 'POST',
    data,
  })
}

/**
 * 获取验证码
 * @param {Object} data - 包含获取验证码所需信息的对象，如手机号等
 * @returns {Promise} - 返回一个Promise对象，解析后的结果包含获取验证码的状态
 */
export async function getSMSCode(data) {
  return request(`${API_BASE}${GET_SMS_CODE_PATH}?${stringify(data)}`)
}

/**
 * 获取用户信息
 * @param {Object} data - 包含获取用户信息所需条件的对象
 * @returns {Promise} - 返回一个Promise对象，解析后的结果包含用户信息
 */
export async function getAccount(data) {
  return request(`${API_BASE}${GET_ACCOUNT_PATH}?${stringify(data)}`, {
    method: 'POST',
  })
}

/**
 * 退出登录
 * @returns {Promise} - 返回一个Promise对象，解析后的结果表示退出登录的状态
 */
export async function logoutAccount() {
  return request(`${API_BASE}${LOGIN_OUT_PATH}`, { method: 'POST' })
}

/**
 * 修改账户信息
 * @param {Object} data - 包含要修改的账户信息的对象
 * @returns {Promise} - 返回一个Promise对象，解析后的结果表示修改账户信息的状态
 */
export async function modifyAccount(data) {
  return request(`${API_BASE}${GET_MODIFY_ACCOUNT_PATH}`, {
    method: 'POST',
    data,
  })
}
