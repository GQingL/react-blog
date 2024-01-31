import request from '@/utils/request'

// 上传文件 没对接成功
export async function uploadImg(data) {
  return request('/api/service-article/fs/uploadImg', { method: 'POST', data })
}
