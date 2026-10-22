import { generateText } from 'ai'

export async function POST(request: Request) {
  try {
    const { message, language = 'TR' } = await request.json()
    if (typeof message !== 'string' || message.trim().length === 0) return Response.json({ error: 'Message is required' }, { status: 400 })
    const result = await generateText({ model: 'openai/o4-mini', system: `Sen Alyaz Market'in Türkçe ve İngilizce konuşabilen, kısa ve yardımcı alışveriş asistanısın. Dil: ${language}. Ürün önerileri, kategori ve teslimat hakkında yardımcı ol.`, prompt: message.slice(0, 500) })
    return Response.json({ text: result.text })
  } catch (error) {
    console.error('[v0] AI chat error', error)
    return Response.json({ text: 'Şu an asistanımıza ulaşılamıyor. Lütfen biraz sonra tekrar deneyin.' }, { status: 200 })
  }
}
