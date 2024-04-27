import { stringify } from 'qs'
import request from '@/utils/request'

// 定义API路径常量
const API_BASE = '/api/service-article'
const GET_CATEGORIES_AND_TAGS_PATH = '/categoryMng/getCatsAndTags'
const GET_CATEGORIES_PATH = '/categoryMng/getCats'
const GET_ARTICLES_PATH = '/portal/article/list'
const GET_HOT_ARTICLES_PATH = '/portal/article/hotList'
const GET_ARTICLE_DETAIL_PATH = '/portal/article/detail'
const GET_COMMENTS_PATH = '/comment/list'
const CREATE_COMMENT_PATH = '/comment/createComment'
const GET_TAGS_PATH = '/tagMng/getCatList'
const UPDATE_FAVORITE_PATH = '/test' // 临时路径，需根据实际调整
const GET_IS_FAVORITE_PATH = '/test' // 临时路径，需根据实际调整
const GET_HOLIDAY_PATH = '/portal/article/vacation'

/**
 * 封装的请求函数，用于获取分类和标签信息
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getCategoriesAndTags() {
  return request(`${API_BASE}${GET_CATEGORIES_AND_TAGS_PATH}`)
}

/**
 * 封装的请求函数，用于获取分类信息
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getCategories() {
  return request(`${API_BASE}${GET_CATEGORIES_PATH}`)
}

/**
 * 封装的请求函数，用于获取文章列表
 * @param {Object} params 查询参数对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getArticles(params) {
  return request(`${API_BASE}${GET_ARTICLES_PATH}?${stringify(params)}`)
}

/**
 * 封装的请求函数，用于获取热门文章列表
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getHotArticles() {
  return request(`${API_BASE}${GET_HOT_ARTICLES_PATH}`)
}

/**
 * 封装的请求函数，用于获取文章详情
 * @param {Object} params 查询参数对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getArticleDetail(params) {
  return request(`${API_BASE}${GET_ARTICLE_DETAIL_PATH}?${stringify(params)}`)
}

/**
 * 封装的请求函数，用于获取评论列表
 * @param {Object} params 查询参数对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getComments(params) {
  return request(`${API_BASE}${GET_COMMENTS_PATH}?${stringify(params)}`)
}

/**
 * 封装的请求函数，用于创建评论
 * @param {Object} data 包含评论信息的数据对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function createComment(data) {
  return request(`${API_BASE}${CREATE_COMMENT_PATH}`, { method: 'POST', data })
}

/**
 * 封装的请求函数，用于获取标签信息
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getTags() {
  return request(`${API_BASE}${GET_TAGS_PATH}`, { method: 'POST' })
}

/**
 * 封装的请求函数，用于更新文章的收藏状态
 * @param {Object} data 包含收藏信息的数据对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function updateFavorite(data) {
  return request(`${API_BASE}${UPDATE_FAVORITE_PATH}`, { method: 'POST', data })
}

/**
 * 封装的请求函数，用于检查文章是否已被收藏
 * @param {Object} params 查询参数对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getIsFavorite(params) {
  return request(`${API_BASE}${GET_IS_FAVORITE_PATH}`)
}

/**
 * 封装的请求函数，用于获取假期信息
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getHoliday() {
  return request(`${API_BASE}${GET_HOLIDAY_PATH}`)
}
