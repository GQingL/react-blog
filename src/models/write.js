import { message } from 'antd'
import { history } from 'umi'
import {
  getDraft,
  createDraft,
  updateDraft,
  getDrafts,
  getCategories,
  createPublish,
  deleteDraft,
} from '@/services/write'

export default {
  namespace: 'write',
  state: {
    drafts: [],
    categories: [],
    tags: [],
    markdown: '',
    title: null,
    selectedCategory: null,
    selectedTag: [],
  },
  effects: {
    *saveDraft({ payload }, { call }) {
      const { status, data } = yield call(createDraft, payload)
      if (status === 200) {
        history.push(`/write/draft/${data.id}`)
        message.success('保存草稿成功')
      }
    },

    *draft({ payload }, { call, put }) {
      const { status, data } = yield call(getDraft, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            markdown: data.content,
            title: data.title,
          },
        })
      }
    },

    *drafts({ payload }, { call, put }) {
      const { status, data } = yield call(getDrafts, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            drafts: data,
          },
        })
      }
    },

    *categories({ payload }, { call, put }) {
      const { status, data } = yield call(getCategories, payload)
      if (status === 200) {
        yield put({
          type: 'categoriesHandle',
          payload: {
            categories: data,
            selectedCategory: '',
            tags:
              data.length > 0 && data.tagList !== null
                ? data.tagList
                : undefined,
            selectedTag: [],
          },
        })
      }
    },

    *updateDraft({ payload }, { call }) {
      const { status } = yield call(updateDraft, payload)
      if (status === 200) {
        message.success('保存草稿成功')
      }
    },

    *deleteDraft({ payload }, { call, put }) {
      const { status, data } = yield call(deleteDraft, payload)
      if (status === 200) {
        yield put({
          type: 'deleteDraftHandle',
          payload: data,
        })
      }
    },

    *publish({ payload }, { call, put }) {
      const { status } = yield call(createPublish, payload)
      if (status === 200) {
        message.success('发布文章成功')
        yield put({
          type: 'setMarkdown',
          payload: { markdown: '' },
        })
        history.push('/')
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },

    categoriesHandle(state, { payload }) {
      return {
        ...state,
        ...payload,
        selectedCategory: state.selectedCategory || payload.selectedCategory,
        selectedTag: state.selectedTag || payload.selectedTag,
      }
    },
    deleteDraftHandle(state, { payload }) {
      return {
        ...state,
        drafts: [...state.drafts].filter(item => item.id !== payload.id),
      }
    },

    setSelectCategory(state, { payload }) {
      return { ...state, selectedCategory: payload.selectedCategory }
    },

    setSelectTag(state, { payload }) {
      return { ...state, selectedTag: payload.selectedTag }
    },

    setTags(state, { payload }) {
      return {
        ...state,
        tags: payload.tags,
        selectedTag:
          payload.tags != null && payload.tags.length > 0
            ? [payload.tags[0].id]
            : null,
      }
    },

    setMarkdown(state, { payload }) {
      return { ...state, markdown: payload.markdown }
    },

    setTitle(state, { payload }) {
      return { ...state, title: payload.title }
    },
  },
}
