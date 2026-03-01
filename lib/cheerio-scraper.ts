import axios from 'axios'
import * as cheerio from 'cheerio'
import { ScrapeResult } from './types'

export async function scrapeStatic(url: string): Promise<ScrapeResult> {
    const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const $ = cheerio.load(data)

    return {
        url,
        type: 'static',
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
