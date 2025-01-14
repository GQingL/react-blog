import { kimiChat } from '@/services/gpt'

export default {
  namespace: 'gpt',
  state: {
    kimiRes: '',
  },
  effects: {
    *kimiChatText({ payload, callback }, { call }) {
      const response = yield call(kimiChat, payload)
      if (response.status === 200) {
        if (callback) callback(response)
      }
      return response
    },
  },
  reducers: {},
}
