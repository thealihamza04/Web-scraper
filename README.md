# Web Scraper

Minimal Next.js app to scrape a URL and format the result into Markdown using OpenAI.

## Setup

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm
- Playwright browsers (run `npx playwright install` after `npm install`)
- Optional: Browserless token for remote Chromium (`BROWSERLESS_TOKEN`)

```bash
npm install
```

Create `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
# Optional
OPENAI_MODEL=gpt-5-nano
```

Run:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Usage

1. Scrape a URL.
2. Optionally add a prompt.
3. Format to Markdown.

## API

- `POST /api/scrape`
- `POST /api/format`

## Notes

- Formatter always returns Markdown (no code fences).
- Keep API keys in `.env.local`.
