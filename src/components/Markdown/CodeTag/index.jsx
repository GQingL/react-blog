import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const CodeTag = props => {
  const { value, language } = props
  if (!value) return null
  return (
    <SyntaxHighlighter
      language={language}
      style={github}
      // showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeTag
