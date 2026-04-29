import { useState, useEffect } from 'react'
import CaptionPage from './pages/CaptionPage'
import GalleryPage from './pages/GalleryPage'
import TrendingPage from './pages/TrendingPage'
import BottomNav from './components/BottomNav'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('caption')
  const [gallery, setGallery] = useState([])

  // Load gallery from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('petcaptions_gallery')
    if (saved) {
      try { setGallery(JSON.parse(saved)) } catch {}
    }
  }, [])

  const saveToGallery = (item) => {
    const updated = [item, ...gallery].slice(0, 50) // max 50
    setGallery(updated)
    localStorage.setItem('petcaptions_gallery', JSON.stringify(updated))
  }

  return (
    <div className="app">
      <div className="page-container">
        {activeTab === 'caption' && (
          <CaptionPage onSave={saveToGallery} />
        )}
        {activeTab === 'gallery' && (
          <GalleryPage gallery={gallery} setGallery={setGallery} />
        )}
        {activeTab === 'trending' && (
          <TrendingPage />
        )}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
