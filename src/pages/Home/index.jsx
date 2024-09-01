import React, { useEffect } from 'react'
import { Layout, Card } from 'antd'
import { connect } from 'dva'
import Header from '@/components/Header'
import SliderList from '@/components/SliderList'
import Vacation from '@/components/Vacation'
import styles from './index.less'

const HOT_PATH = 'article/hot'

const { Content } = Layout

const Home = props => {
  const {
    dispatch,
    hots,
    loading,
    children,
    location: { pathname },
  } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: HOT_PATH })
    }
  }, [])
  return (
    <>
      <Header pathname={pathname} />
      <Content className={styles.homeContainer}>
        <div className={styles.homeContainerWrapper}>
          <div className={styles.homeContainerList}>{children}</div>
          <div className={styles.homeContainerSliderList}>
            <Card
              size="small"
              loading={loading}
              bordered={false}
              title="热门文章"
            >
              <SliderList
                dataSource={hots}
                bordered={false}
                size="small"
                split={false}
              />
            </Card>
            <Vacation />
            <div className="mt-10 ft-13 pl-10">
              {<div className={styles.aboutColor}>蒙ICP备2023002149号-1</div>}
              <div className={styles.aboutColor}>©2024 blog Create by Q</div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export default connect(({ article: { hots }, loading }) => ({
  hots,
  loading: loading.effects[HOT_PATH],
}))(Home)
