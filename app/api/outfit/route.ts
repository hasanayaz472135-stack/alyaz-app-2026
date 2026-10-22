import { generateText } from 'ai'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const prompt = `You are Alyaz Fit Studio, a concise Turkish fashion stylist. Recommend a complete outfit around ${body.product ?? 'the selected product'} for a person with height ${body.height ?? 'unknown'} cm, weight ${body.weight ?? 'unknown'} kg, fit preference ${body.fit ?? 'regular'}, occasion ${body.occasion ?? 'daily'}. Return exactly three short bullet lines: top, bottom/shoes, and styling tip. Avoid medical claims and be inclusive.`
  const result = await generateText({ model: 'openai/o4-mini', system: 'Give practical, stylish ecommerce outfit advice in Turkish.', prompt, maxOutputTokens: 180 })
  return Response.json({ recommendation: result.text })
}
