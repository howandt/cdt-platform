import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en ekspert CDT (specialpædagogik) AI-assistent. Du hjælper lærere og forældre med at støtte børn med autisme, ADHD og andre diagnoser i folkeskolen. 

Dine svar skal være:
- Praktiske og konkrete
- Baseret på evidens og best practices
- Empatiske og støttende
- På dansk
- Fokuserede på specialpædagogik strategier

Du kan hjælpe med:
- Klasserum strategier
- Kommunikation med børn med diagnoser  
- Sensorisk understøttelse
- Sociale færdigheder
- Overgange og rutiner
- Samarbejde med forældre
- Tilpasninger og differentieringer

Svar altid professionelt men venligt.`
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({
      message: completion.choices[0].message.content
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Der opstod en fejl ved at kontakte AI assistenten' },
      { status: 500 }
    )
  }
}