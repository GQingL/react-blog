import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Avatar, Button, Tag } from 'antd'
import { connect } from 'dva'

const Me = props => {
  const { dispatch, account, history, face } = props
  const [form] = Form.useForm()

  // 使用async/await处理异步逻辑
  const fetchData = async () => {
    if (!account || !account.id) {
      history.push('/login')
      return
    }
    try {
      const res = await dispatch({
        type: 'user/account',
        payload: { userId: account.id },
      })
      if (res.status === 200) {
        const accountData = res.data
        form.setFieldsValue(
          Object.keys(form.getFieldsValue()).reduce(
            (acc, key) => ({
              ...acc,
              [key]: accountData[key] || null,
            }),
            {},
          ),
        )
      }
    } catch (error) {
      console.error('Error fetching account data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    // 将account加入依赖数组
  }, [dispatch, form])

  const changeAvatar = () => {
    dispatch({ type: 'user/changeAvatar' })
  }

  const onFinish = async values => {
    try {
      await dispatch({
        type: 'user/setAccount',
        payload: { ...values, face, id: account.id },
      })
    } catch (error) {
      console.error('Error setting account data:', error)
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
