import axios from 'axios'

export async function detectSPA(url: string): Promise<boolean> {
    const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const isSPA =
        data.length < 2000 ||
        data.includes('id="root"') ||
        data.includes('id="app"') ||
        data.includes('__NEXT_DATA__') ||
        data.includes('ng-version')
    return isSPA
}
