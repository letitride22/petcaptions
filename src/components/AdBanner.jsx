import './AdBanner.css'

export default function AdBanner({ slot = 'top' }) {
  // Replace with real AdSense code after approval
  // <ins class="adsbygoogle" ...></ins>
  return (
    <div className={`ad-banner ad-banner--${slot}`}>
      <div className="ad-placeholder">
        <span>Advertisement</span>
      </div>
      {/* AdSense code here:
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
    </div>
  )
}
