'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formatting, setFormatting] = useState(false)
  const [formatError, setFormatError] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [prompt, setPrompt] = useState('')

  async function scrape() {
    setLoading(true)
    setMarkdown('')
    setFormatError('')
    const res = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  async function formatMarkdown() {
    if (!data || formatting) return
    setFormatting(true)
    setFormatError('')
    const res = await fetch('/api/format', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, prompt })
    })
    const json = await res.json()
    if (json.error) {
      setFormatError(json.error)
    } else {
      setMarkdown(json.markdown ?? '')
    }
    setFormatting(false)
  }

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Next.js Web Scraper</h1>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-grow rounded"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={scrape}
        >
          Scrape
        </button>
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {data && (
        <div className="space-y-3">
          <textarea
            className="border p-2 w-full rounded min-h-24"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Add instructions for formatting (optional)"
          />
          <div className="flex items-center gap-3">
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
            onClick={formatMarkdown}
            disabled={formatting}
          >
            {formatting ? 'Formatting...' : 'Format to Markdown'}
          </button>
          {formatError && <p className="text-sm text-red-700">{formatError}</p>}
          </div>
        </div>
      )}
      {data && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm border">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      {markdown && (
        <section className="bg-white border rounded p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Formatted Markdown</h2>
          <div className="markdown">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </section>
      )}
    </main>
  )
}
