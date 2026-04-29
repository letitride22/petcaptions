# 🐾 PetCaptions

AI-powered funny captions for pet photos. Upload → Choose vibe → Download captioned image.

**Live:** petcaptions.com  
**Stack:** React + Vite PWA + Claude Vision API

---

## Features

- 📸 Upload any pet photo
- 🎭 6 vibes: Sassy, Dramatic, Judgy, Unhinged, Sweet, Suspicious
- 🤖 Claude Vision AI writes a custom caption
- 🖼️ Caption overlaid on image with watermark
- ⬇️ Download-ready JPEG
- 💾 Local gallery (50 captions max)
- 📱 PWA — "Add to Home Screen" on iOS/Android
- 💰 Google AdSense integrated (slots ready)

---

## Setup

### 1. Install

```bash
npm install
```

### 2. Add Anthropic API Key

Go to `src/utils/captionApi.js` and the API key is passed in via the Anthropic header.

**For Vercel deployment**, add an environment variable:

In `src/utils/captionApi.js`, update the fetch call to use an env var via a Vite proxy or serverless function for production (see Security note below).

### 3. Run locally

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

---

## Deploy to Vercel

1. Push to GitHub repo (e.g. `github.com/yourname/petcaptions`)

2. Go to [vercel.com](https://vercel.com) → New Project → Import repo

3. Settings:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Add Environment Variable:
   - `VITE_ANTHROPIC_KEY` = your Claude API key

5. Update `src/utils/captionApi.js` to use:
   ```js
   'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY
   ```

6. Click **Deploy** → Done!

7. **Add custom domain:** Vercel → Project → Settings → Domains → Add `petcaptions.com`

---

## ⚠️ Security Note for Production

The current implementation calls the Anthropic API directly from the browser (using `anthropic-dangerous-direct-browser-access`). This is fine for MVP/testing but **exposes your API key**.

For production with real revenue:
1. Create a Vercel Serverless Function at `api/caption.js`
2. Store `ANTHROPIC_API_KEY` as a Vercel secret (not VITE_ prefixed)
3. Call your own `/api/caption` endpoint from the frontend

See `api/caption.example.js` for reference implementation.

---

## Google AdSense

1. Sign up at [google.com/adsense](https://google.com/adsense)
2. Add `petcaptions.com` as a site
3. Get your Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
4. In `index.html`, uncomment the AdSense script and add your publisher ID
5. In `src/components/AdBanner.jsx`, uncomment the `<ins>` tags and add your ad slot IDs

---

## PWA Icons

Place these files in `/public`:
- `paw-icon-192.png` — 192×192 paw print icon
- `paw-icon-512.png` — 512×512 paw print icon  
- `apple-touch-icon.png` — 180×180 for iOS home screen
- `favicon.ico` — 32×32

Use the brand color `#5A3218` background with a cream `#FFF8F3` paw print.

---

## File Structure

```
petcaptions/
├── public/
│   ├── favicon.ico
│   ├── paw-icon-192.png
│   ├── paw-icon-512.png
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx / .css
│   │   ├── Header.jsx / .css
│   │   └── AdBanner.jsx / .css
│   ├── pages/
│   │   ├── CaptionPage.jsx / .css
│   │   ├── GalleryPage.jsx / .css
│   │   └── TrendingPage.jsx / .css
│   ├── utils/
│   │   └── captionApi.js
│   ├── App.jsx / .css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```
