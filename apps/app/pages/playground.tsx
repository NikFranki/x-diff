import * as React from 'react'
import { encode } from 'base64-url'

import styles from '../styles/Home.module.css'

const initialCodeString = `
import React from 'react'
import XDiff from '@franki/x-diff'
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-json"

export default function App() {
  const { diff } = new XDiff()
  const before = {
    a: null,
    c: 1,
    e: [
      {
        a: 1
      }
    ]
  }
  const after = {
    a: 2,
    d: 1,
    e: [
      {
        b: 1
      }
    ]
  }
  const result = diff(before, after)

  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <h1>Try Playground</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Diff result is</h2>
      <pre className="language-json">
        <code className="language-json">{JSON.stringify(result, null, 2)}</code>
      </pre>
    </div>
  )
}
`.trim()

export default function Index() {
  const [code, setCode] = React.useState('')

  React.useEffect(() => {
    // make sure initial code was set after Preview component rendered and its events all had listened
    setTimeout(() => {
      setCode(initialCodeString)
    }, 300)
  }, [])

  return (
    <div className={styles.playgroundWrapper}>
      <textarea
        spellCheck="false"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <Preview code={code} />
    </div>
  )
}

function Preview({ code }: any) {
  const frameRef = React.useRef<any>(null)
  const frameSource = React.useRef<any>(null)

  /**
   * Only set the source of the iframe on the initial mount since we use message
   * passing below for subsequent updates.
   */
  if (frameSource.current === null) {
    frameSource.current = `/preview?code=${encode(code)}`
  }

  React.useEffect(() => {
    frameRef.current.contentWindow.postMessage({
      code: encode(code),
      type: 'preview',
    })
  }, [code])

  return <iframe width="100%" height="100%" ref={frameRef} src={frameSource.current} />
}