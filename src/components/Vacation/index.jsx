import React, { useEffect } from 'react'
import { Tag, Card } from 'antd'
import { connect } from 'dva'

const Tags = props => {
  const { dispatch, holidays, loading } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/holiday' })
    }
  }, [])
  return (
    <Card
      loading={loading}
      size="small"
      bordered={false}
      title="打工人健康提醒"
      className="mt-20"
      headStyle={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
    >
      {holidays &&
        holidays.map(tag => (
          <Tag
            key={tag}
            className="mb-10"
            style={{
              width: '100%',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
            }}
          >
            {tag}
          </Tag>
        ))}
    </Card>
  )
}

export default connect(({ article: { holidays }, loading }) => ({
  holidays,
  loading: loading.effects['article/holiday'],
}))(Tags)
