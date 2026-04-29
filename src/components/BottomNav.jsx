import './BottomNav.css'

const tabs = [
  {
    id: 'caption',
    label: 'Caption',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 5.58 2 10c0 2.4 1.18 4.56 3.08 6.1L4 20l4.28-1.43C9.38 18.84 10.66 19 12 19c5.52 0 10-3.58 10-8s-4.48-9-10-9z"
          fill={active ? 'var(--brown)' : 'none'}
          stroke={active ? 'var(--brown)' : 'var(--text-muted)'}
          strokeWidth="1.8"
        />
        <circle cx="8.5" cy="10" r="1.2" fill={active ? 'var(--cream)' : 'var(--text-muted)'} />
        <circle cx="12" cy="10" r="1.2" fill={active ? 'var(--cream)' : 'var(--text-muted)'} />
        <circle cx="15.5" cy="10" r="1.2" fill={active ? 'var(--cream)' : 'var(--text-muted)'} />
      </svg>
    )
  },
  {
    id: 'gallery',
    label: 'Gallery',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5"
          fill={active ? 'var(--brown)' : 'none'}
          stroke={active ? 'var(--brown)' : 'var(--text-muted)'}
          strokeWidth="1.8"
        />
        <rect x="14" y="3" width="7" height="7" rx="1.5"
          fill={active ? 'var(--brown)' : 'none'}
          stroke={active ? 'var(--brown)' : 'var(--text-muted)'}
          strokeWidth="1.8"
        />
        <rect x="3" y="14" width="7" height="7" rx="1.5"
          fill={active ? 'var(--brown)' : 'none'}
          stroke={active ? 'var(--brown)' : 'var(--text-muted)'}
          strokeWidth="1.8"
        />
        <rect x="14" y="14" width="7" height="7" rx="1.5"
          fill={active ? 'var(--brown)' : 'none'}
          stroke={active ? 'var(--brown)' : 'var(--text-muted)'}
          strokeWidth="1.8"
        />
      </svg>
    )
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l5-5 4 4 5-6 4 3"
          stroke={active ? 'var(--brown)' : 'var(--text-muted)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M17 8h4v4"
          stroke={active ? 'var(--brown)' : 'var(--text-muted)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
]

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="nav-icon">{tab.icon(activeTab === tab.id)}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
