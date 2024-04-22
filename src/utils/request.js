import { extend } from 'umi-request'
import { history, getDvaApp } from 'umi'
import storageHelper from '@/utils/storage'

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
  if (res.status === 501 || res.status === 502) {
    // 清除用户状态
    storageHelper.clear('user')
    // 未登录错误码
    getDvaApp()
      ._store.dispatch({
        type: 'user/logout',
      })
      .then(() => history.push('/user/login'))
  }
  return res
})

export default request
