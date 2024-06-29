import { extend } from 'umi-request'
import { history, getDvaApp } from 'umi'
import storageHelper from '@/utils/storage'
import { message } from 'antd'

const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
})

/**
 * 所有响应拦截器
 *  1. 接收来自后端返回结果后，统一处理地方，比如异常处理提示
 */
request.interceptors.response.use(async response => {
  const res = await response.clone().json()
  if (res.status === 200) {
    // 成功，则取出 data内容 直接返回
    return res
  }
  // 根据响应状态调用错误处理逻辑
  handleError(res)
  return res
})

// 错误响应处理
const handleError = res => {
  switch (res.status) {
    case 401:
      // 未授权处理
      break
    case 400:
      // 坏请求处理
      break
    case 500:
      message.error(res.msg)
      break
    case 501:
    case 502:
      // 清除用户状态并登出
      storageHelper.clear('user')
      getDvaApp()
        ._store.dispatch({
          type: 'user/logout',
        })
        .then(() => history.push('/user/login'))
      break
    default:
      // 其他错误处理
      break
  }
}

export default request
