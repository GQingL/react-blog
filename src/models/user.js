import { message } from 'antd'
import {
  loginAccount,
  getAccount,
  logoutAccount,
  modifyAccount,
} from '@/services/user'
import storageHelper from '@/utils/storage'

const face = [
  'https://guangqingl.top/portrait/240121A4N57DZHX4/0703481398.jpg',
  'https://guangqingl.top/portrait/240121A4N57DZHX4/1-210325135J00-L.jpg',
  'https://guangqingl.top/portrait/240121A4N57DZHX4/1-2103251444360-L.jpg',
  'https://guangqingl.top/portrait/240121A4N57DZHX4/1-2103252334170-L.png',
]

const initAccount = () => {
  const user = storageHelper.get('user')
  if (!user || user.exp * 1000 < new Date().getTime()) {
    return {}
  }
  return user
}

export default {
  namespace: 'user',
  state: {
    account: initAccount(),
    avatar: null,
  },
  effects: {
    *sms() {
      // const response = yield call(getSMSCode, payload)
      // if (response.status === 200) {
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       account: response.data,
      //       avatar: response.data.avatar
      //     }
      //   })
      // }
    },

    *login({ payload, callback }, { call }) {
      const response = yield call(loginAccount, payload)
      if (response.status !== 200) {
        message.error(response.msg)
      } else {
        message.success('登录成功')
        if (callback) callback(response)
      }
    },

    *account({ payload, callback }, { call, put }) {
      const response = yield call(getAccount, payload)
      if (response.status === 200) {
        storageHelper.set('user', response.data)
        if (callback) callback(response)
        yield put({
          type: 'handle',
          payload: {
            account: response.data,
            face: response.data.face,
          },
        })
      }
      return response
    },

    *logout({ payload }, { call, put }) {
      yield call(logoutAccount, payload)
      yield put({
        type: 'handle',
        payload: {
          account: {},
        },
      })
    },

    *setAccount({ payload }, { call, put }) {
      const { status } = yield call(modifyAccount, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
        })
        message.success('更新成功')
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    changeAvatar(state) {
      return { ...state, face: face[Math.floor(Math.random() * 4)] }
    },
  },
}
