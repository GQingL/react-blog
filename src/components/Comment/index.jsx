import React, { useEffect } from 'react'
import { connect } from 'dva'
import { Divider, Tooltip, List, Card } from 'antd'
import { Comment } from '@ant-design/compatible'
import moment from 'moment'
import UserAvatar from '@/components/UserAvatar'
import LoginCommentForm from '../forms/LoginCommentForm'

moment.locale('zh-cn')
const Content = ({ content }) => <p>{content}</p>

const Datetime = ({ time }) => {
  return (
    <Tooltip title={time}>
      <span>{moment(time).fromNow()}</span>
    </Tooltip>
  )
}

const AddComment = props => {
  const { account, dispatch, id, comments, loading } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/comments', payload: { articleId: id } })
    }
  }, [])
  return (
    <Card
      title="评论"
      bordered={false}
      loading={loading}
      className="mtb-20"
      id="comment"
    >
      <List
        className="comment-list"
        itemLayout="horizontal"
        split={false}
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <Comment
              author={item.commentUserNickname}
              avatar={<UserAvatar src={item.commentUserFace} />}
              content={<Content content={item.content} />}
              datetime={<Datetime time={item.createTime} />}
            />
          </List.Item>
        )}
      />
      <Divider />
      {account && account.id ? (
        <Comment
          avatar={<UserAvatar src={account.face} />}
          content={<LoginCommentForm id={id} author={account} />}
        />
      ) : (
        <Comment> 请登陆后再评论 </Comment>
      )}
    </Card>
  )
}

export default connect(
  ({ article: { comments }, user: { account }, loading }) => ({
    comments,
    account,
    loading: loading.effects['article/comments'],
  }),
)(AddComment)
