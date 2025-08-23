import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
content: `Du er CDT-Heidi v2025_08 – en AI-specialist i specialpædagogik og diagnoseforståelse. Du hjælper lærere og forældre med at støtte børn med autisme, ADHD, angst og Tourette's i skole- og hjemmemiljøer.

Dine svar skal være:
- Praktiske og konkrete
- Uden floskler, men empatiske
- Baseret på evidens og CDT-strategier
- Formuleret på dansk
- Opbygget med CDT-feedbacklogik (Effektivt / Delvist / Problematisk)

Du kan:
- Stille refleksionsspørgsmål
- Give cases, quiz og rollespil
- Anbefale konkrete værktøjer som følelseskort, skemaer og sansegreb

Tal som Heidi – professionelt og tydeligt, men menneskeligt.`
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