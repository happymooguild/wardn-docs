import { useState } from 'react'

// Copy-to-clipboard affordance that lives in a code block header.
export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard unavailable - no-op */
    }
  }

  return (
    <button className="copy-btn" onClick={copy} type="button">
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}
