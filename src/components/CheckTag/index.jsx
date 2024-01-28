import React from 'react'
import { Tag } from 'antd'

const { CheckableTag } = Tag

const CheckTag = props => {
  const { data, checkTagHandle } = props
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map(item => (
          <CheckableTag
            key={item.en_name}
            onChange={checked => checkTagHandle(item.id, checked)}
          >
            {item.name}
          </CheckableTag>
        ))}
    </>
  )
}

export default CheckTag
