import Header from '../components/Header'
import { getVibes } from '../utils/captionApi'
import './GalleryPage.css'

const VIBES = getVibes().reduce((acc, v) => ({ ...acc, [v.id]: v }), {})

export default function GalleryPage({ gallery, setGallery }) {
  const handleDelete = (id) => {
    const updated = gallery.filter(item => item.id !== id)
    setGallery(updated)
    localStorage.setItem('petcaptions_gallery', JSON.stringify(updated))
  }

  const handleDownload = (item) => {
    const a = document.createElement('a')
    a.href = item.composedImage
    a.download = `petcaption-${item.vibe}-${item.id}.jpg`
    a.click()
  }

  return (
    <div className="gallery-page">
      <Header />
      <div className="gallery-content">
        <div className="gallery-header-row">
          <h2 className="gallery-title">My Gallery</h2>
          <span className="gallery-count">{gallery.length} caption{gallery.length !== 1 ? 's' : ''}</span>
        </div>

        {gallery.length === 0 ? (
          <div className="gallery-empty">
            <div className="empty-icon">🐾</div>
            <p className="empty-title">No captions yet!</p>
            <p className="empty-sub">Generate your first caption and save it here.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {gallery.map(item => {
              const vibe = VIBES[item.vibe]
              return (
                <div key={item.id} className="gallery-item fade-up">
                  <div className="gallery-img-wrap">
                    <img src={item.composedImage} alt={item.caption} className="gallery-img" />
                    <div className="gallery-overlay">
                      <button
                        className="gallery-action-btn download"
                        onClick={() => handleDownload(item)}
                        title="Download"
                      >⬇️</button>
                      <button
                        className="gallery-action-btn delete"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >🗑️</button>
                    </div>
                  </div>
                  <div className="gallery-meta">
                    <span className="gallery-vibe-tag">
                      {vibe?.emoji} {vibe?.label}
                    </span>
                    <p className="gallery-caption-preview">{item.caption}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
