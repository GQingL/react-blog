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
const DO_LIKE_PATH = '/portal/article/like'
const GET_HOLIDAY_PATH = '/portal/article/vacation'
const READ_ARTICLE_PATH = '/portal/article/readArticle'
const ARTICLE_COMMENT_PATH = '/comment/counts'

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
 * 封装的请求函数，用于文章点赞
 * @param {Object} params 查询参数对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function articleLikeCounts(params) {
  return request(`${API_BASE}${DO_LIKE_PATH}?` + stringify(params))
}

/**
 * 封装的请求函数，用于获取假期信息
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function getHoliday() {
  return request(`${API_BASE}${GET_HOLIDAY_PATH}`)
}

/**
 * 封装的请求函数，用于获文章阅读数
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export async function readArticle(data) {
  return request(`${API_BASE}${READ_ARTICLE_PATH}?${stringify(data)}`, {
    method: 'POST',
  })
}

/**
 * 异步读取评论功能
 * @param {Object} data - 包含查询评论所需数据的对象
 * @returns {Promise} 返回一个Promise对象，解析为请求结果
 */
export async function readComment(data) {
  // 构建请求URL，并发送网络请求
  return request(`${API_BASE}${ARTICLE_COMMENT_PATH}?${stringify(data)}`)
}
