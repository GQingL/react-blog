import { kimiChat } from '@/services/gpt'

export default {
  namespace: 'gpt',
  state: {},
  effects: {
    *kimiChatText({ payload }, { call }) {
      return yield call(kimiChat, payload)
    },
  },
  reducers: {},
}
