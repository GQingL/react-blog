import React from 'react'

const HeadTag = ({ level, children }) => {
  if (children.length === 0) return null
  const {
    props: { nodeKey, value },
  } = children[0]
  return React.createElement(
    `h${level}`,
    { className: 'fw-700', key: nodeKey },
    value,
  )
}

export default HeadTag
