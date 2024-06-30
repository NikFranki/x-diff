import * as React from 'react'
import { decode } from 'base64-url'
import { useRouter } from 'next/router'
import XDiff from '@franki/x-diff';
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-json"
import { ErrorBoundary } from "react-error-boundary";

import { executeCode } from '../utils/execute-code'

export default function Preview() {
  const [code, setCode] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const router = useRouter()

  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  /** Decode "code" query parameter */
  // React.useEffect(() => {
  //   if (router.query.code) {
  //     setCode(decode(router.query.code as string))
  //   }
  // }, [router.query.code])

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        window.location.origin === event.origin &&
        event.data.type === 'preview'
      ) {
        setCode(decode(event.data.code))
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  /** Execute preview to render */
  React.useEffect(() => {
    if (code === null) return

    setError(null)
    setLoading(true)

    executeCode(code,
      {
        react: React,
        '@franki/x-diff': XDiff,
        'prismjs': Prism,
        "prismjs/themes/prism-okaidia.css": "prismjs/themes/prism-okaidia.css",
        "prismjs/components/prism-typescript": "prismjs/components/prism-typescript",
        "prismjs/components/prism-json": "prismjs/components/prism-json",
      }
    )
      .then((Preview: any) => {
        setPreview((Preview ? <Preview /> : null) as any)
      })
      .catch((error) => {
        setError(error.toString())
      })
      .finally(() => {
        setLoading(false)
      })
  }, [code])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {
        loading
          ? 'Loading preview...'
          : preview
      }
      {error}
    </ErrorBoundary>
  )
}

import { useErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: any) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}