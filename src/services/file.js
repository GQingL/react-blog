import request from '@/utils/request'

const uploadUrl = '/api/service-article/fs/uploadImage' // API路径作为常量

/**
 * 上传图片到服务器。
 * @param {Object} data。
 * @returns {Promise} 返回一个 - 包含上传图片数据的对象Promise对象，成功时解析为上传结果，失败时解析为错误信息。
 */
export async function uploadImg(data) {
  // 假设request函数已经正确处理了异常，并返回了一个Promise
  return await request(uploadUrl, {
    requestType: 'form',
    method: 'POST',
    data,
  })
}
