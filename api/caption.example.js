// api/caption.js — Vercel Serverless Function
// Rename to caption.js and deploy to /api/ folder
// This keeps your API key server-side (never exposed to browser)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { imageBase64, vibeId } = req.body

  if (!imageBase64 || !vibeId) {
    return res.status(400).json({ error: 'Missing imageBase64 or vibeId' })
  }

  const VIBES = {
    sassy: "You are writing a SASSY caption for a pet photo. Drip with attitude, shade, and confidence. 1-2 punchy sentences.",
    dramatic: "You are writing a DRAMATICALLY OVERDRAMATIC caption for a pet photo. Everything is a catastrophe. 1-2 theatrical sentences.",
    judgy: "You are writing a JUDGY caption from the pet's perspective. Silent disappointment, withering assessment. 1-2 cutting sentences.",
    unhinged: "You are writing an UNHINGED caption for a pet photo. Chaotic, manic, stream of consciousness. 2-3 sentences of pure chaos.",
    sweet: "You are writing a genuinely SWEET, heartwarming caption. Pure serotonin. 1-2 warm sentences.",
    suspicious: "You are writing a SUSPICIOUS caption where the pet is clearly up to something. 1-2 sentences of barely-concealed guilt."
  }

  const vibePrompt = VIBES[vibeId]
  if (!vibePrompt) {
    return res.status(400).json({ error: 'Unknown vibe' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // Server-side secret
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: `${vibePrompt}\n\nOutput ONLY the caption text — no quotes, no labels, no preamble.`,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 }
            },
            { type: 'text', text: `Write a caption for this pet photo.` }
          ]
        }]
      })
    })

    if (!response.ok) {
      const err = await response.json()
      return res.status(500).json({ error: err?.error?.message || 'API error' })
    }

    const data = await response.json()
    const caption = data.content?.find(b => b.type === 'text')?.text?.trim()
    res.status(200).json({ caption })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
