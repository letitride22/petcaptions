const VIBES = {
  sassy: {
    label: 'Sassy',
    emoji: '💅',
    prompt: `You are writing a SASSY caption for a pet photo. The caption should drip with attitude, shade, and confidence. Think "I woke up like this" energy. The pet is unbothered, fabulous, and knows it. Use sass, slight condescension toward humans, and effortless superiority. 1-2 punchy sentences max.`
  },
  dramatic: {
    label: 'Dramatic',
    emoji: '🎭',
    prompt: `You are writing a DRAMATICALLY OVERDRAMATIC caption for a pet photo. Everything is a catastrophe. A minor inconvenience is a Shakespearean tragedy. Lean into theatrical, operatic, soap-opera energy. 1-2 sentences, maximum drama.`
  },
  judgy: {
    label: 'Judgy',
    emoji: '🧐',
    prompt: `You are writing a JUDGY caption from the pet's perspective. The pet is silently judging everything. Think raised eyebrow, silent disappointment, withering assessment. Short, cutting, devastating. 1-2 sentences.`
  },
  unhinged: {
    label: 'Unhinged',
    emoji: '🤪',
    prompt: `You are writing an UNHINGED caption for a pet photo. Pure chaos. Nonsense stream of consciousness, conspiracy theories about squirrels, sudden topic changes, manic enthusiasm. 2-3 sentences of pure chaos.`
  },
  sweet: {
    label: 'Sweet',
    emoji: '🥰',
    prompt: `You are writing a genuinely SWEET, heartwarming caption for a pet photo. Pure serotonin. Wholesome, loving, soft. 1-2 warm, cozy sentences.`
  },
  suspicious: {
    label: 'Suspicious',
    emoji: '👀',
    prompt: `You are writing a SUSPICIOUS caption where the pet is clearly up to something. The pet has a scheme. 1-2 sentences of barely-concealed guilt or paranoia.`
  }
}

export function getVibes() {
  return Object.entries(VIBES).map(([id, v]) => ({ id, ...v }))
}

function detectMediaType(base64) {
  if (base64.startsWith('iVBOR')) return 'image/png'
  if (base64.startsWith('R0lG')) return 'image/gif'
  if (base64.startsWith('UklG')) return 'image/webp'
  return 'image/jpeg'
}

export async function generateCaption(imageBase64, vibeId) {
  const vibe = VIBES[vibeId]
  if (!vibe) throw new Error('Unknown vibe')

  const mediaType = detectMediaType(imageBase64)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'REPLACE_WITH_YOUR_KEY',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 100,
      system: vibe.prompt + '\n\nOutput ONLY the caption — maximum 12 words, one punchy sentence. No quotes, no labels, no preamble.',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: 'Write a caption for this pet photo.'
            }
          ]
        }
      ]
    })
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'API error ' + response.status)
  }

  const data = await response.json()
  const caption = data.content?.find(b => b.type === 'text')?.text?.trim()
  if (!caption) throw new Error('No caption returned')
  return caption
}

export async function composeImage(imageDataUrl, caption, vibeId) {
  const vibe = VIBES[vibeId]

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const WIDTH = 1080
      const PHOTO_H = 1080
      const BOX_H = 300
      canvas.width = WIDTH
      canvas.height = PHOTO_H + BOX_H
      const ctx = canvas.getContext('2d')

      const scale = Math.max(WIDTH / img.width, PHOTO_H / img.height)
      const sw = WIDTH / scale
      const sh = PHOTO_H / scale
      const sx = (img.width - sw) / 2
      const sy = (img.height - sh) / 2
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, WIDTH, PHOTO_H)

      ctx.fillStyle = '#FFF8F3'
      ctx.fillRect(0, PHOTO_H, WIDTH, BOX_H)

      ctx.font = 'bold 28px Outfit, sans-serif'
      ctx.fillStyle = '#A06840'
      ctx.textAlign = 'center'
      ctx.fillText(vibe.emoji + ' ' + vibe.label.toUpperCase(), WIDTH / 2, PHOTO_H + 60)

      ctx.font = 'bold 46px Outfit, sans-serif'
      ctx.fillStyle = '#3D2010'
      ctx.textAlign = 'center'
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0

      const maxW = WIDTH * 0.85
      const words = caption.split(' ')
      const lines = []
      let current = ''
      for (const word of words) {
        const test = current ? current + ' ' + word : word
        if (ctx.measureText(test).width > maxW && current) {
          lines.push(current)
          current = word
        } else {
          current = test
        }
      }
      if (current) lines.push(current)

      const lineH = 56
      const totalH = lines.length * lineH
      const startY = PHOTO_H + 100 + (BOX_H - 100 - totalH) / 2

      lines.forEach((line, i) => {
        ctx.fillText(line, WIDTH / 2, startY + i * lineH)
      })

      ctx.font = '500 22px Outfit, sans-serif'
      ctx.fillStyle = '#A06840'
      ctx.textAlign = 'center'
      ctx.fillText('🐾 petcaptions.com', WIDTH / 2, PHOTO_H + BOX_H - 28)

      resolve(canvas.toDataURL('image/jpeg', 0.92))
    }
    img.onerror = reject
    img.src = imageDataUrl
  })
}