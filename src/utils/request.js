import { extend } from 'umi-request'

const request = extend({
  // errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
})

export default request
