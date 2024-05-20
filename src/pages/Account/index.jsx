import React, { memo } from 'react'
import { Menu, Row, Col } from 'antd'
import { Link } from 'umi'
import Header from '@/components/Header'
import styles from './index.less'

const LeftMenu = memo(({ pathname }) => {
  // 确保pathname存在以避免逻辑bug
  const selectedKeys = pathname ? [pathname] : ['/account/me']
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['/account/me']}
      selectedKeys={selectedKeys}
    >
      <Menu.Item key="/account/me">
        <Link to="/account/me">我的信息</Link>
      </Menu.Item>
    </Menu>
  )
})

const Account = memo(props => {
  const {
    children,
    location: { pathname },
  } = props

  const childrenContent = children || <div>暂无内容</div>

  return (
    <>
      <Header />
      <Row className="mt-20">
        <Col span={18} offset={3}>
          <div className={styles.main}>
            <div className={styles.leftmenu}>
              <LeftMenu pathname={pathname} />
            </div>
            <div className={styles.right}>{childrenContent}</div>
          </div>
        </Col>
      </Row>
    </>
  )
})

LeftMenu.displayName = 'LeftMenu'

Account.displayName = 'Account'

export default Account
