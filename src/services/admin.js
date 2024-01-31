import { stringify } from 'qs'
import request from '@/utils/request'

// todo
// 获取评论
export async function getComments() {
  return request('/api/test')
}

// 获取分类列表
export async function getCategories() {
  return request('/api/test')
}

// 删除分类
export async function deleteCategory(data) {
  return request('/api/test', {
    method: 'POST',
    data,
  })
}

// 添加分类
export async function createCategory(data) {
  return request('/api/test', {
    method: 'POST',
    data,
  })
}

// 获取标签列表
export async function getTags() {
  return request('/api/test')
}

// 删除标签
export async function deleteTag(data) {
  return request('/api/test', {
    method: 'POST',
    data,
  })
}

// 添加标签
export async function createTag(data) {
  return request('/api/test', {
    method: 'POST',
    data,
  })
}

// 删除文章
export async function deleteArticle(data) {
  return request('/api/test', {
    method: 'POST',
    data,
  })
}

// 删除评论
export async function deleteComment(data) {
  return request('/api/test', {
    method: 'POST',
    data,
  })
}

// 获取文章列表
export async function getArticles(params) {
  return request('/api/test')
}
