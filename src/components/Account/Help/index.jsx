import React, { useState } from 'react'
import { Layout, Input, Button, List, Avatar, Typography } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'

import { connect } from 'dva'

const { Content } = Layout
const { Text } = Typography

const Help = props => {
  const { dispatch } = props

  const [messages, setMessages] = useState([]) // 保存聊天记录
  const [inputValue, setInputValue] = useState('') // 输入框内容

  // 发送消息
  const sendMessage = async () => {
    if (!inputValue.trim()) return // 如果输入为空，不发送消息
    const newMessages = [...messages, { type: 'user', content: inputValue }]
    setMessages(newMessages)
    setInputValue('') // 清空输入框
    const res = await dispatch({
      type: 'gpt/kimiChatText',
      payload: { content: inputValue },
    })
    if (res.status === 200) {
      const newAIMessages = [
        ...newMessages,
        { type: 'ai', content: `回复：${res.data}` }, // 模拟 AI 回复
      ]
      setMessages(newAIMessages)
    } else {
      const errorMessages = [
        ...newMessages,
        { type: 'ai', content: '消息回复失败，请重新提问' }, // 模拟 AI 回复
      ]
      setMessages(errorMessages)
    }
  }

  // 监听 "Enter" 键发送消息
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <>
      <Layout style={{ height: '100vh', background: '#fff' }}>
        {/* 主内容区域 */}
        <Content
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {/* 聊天内容展示区域 */}
          <div
            style={{
              flex: 1,
              marginBottom: '16px',
              overflowY: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              padding: '16px',
              background: '#fafafa',
            }}
          >
            <List
              dataSource={messages}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={{
                    justifyContent:
                      item.type === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.type === 'user' ? (
                            <UserOutlined />
                          ) : (
                            <RobotOutlined />
                          )
                        }
                        style={{
                          backgroundColor:
                            item.type === 'user' ? '#1890ff' : '#f56a00',
                        }}
                      />
                    }
                    description={
                      <Text
                        style={{
                          backgroundColor:
                            item.type === 'user' ? '#e6f7ff' : '#f5f5f5',
                          padding: '8px 12px',
                          borderRadius: '16px',
                          display: 'inline-block',
                        }}
                      >
                        {item.content}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          {/* 输入框与发送按钮 */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              placeholder="请输入消息..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{ flex: 1 }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={sendMessage}
            >
              发送
            </Button>
          </div>
        </Content>
      </Layout>
    </>
  )
}

export default connect(({ loading }) => ({
  loading,
}))(Help)
