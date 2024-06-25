import React, { useState } from 'react'
import { LuCheck, LuCopy, LuChevronDown, LuChevronRight } from 'react-icons/lu'
import { highlight } from 'sugar-high'

import styles from '../styles/Home.module.css'

const CodeBlock = (props: any) => {
  const { code, onlyShowCode } = props;

  const codeHTML = highlight(code || '')

  const [opened, setOpened] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const handleOpened = () => {
    setOpened(!opened)
  }

  const handleCopy = () => {
    if (!code) return

    setCopied(true)
    navigator.clipboard.writeText(code.trim())

    setTimeout(() => setCopied(false), 800)
  }

  const Code = () => {
    return (
      <div className={styles.codeBlockContent}>
        <pre>
          <code
            dangerouslySetInnerHTML={{ __html: codeHTML }}
          />
        </pre>
        {copied ? <LuCheck size={14} /> : <LuCopy onClick={handleCopy} size={14} />}
      </div>
    )
  }

  if (onlyShowCode) {
    return <Code />
  }

  return (
    <div className={styles.codeBlockWrapper}>
      <div onClick={handleOpened} className={styles.codeBlockDownRight}>
        {opened ? <LuChevronDown size={14} /> : <LuChevronRight />}
        <div>{opened ? 'Hide Code' : 'Show Code'}</div>
      </div>
      {opened && <Code />}
    </div>
  )
}

export default CodeBlock
