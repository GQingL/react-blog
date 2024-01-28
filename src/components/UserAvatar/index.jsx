import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const UserAvatar = props =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  )

export default UserAvatar
