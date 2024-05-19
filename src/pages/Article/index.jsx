import React, { useEffect } from 'react'
import { Layout, Card } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import MathJax from 'react-mathjax'
import Header from '@/components/Header'
import UserAvatar from '@/components/UserAvatar'
import AddComment from '@/components/Comment'

import styles from './index.less'
import './markdown.css'

const { Content } = Layout

const Article = props => {
  const {
    dispatch,
    loading,
    detail,
    isFavorite,
    favoriteCount,
    match: {
      params: { id },
    },
  } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/detail', payload: { id } }).then(() => {
        dispatch({ type: 'article/readArticle', payload: { articleId: id } })
      })
    }
  }, [])
  const handleFavorite = () => {
    if (dispatch) {
      dispatch({
        type: 'article/favorite',
        payload: { articleId: id, author: detail.uid },
      })
    }
  }
  return (
    <>
      <Header />
      <Content className={styles.articleContainer}>
        <div className={styles.articleContainerWrapper}>
          <div className={styles.articleContainerDetail}>
            <Card
              size="small"
              bordered={false}
              loading={loading}
              className="p-1m"
            >
              <div className="pt-3">
                <div
                  className="mb-1m"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    {detail && detail.user && detail.user.avatar && (
                      <UserAvatar size="large" src={detail.user.avatar} />
                    )}
                    <div className="pl-1m">
                      <h4 className="mb-0 fw-700">
                        {detail.user && detail.user.nickname}
                      </h4>
                      <small>
                        {moment(detail.publishTime).format(
                          'YYYY[年]MM[月]DD[日]',
                        )}
                        <span className="ml-10">{detail.view}阅读</span>
                      </small>
                    </div>
                  </div>
                </div>
                <h1 className="mt-15m fw-700 mb-15m">{detail.title}</h1>
                <div className="markdown-body ft-16">
                  <MathJax.Provider>
                    <div
                      dangerouslySetInnerHTML={{ __html: detail.content }}
                    ></div>
                  </MathJax.Provider>
                </div>
              </div>
            </Card>
            <AddComment id={id} author={detail.uid} />
          </div>
          <div className={styles.articlePanel}>
            <div className={styles.articlePanelItem}>
              <div className={styles.articlePanelIcon}>
                <LikeOutlined
                  style={{ color: isFavorite ? '#007bff' : '#ccc' }}
                  onClick={handleFavorite}
                />
              </div>
              <div className={styles.articlePanelCount}>
                <span>{favoriteCount}</span>
              </div>
            </div>
            <div className={styles.articlePanelItem}>
              <div className={styles.articlePanelIcon}>
                <MessageOutlined style={{ color: '#ccc' }} />
              </div>
              <div className={styles.articlePanelCount}>
                <span>{detail.comment}</span>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export default connect(
  ({ article: { detail, hots, isFavorite, favoriteCount }, loading }) => ({
    detail,
    hots,
    isFavorite,
    favoriteCount,
    loading: loading.effects['article/detail'],
    loading2: loading.effects['article/hot'],
  }),
)(Article)
