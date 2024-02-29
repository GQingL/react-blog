import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Avatar, Button, Tag } from 'antd'
import { connect } from 'dva'

const Me = props => {
  const { dispatch, account, history, face } = props
  const [form] = Form.useForm()
  useEffect(() => {
    if (!account || !account.id) {
      history.push('/login')
    }
    dispatch({
      type: 'user/account',
      payload: { userId: account.id },
      callback(res) {
        if (res.status === 200) {
          const account = res.data
          Object.keys(form.getFieldsValue()).forEach(key => {
            const obj = {}
            obj[key] = account[key] || null
            form.setFieldsValue(obj)
          })
        }
      },
    })
  }, [])
  const changeAvatar = () => {
    dispatch({ type: 'user/changeAvatar' })
  }
  const onFinish = values => {
    if (dispatch) {
      dispatch({
        type: 'user/setAccount',
        payload: { ...values, face, id: account.id },
      })
    }
  }
  return (
    <>
      <h2>个人信息</h2>
      <Row>
        <Col span={12}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="mobile"
              label="手机号"
              rules={[
                {
                  type: 'mobile',
                  message: '不是有效的手机号',
                },
              ]}
            >
              <Input disabled placeholder="输入您的手机号" />
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
              <Input placeholder="输入您的昵称" />
            </Form.Item>
            <Form.Item name="realname" label="真实姓名">
              <Input placeholder="真实姓名" />
            </Form.Item>
            <Form.Item name="summary" label="简介">
              <Input.TextArea rows={4} placeholder="简介" />
            </Form.Item>
            <Form.Item
              name="github"
              label="Github地址"
              rules={[{ type: 'url' }]}
            >
              <Input placeholder="Github地址" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <div className="tc">
            <Avatar size={128} src={face} />
          </div>
          <div className="tc mt-10">
            <Button onClick={changeAvatar}>切换图片</Button>
          </div>
          <div className="tc mt-10">
            <span>
              账户类型：<Tag color="blue">管理员</Tag>
            </span>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default connect(({ user: { face, account }, loading }) => ({
  face,
  account,
  loading,
}))(Me)
