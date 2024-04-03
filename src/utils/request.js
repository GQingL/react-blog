import { extend } from 'umi-request'
import { message } from 'antd' // 提示框
import storageHelper from '@/utils/storage'
import { stringify } from 'querystring'
import { history } from 'umi'

const request = extend({
  // errorHandler, // 默认错误处理
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
    // 未登录错误码
    message.error('请先登录')
    storageHelper.clear('user')
    // 跳转登录地址
    // history.replace({
    //   pathname: '/login',
    //   search: stringify({
    //     redirect: location.pathname
    //   })
    // })
    history.push('/login')
  }
  return res
})

export default request
