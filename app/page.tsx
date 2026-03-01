'use client'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function scrape() {
    setLoading(true)
    const res = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    const json = await res.json()
    setData(json)
    setLoading(false)
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
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm border">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  )
}
