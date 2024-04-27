import React from 'react'
import { Button, Input, Form } from 'antd'
import { connect } from 'dva'

const useCommentForm = (dispatch, articleId, authorId) => {
  const [form] = Form.useForm()
  const onFinish = values => {
    try {
      if (dispatch) {
        // 对values中的content进行简单的XSS清洗
        const cleanedValues = {
          ...values,
          content: values.content.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        }
        dispatch({
          type: 'article/addComment',
          payload: {
            ...cleanedValues,
            articleId: articleId,
            commentUserId: authorId,
            fatherId: '0',
          },
        })
      }
      form.resetFields()
    } catch (error) {
      console.error('Failed to submit comment:', error)
    }
  }
  return [form, onFinish]
}

const LoginCommentForm = props => {
  const { author, id, dispatch } = props

  // 检查关键字段是否存在和按预期格式传入
  if (!dispatch || !author || typeof id !== 'string') {
    // 可以根据实际情况选择合适的错误处理方式
    console.error('Required props missing or invalid', props)
    return null
  }

  // 使用自定义hook来分离逻辑
  const [form, onFinish] = useCommentForm(dispatch, id, author.id)

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: '输入你的评论',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="发表您的看法" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            评论
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default connect(({ loading }) => ({
  loading,
}))(LoginCommentForm)
