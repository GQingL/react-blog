import { history } from 'umi'
import {
  getCategories,
  getArticles,
  getHotArticles,
  getArticleDetail,
  getComments,
  getTags,
  createComment,
  updateFavorite,
  doFavorite,
  getHoliday,
  readArticle,
} from '@/services/article'

export default {
  namespace: 'article',
  state: {
    categories: [],
    articles: [],
    hots: [],
    comments: [],
    tags: [],
    detail: {},
    holidays: [],
    articleCount: 0,
    isFavorite: false,
    favoriteCount: 0,
  },
  effects: {
    *categories({ payload }, { call, put }) {
      const { status, data } = yield call(getCategories, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            categories: data,
          },
        })
      }
    },

    *articles({ payload }, { call, put }) {
      const { status, data } = yield call(getArticles, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            articles: data.rows,
            articleCount: data.total,
          },
        })
      }
    },

    *hot({ payload }, { call, put }) {
      const { status, data } = yield call(getHotArticles, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            hots: data,
          },
        })
      }
    },

    *detail({ payload }, { call, put }) {
      const { status, data } = yield call(getArticleDetail, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            detail: data,
            favoriteCount: data.likeCount,
          },
        })
      }
    },

    *comments({ payload }, { call, put }) {
      const { status, data } = yield call(getComments, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            comments: data.rows,
          },
        })
      }
    },

    *tags({ payload }, { call, put }) {
      const { status, data } = yield call(getTags, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            tags: data,
          },
        })
      }
    },

    *holiday({ payload }, { call, put }) {
      const { status, data } = yield call(getHoliday, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            holidays: data,
          },
        })
      }
    },

    *addComment({ payload }, { call, put }) {
      const { status, data } = yield call(createComment, payload)
      if (status === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        })
      }
    },
    *readArticle({ payload }, { call }) {
      yield call(readArticle, payload)
    },

    *favorite({ payload }, { call, put }) {
      const { status, data } = yield call(updateFavorite, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            favoriteCount: data,
          },
        })
      } else {
        history.push('/login')
      }
    },

    *isFavorite({ payload }, { call, put }) {
      const { status, data } = yield call(doFavorite, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            isFavorite: data,
          },
        })
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    createCommentHandle(state, { payload }) {
      return {
        ...state,
        comments: [payload, ...state.comments],
      }
    },
  },
}
