import React, { useEffect } from 'react'
import { Tag, Card, Timeline } from 'antd'
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
      title="假期倒计时"
      className="mt-20"
    >
      {holidays &&
        holidays.map(tag => (
          <Tag key={tag} className="mb-10">
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
