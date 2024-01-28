import { stringify } from 'qs'
import request from '@/utils/request'

// 获取分类

export async function getCategories() {
  return request('/api/categories')
}

// 获取文章列表
export async function getArticles(params) {
  return request(
    `/api/service-article/portal/article/list?${stringify(params)}`,
  )
}

// 获取热门文章列表
export async function getHotArticles() {
  return request('/api/hot')
}

// 获取文章详情
export async function getArticleDetail(params) {
  return request(
    `/api/service-article/portal/article/detail?${stringify(params)}`,
  )
}

// 获取用户评论
export async function getComments(params) {
  return request(`/api/comments?${stringify(params)}`)
}

// 未登录添加评论
export async function createNoLoginComment(data) {
  return request('/api/toursit/comment', {
    method: 'POST',
    data,
  })
}

// 添加评论
export async function createComment(data) {
  return request('/api/create/comment', { method: 'POST', data })
}

// 获取tags
export async function getTags() {
  return request('/api/tags')
}

// 文章点赞
export async function updateFavorite(data) {
  return request('/api/update/favorite', { method: 'POST', data })
}

// 是否已点赞
export async function getIsFavorite(params) {
  return request(`/api/isFavorite?${stringify(params)}`)
}
