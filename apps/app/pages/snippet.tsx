import React, { useState } from 'react'
// import { toast } from 'sonner'
import { LuCheck, LuCopy } from 'react-icons/lu'

import styles from '../styles/Home.module.css'

const Snippet = (props: any) => {
  const { code } = props;

  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    if (!code) return

    setCopied(true)
    navigator.clipboard.writeText(code)

    setTimeout(() => setCopied(false), 800)
    // toast.success('Copied', {
    //   onAutoClose: () => setCopied(false)
    // })
  }

  return (
    <div className={styles.snippetWrapper}>
      <pre>{code}</pre>
      {copied ? <LuCheck size={14} /> : <LuCopy onClick={handleCopy} size={14} />}
    </div>
  )
}

export default Snippet
