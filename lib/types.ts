export interface ScrapeResult {
  url: string
  type: 'static' | 'spa'
  title: string
  description: string
  headings: { level: string; text: string }[]
  text: string
  links: { text: string; href: string }[]
  images: { alt: string; src: string }[]
}
