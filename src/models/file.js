import { uploadImg } from '@/services/file'

export default {
  namespace: 'file',
  state: {
    uploadUrl: '',
  },
  effects: {
    *uploadImg({ payload }, { call, put }) {
      console.log(payload)
      const { status, data } = yield call(uploadImg, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            uploadUrl: data,
          },
        })
      }
    },
  },
}
