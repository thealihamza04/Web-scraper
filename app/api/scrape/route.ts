import { NextRequest, NextResponse } from 'next/server'
import { detectSPA } from '@/lib/detect'
import { scrapeStatic } from '@/lib/cheerio-scraper'
import { scrapeSPA } from '@/lib/playwright-scraper'

export async function POST(req: NextRequest) {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    try {
        const isSPA = await detectSPA(url)
        const result = isSPA ? await scrapeSPA(url) : await scrapeStatic(url)
        return NextResponse.json(result)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
