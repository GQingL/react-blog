import React from 'react'
import { Anchor } from 'antd'

const ArticleAnchor = props => {
  const { anchors } = props
  const anchorRender = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <Anchor.Link
            key={`${item.tag}-${item.title}`}
            href={`#${item.href}`}
            title={item.title}
            className={item.ismain ? 'bold' : ''}
          >
            {anchorRender(item.children)}
          </Anchor.Link>
        )
      }
      return (
        <Anchor.Link
          key={`${item.tag}-${item.title}`}
          href={`#${item.href}`}
          title={item.title}
          className={item.ismain ? 'bold' : ''}
        />
      )
    })
  }
  return (
    <>
      <Anchor className="mt-10 ml-0 bn" showInkInFixed>
        {anchorRender(anchors)}
      </Anchor>
    </>
  )
}

export default ArticleAnchor
