import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="wordmark">
        <svg className="paw-icon" width="28" height="28" viewBox="0 0 32 32" fill="none">
          {/* Paw print SVG */}
          <ellipse cx="16" cy="20" rx="8" ry="7" fill="var(--brown)" />
          <ellipse cx="8" cy="15" rx="3.5" ry="4.5" fill="var(--brown)" />
          <ellipse cx="24" cy="15" rx="3.5" ry="4.5" fill="var(--brown)" />
          <ellipse cx="11" cy="9" rx="3" ry="3.8" fill="var(--brown)" />
          <ellipse cx="21" cy="9" rx="3" ry="3.8" fill="var(--brown)" />
          {/* Toe beans */}
          <ellipse cx="12" cy="21" rx="2" ry="2.4" fill="var(--cream)" opacity="0.35" />
          <ellipse cx="16" cy="23" rx="2" ry="2.4" fill="var(--cream)" opacity="0.35" />
          <ellipse cx="20" cy="21" rx="2" ry="2.4" fill="var(--cream)" opacity="0.35" />
        </svg>
        <span className="wordmark-text">PetCaptions</span>
      </div>
    </header>
  )
}
