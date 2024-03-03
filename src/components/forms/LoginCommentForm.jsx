import React from 'react'
import { Button, Input, Form } from 'antd'
import { connect } from 'dva'

const LoginCommentForm = props => {
  const { author, id, dispatch } = props
  const [form] = Form.useForm()
  const onFinish = values => {
    if (dispatch) {
      dispatch({
        type: 'article/addComment',
        payload: {
          ...values,
          articleId: id,
          commentUserId: author.id,
          fatherId: '0',
        },
      })
    }
    form.resetFields()
  }
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
