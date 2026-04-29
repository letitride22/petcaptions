import { useState, useRef, useCallback } from 'react'
import Header from '../components/Header'
import AdBanner from '../components/AdBanner'
import { getVibes, generateCaption, composeImage } from '../utils/captionApi'
import './CaptionPage.css'

const VIBES = getVibes()

export default function CaptionPage({ onSave }) {
  const [image, setImage] = useState(null)
  const [selectedVibe, setSelectedVibe] = useState('sassy')
  const [state, setState] = useState('idle')
  const [caption, setCaption] = useState('')
  const [composedImage, setComposedImage] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef()

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage({ dataUrl: e.target.result, file })
      setState('idle')
      setCaption('')
      setComposedImage(null)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFileInput = (e) => handleFile(e.target.files[0])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const doGenerate = async () => {
    if (!image || state === 'generating') return
    setState('generating')
    setErrorMsg('')
    setCaption('')
    setComposedImage(null)
    try {
      const base64 = image.dataUrl.replace(/^data:image\/\w+;base64,/, '')
      const cap = await generateCaption(base64, selectedVibe)
      setCaption(cap)
      const composed = await composeImage(image.dataUrl, cap, selectedVibe)
      setComposedImage(composed)
      setState('done')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Try again!')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (!composedImage) return
    const a = document.createElement('a')
    a.href = composedImage
    a.download = `petcaption-${selectedVibe}-${Date.now()}.jpg`
    a.click()
  }

  const handleSaveToGallery = () => {
    if (!composedImage) return
    onSave({
      id: Date.now(),
      composedImage,
      caption,
      vibe: selectedVibe,
      createdAt: new Date().toISOString()
    })
  }

  const handleReset = () => {
    setImage(null)
    setState('idle')
    setCaption('')
    setComposedImage(null)
    setErrorMsg('')
  }

  const currentVibe = VIBES.find(v => v.id === selectedVibe)

  return (
    <div className="caption-page">
      <Header />
      <AdBanner slot="top" />

      <div className="caption-content">

        {!image && (
          <div
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            <div className="upload-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" fill="var(--cream-dark)" stroke="var(--cream-mid)" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M24 32V20M18 26l6-6 6 6" stroke="var(--brown-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="16" y="32" width="16" height="2.5" rx="1.25" fill="var(--cream-mid)" />
              </svg>
            </div>
            <p className="upload-title">Upload your pet photo</p>
            <p className="upload-sub">Tap to choose or drag & drop</p>
            <div className="upload-pets">🐶 🐱 🐰 🐹 🦜 🐠</div>
          </div>
        )}

        {image && (
          <div className="result-card">
            <div className="result-photo-wrap">
              <img src={image.dataUrl} alt="Your pet" className="result-photo" />
              {state === 'generating' && (
                <div className="generating-overlay">
                  <div className="generating-dots">
                    <span /><span /><span />
                  </div>
                  <p>Writing something hilarious...</p>
                </div>
              )}
              <button className="change-photo-btn" onClick={handleReset}>✕ New photo</button>
            </div>

            <div className="result-caption-box">
              {(state === 'idle' || state === 'generating') && (
                <p className="caption-placeholder">
                  {state === 'generating' ? '✨ Thinking...' : 'Your caption will appear here'}
                </p>
              )}
              {state === 'error' && (
                <p className="caption-error">😅 {errorMsg}</p>
              )}
              {state === 'done' && caption && (
                <div className="caption-done">
                  <p className="caption-vibe-label">{currentVibe?.emoji} {currentVibe?.label.toUpperCase()}</p>
                  <p className="caption-final-text">{caption}</p>
                  <p className="caption-watermark">🐾 petcaptions.com</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="section">
          <p className="section-label">Choose your vibe</p>
          <div className="vibes-scroll">
            {VIBES.map(vibe => (
              <button
                key={vibe.id}
                className={`vibe-pill ${selectedVibe === vibe.id ? 'active' : ''}`}
                onClick={() => setSelectedVibe(vibe.id)}
              >
                {vibe.emoji} {vibe.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cta-section">
          {!image && (
            <button className="btn btn-primary cta-btn" onClick={() => fileInputRef.current?.click()}>
              📸 Pick a Photo
            </button>
          )}
          {image && (state === 'idle' || state === 'error') && (
            <button className="btn btn-primary cta-btn" onClick={doGenerate}>
              ✨ Generate Caption
            </button>
          )}
          {state === 'generating' && (
            <button className="btn btn-primary cta-btn" disabled>
              <span className="btn-spinner" /> Working on it...
            </button>
          )}
          {state === 'done' && (
            <div className="done-actions">
              <button className="btn btn-orange cta-btn" onClick={handleDownload}>⬇️ Download</button>
              <button className="btn btn-secondary cta-btn" onClick={handleSaveToGallery}>💾 Save to Gallery</button>
              <button className="btn btn-secondary cta-btn" onClick={doGenerate}>🔄 Try Again</button>
            </div>
          )}
        </div>

        {!image && (
          <div className="how-it-works">
            <p className="section-label">How it works</p>
            <div className="steps">
              <div className="step"><span className="step-num">1</span><span>Upload your pet photo</span></div>
              <div className="step"><span className="step-num">2</span><span>Pick a vibe</span></div>
              <div className="step"><span className="step-num">3</span><span>AI writes the perfect caption</span></div>
              <div className="step"><span className="step-num">4</span><span>Download & share!</span></div>
            </div>
          </div>
        )}

      </div>
      <AdBanner slot="bottom" />
    </div>
  )
}
