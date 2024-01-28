import React from 'react'
import MathJax from 'react-mathjax'

const MathInline = props => {
  return <MathJax.Node formula={props.value} inline />
}

export default MathInline
