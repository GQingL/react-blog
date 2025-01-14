import { stringify } from 'qs'
import request from '@/utils/request'

const API_BASE = '/api/service-gpt'
const GET_KIMI_CHAT_TEXT = '/kimi/chat'

/**
 * kimi gpt 问答
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function kimiChat(payload) {
  return request(`${API_BASE}${GET_KIMI_CHAT_TEXT}?${stringify(payload)}`)
}
