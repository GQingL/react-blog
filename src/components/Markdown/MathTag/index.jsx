import React from 'react'
import MathJax from 'react-mathjax'

const MathTag = props => {
  return <MathJax.Node formula={props.value} />
}

export default MathTag
