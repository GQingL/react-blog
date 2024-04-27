import { stringify } from 'qs'
import request from '@/utils/request'

// 定义API路径常量
const API_BASE = '/api/service-article'
const GET_CATEGORIES_AND_TAGS_PATH = '/categoryMng/getCatsAndTags'
const ARTICLE_PUBLISH_PATH = '/article/createArticle'

/**
 * 创建草稿
 * @param {Object} data - 草稿内容数据
 * @returns {Promise} 返回请求结果的Promise对象
 */
export async function createDraft(data) {
  return request('/api/create/draft', {
    method: 'POST',
    data,
  })
}

/**
 * 获取草稿
 * @param {Object} params - 查询参数对象
 * @returns {Promise} 返回请求结果的Promise对象
 */
export async function getDraft(params) {
  return request(`/api/draft?${stringify(params)}`)
}

/**
 * 获取所有草稿
 * @returns {Promise} 返回请求结果的Promise对象
 */
export async function getDrafts() {
  return request('/api/drafts')
}

/**
 * 更新草稿
 * @param {Object} data - 更新后的草稿内容数据
 * @returns {Promise} 返回请求结果的Promise对象
 */
export async function updateDraft(data) {
  return request('/api/update/draft', {
    method: 'POST',
    data,
  })
}

/**
 * 删除草稿
 * @param {Object} data - 包含草稿标识的数据对象
 * @returns {Promise} 返回请求结果的Promise对象
 */
export async function deleteDraft(data) {
  return request('/api/delete/draft', {
    method: 'POST',
    data,
  })
}

/**
 * 获取分类和标签信息
 * @returns {Promise} 返回请求结果的Promise对象
 */
export async function getCategories() {
  return request(`${API_BASE}${GET_CATEGORIES_AND_TAGS_PATH}`)
}

/**
 * 发布文章
 * @param {Object} data - 包含文章内容的数据对象
 * @returns {Promise} 返回请求结果的Promise对象
 */
export async function createPublish(data) {
  return request(`${API_BASE}${ARTICLE_PUBLISH_PATH}`, {
    method: 'POST',
    data,
  })
}
