import React from 'react'
import { List } from 'antd'
import { Link } from 'umi'

const SliderList = props => {
  const { dataSource, size, split } = props
  return (
    <List
      itemLayout="vertical"
      dataSource={dataSource}
      size={size}
      split={split}
      renderItem={item => (
        <List.Item
          className="pl-0"
          actions={[
            <span key="1">
              <span className="pl-2 pointer">{item.readCounts}阅读</span>
            </span>,
            <span key="2">
              <span className="pl-2 pointer">{item.favoriteCounts}点赞</span>
            </span>,
          ]}
        >
          <Link
            to={`/article/${item.id}`}
            style={{ color: '#000000a6' }}
            target="_block"
          >
            {item.title}
          </Link>
        </List.Item>
      )}
    />
  )
}

export default SliderList
