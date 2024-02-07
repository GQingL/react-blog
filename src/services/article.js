import { stringify } from 'qs'
import request from '@/utils/request'

// 获取分类
export async function getCategories() {
  return request('/api/service-admin/categoryMng/getCats')
}

// 获取文章列表
export async function getArticles(params) {
  return request(
    `/api/service-article/portal/article/list?${stringify(params)}`,
  )
}

// 获取热门文章列表 todo
export async function getHotArticles() {
  return request('/api/service-article/portal/article/hotList')
}

// 获取文章详情
export async function getArticleDetail(params) {
  return request(
    `/api/service-article/portal/article/detail?${stringify(params)}`,
  )
}

// 获取用户评论 todo
export async function getComments(params) {
  return request('/api/test')
}

// 未登录添加评论 todo
export async function createNoLoginComment(data) {
  return request('/api/test', {
    method: 'POST',
    data,
  })
}

// 添加评论
export async function createComment(data) {
  return request('/api/create/comment', { method: 'POST', data })
}

// 获取tags todo
export async function getTags() {
  return request('/api/service-admin/tagMng/getCatList', { method: 'POST' })
}

// 文章点赞 todo
export async function updateFavorite(data) {
  return request('/api/test', { method: 'POST', data })
}

// 是否已点赞 todo
export async function getIsFavorite(params) {
  return request('/api/test')
}
