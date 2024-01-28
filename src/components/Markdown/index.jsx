import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeTag from './CodeTag'
import ImageTag from './ImageTag'
import HeadTag from './HeadTag'
import MathTag from './MathTag'
import MathInline from './MathInline'

const Markdown = props => {
  const { markdown } = props
  return (
    <ReactMarkdown
      source={markdown}
      linkTarget={() => '_blank'}
      plugins={[[require('remark-math')]]}
      renderers={{
        code: CodeTag,
        image: ImageTag,
        heading: HeadTag,
        math: MathTag,
        inlineMath: MathInline,
      }}
    />
  )
}

export default Markdown
