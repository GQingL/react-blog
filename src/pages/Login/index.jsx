import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, Input } from 'antd'
import { MobileOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'dva'

const Login = props => {
  const [form] = Form.useForm()
  const { dispatch, history, location, account } = props
  useEffect(() => {
    if (account && account.id) {
      history.push('/')
    }
  }, [])
  // 执行登陆逻辑
  const onFinish = values => {
    if (dispatch) {
      dispatch({
        type: 'user/login',
        payload: values,
        callback(response) {
          dispatch({
            type: 'user/account',
            payload: { userId: response.data.uid },
            callback(_user) {
              if (location.isRegister) {
                history.push('/')
              } else {
                history.goBack()
              }
            },
          })
        },
      })
    }
  }
  const [verificationCodeSent, setVerificationCodeSent] = useState(false)
  const handleSendVerificationCode = values => {
    // 发送验证码的逻辑
    setVerificationCodeSent(true)
    // 请求接口
    dispatch({
      type: 'user/sms',
      payload: { mobile: values.mobile },
    })
  }

  const [canSendVerificationCode, setCanSendVerificationCode] = useState(false)
  const handleValuesChange = (changedValues, allValues) => {
    const { mobile } = allValues
    setCanSendVerificationCode(/^1[3456789]\d{9}$/.test(mobile))
  }

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col span={8}>
        <Row justify="center" style={{ marginBottom: '2rem' }}>
          <h1>登录</h1>
        </Row>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input prefix={<MobileOutlined />} placeholder="请输入手机号" />
          </Form.Item>
          {verificationCodeSent ? (
            <Form.Item
              label="验证码"
              name="smsCode"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Input prefix={<LockOutlined />} placeholder="请输入验证码" />
            </Form.Item>
          ) : (
            <Form.Item>
              <Button
                disabled={!canSendVerificationCode}
                onClick={() =>
                  handleSendVerificationCode(form.getFieldsValue())
                }
                block
              >
                获取验证码
              </Button>
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default connect(({ user: { account }, loading }) => ({
  account,
  loading,
}))(Login)
