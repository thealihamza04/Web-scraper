import { NextRequest, NextResponse } from 'next/server'
import { detectSPA } from '@/lib/detect'

export async function POST(req: NextRequest) {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    try {
        const isSPA = await detectSPA(url)
        return NextResponse.json({ isSPA })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
