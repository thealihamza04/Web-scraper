import { chromium } from 'playwright'
import * as cheerio from 'cheerio'
import { ScrapeResult } from './types'

export async function scrapeSPA(url: string): Promise<ScrapeResult> {
    const token = process.env.BROWSERLESS_TOKEN;
    const browser = token
        ? await chromium.connectOverCDP(`wss://chrome.browserless.io?token=${token}`)
        : await chromium.launch();
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle' })
    const html = await page.content()
    await browser.close()

    // reuse cheerio to parse fully rendered HTML
    const $ = cheerio.load(html)

    return {
        url,
        type: 'spa',
        title: $('title').text(),
        description: $('meta[name="description"]').attr('content') || '',
        headings: $('h1,h2,h3,h4,h5,h6').map((_, el) => ({
            level: el.tagName,
            text: $(el).text().trim()
        })).get(),
        text: $('body').text().replace(/\s+/g, ' ').trim(),
        links: $('a').map((_, el) => ({
            text: $(el).text().trim(),
            href: $(el).attr('href') || ''
        })).get(),
        images: $('img').map((_, el) => ({
            alt: $(el).attr('alt') || '',
            src: $(el).attr('src') || ''
        })).get()
    }
}
