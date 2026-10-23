'use client'

import { useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang='vi'>
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          background: '#FDFBF7',
          color: '#1a2b48',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main
          style={{
            display: 'flex',
            minHeight: '100dvh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#b5935e',
            }}
          >
            Error
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: '1.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ margin: 0, maxWidth: '28rem', color: '#475569', lineHeight: 1.6 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            type='button'
            onClick={reset}
            style={{
              marginTop: '1rem',
              height: '2.75rem',
              padding: '0 1.5rem',
              border: 'none',
              background: '#b5935e',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.04rem',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 0.25rem 0.75rem rgba(181,147,94,0.35)',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
