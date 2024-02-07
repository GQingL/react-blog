import { message } from 'antd'
import { uploadImg } from '@/services/file'

export default {
  namespace: 'file',
  state: {},
  effects: {
    *uploadImg({ payload, callback }, { call }) {
      const { status, data, msg } = yield call(uploadImg, payload)
      if (status !== 200) {
        message.error(msg)
      }
      if (callback) callback(data)
    },
  },
}
