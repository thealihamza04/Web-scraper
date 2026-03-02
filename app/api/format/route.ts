import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const MODEL = process.env.OPENAI_MODEL ?? 'gpt-5-nano'

export async function POST(req: NextRequest) {
  const { data, prompt } = await req.json()
  if (!data) return NextResponse.json({ error: 'Data required' }, { status: 400 })

  try {
    const content =
      typeof data === 'string' ? data : JSON.stringify(data, null, 2)

    const baseInstruction =
      'Return only Markdown (no code fences). Do not add facts. Preserve URLs. If something is missing, say "Unknown".'
    const userInstruction =
      typeof prompt === 'string' && prompt.trim().length > 0
        ? `User request: ${prompt.trim()}`
        : ''

    const response = await client.responses.create({
      model: MODEL,
      input: `${baseInstruction}\n${userInstruction}\n\nScraped data:\n${content}`
    })

    const markdown = response.output_text ?? ''
    return NextResponse.json({ markdown })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
