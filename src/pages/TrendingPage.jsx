import Header from '../components/Header'
import AdBanner from '../components/AdBanner'
import './TrendingPage.css'

const TRENDING = [
  {
    id: 1,
    emoji: '🐱',
    vibe: '💅 Sassy',
    caption: "I didn't choose the nap life. The nap life chose me. And honestly? Correct choice.",
    likes: '24.1k',
    pet: 'Cat',
    bg: '#E8D5C4'
  },
  {
    id: 2,
    emoji: '🐶',
    vibe: '🎭 Dramatic',
    caption: "They said 'five more minutes.' That was three hours ago. I have become the wait.",
    likes: '18.7k',
    pet: 'Dog',
    bg: '#D4C5B8'
  },
  {
    id: 3,
    emoji: '🐰',
    vibe: '🤪 Unhinged',
    caption: "THEY MOVED THE PELLET BOWL 2 INCHES TO THE LEFT AND I WILL NEVER FORGIVE THIS BETRAYAL",
    likes: '31.2k',
    pet: 'Bunny',
    bg: '#C8DAD0'
  },
  {
    id: 4,
    emoji: '🐱',
    vibe: '🧐 Judgy',
    caption: "You call this a brushing? My lawyer will be in touch.",
    likes: '45.8k',
    pet: 'Cat',
    bg: '#D8C9E0'
  },
  {
    id: 5,
    emoji: '🐹',
    vibe: '👀 Suspicious',
    caption: "I know what you did with the sunflower seeds. I always know.",
    likes: '12.3k',
    pet: 'Hamster',
    bg: '#E0D4C0'
  },
  {
    id: 6,
    emoji: '🐶',
    vibe: '🥰 Sweet',
    caption: "Every single time you come home is the best moment of my entire life. Every. Single. Time.",
    likes: '67.4k',
    pet: 'Dog',
    bg: '#EAD5CE'
  },
  {
    id: 7,
    emoji: '🦜',
    vibe: '🎭 Dramatic',
    caption: "They covered my cage for the night. I have known darkness. I have transcended.",
    likes: '9.8k',
    pet: 'Parrot',
    bg: '#C8DCD4'
  },
  {
    id: 8,
    emoji: '🐱',
    vibe: '👀 Suspicious',
    caption: "The new plant arrived three days ago. I haven't pushed it off the shelf yet. I'm strategizing.",
    likes: '28.6k',
    pet: 'Cat',
    bg: '#D8E0CC'
  }
]

export default function TrendingPage() {
  return (
    <div className="trending-page">
      <Header />
      <AdBanner slot="top" />

      <div className="trending-content">
        <div className="trending-header">
          <h2 className="trending-title">Trending Captions</h2>
          <p className="trending-sub">The internet's most beloved pet moments</p>
        </div>

        <div className="trending-list">
          {TRENDING.map((item, i) => (
            <div
              key={item.id}
              className="trending-card fade-up"
              style={{ animationDelay: `${i * 0.05}s`, '--card-bg': item.bg }}
            >
              <div className="trending-pet-avatar" style={{ background: item.bg }}>
                <span className="trending-emoji">{item.emoji}</span>
              </div>
              <div className="trending-card-body">
                <div className="trending-card-top">
                  <span className="trending-vibe-badge">{item.vibe}</span>
                  <span className="trending-likes">❤️ {item.likes}</span>
                </div>
                <p className="trending-caption">"{item.caption}"</p>
                <span className="trending-pet-label">{item.pet}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="trending-cta">
          <p className="trending-cta-text">Create your own viral caption →</p>
        </div>
      </div>

      <AdBanner slot="bottom" />
    </div>
  )
}
