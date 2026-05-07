# iPhone 12 Pro — Awwwards-Level Showcase Website

A scroll-driven, Awwwards-winning-quality iPhone 12 Pro showcase built with **Next.js 14**, **Three.js / R3F**, **GSAP**, **Framer Motion**, and **Lenis** smooth scroll.

---

## 🗂 Project Structure

```
iphone-12-pro-showcase/
├── public/
│   ├── models/
│   │   └── IP12PRO1.glb          ← Your 3D iPhone model
│   └── textures/
│       ├── CameraLens.png
│       ├── FlashTexture.jpg
│       ├── Lens.png
│       ├── Wallpaper.png
│       └── speaker.jpg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← Root layout + metadata
│   │   └── page.tsx               ← Main page, composes all sections
│   │
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── Scene.tsx          ← R3F Canvas wrapper + post-processing
│   │   │   ├── IPhoneModel.tsx    ← Scroll-driven 3D iPhone animation
│   │   │   └── ParticleCanvas.tsx ← iyo.ai-style particle canvas
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        ← Scroll-driven 3D hero (600vh)
│   │   │   ├── CloserLookSection.tsx  ← Feature cards grid
│   │   │   ├── LineupSection.tsx      ← Horizontal scroll lineup
│   │   │   ├── WhyAppleSection.tsx    ← Fourmula.ai-style step cards
│   │   │   ├── BatterySection.tsx     ← Battery bars + particle chip
│   │   │   ├── PrivacySection.tsx     ← Privacy + Peace of Mind
│   │   │   └── EssentialsSection.tsx  ← Accessories + Significant Others
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         ← Apple-style glassmorphism nav
│   │   │   └── Footer.tsx         ← Full Apple-style footer
│   │   │
│   │   └── ui/
│   │       ├── ProgressBar.tsx    ← Scroll progress bar
│   │       ├── AnimatedHeading.tsx← Word/char split animation
│   │       ├── GlowButton.tsx     ← Animated CTA button
│   │       └── SectionDivider.tsx ← Orange gradient divider
│   │
│   ├── lib/
│   │   ├── constants/
│   │   │   └── index.ts           ← All site content & config
│   │   ├── hooks/
│   │   │   ├── useScrollProgress.ts ← Scroll progress hooks
│   │   │   └── useLenis.ts          ← Lenis smooth scroll
│   │   └── utils/
│   │       └── index.ts           ← lerp, mapRange, easing, etc.
│   │
│   └── styles/
│       └── globals.css            ← Tailwind + custom CSS vars
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚡ Quick Start

### 1. Prerequisites
Make sure you have these installed:
```bash
node --version   # Need v18+
npm --version    # Need v9+
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Build for Production

```bash
# Type-check + build
npm run build

# Start production server
npm start
```

---

## 🎨 Customization

### Change iPhone Color (Cosmic Orange → Other)
In `src/components/3d/IPhoneModel.tsx`, find the `useEffect` that traverses materials and adjust the color override.

### Add / Remove Hero Panels
In `src/lib/constants/index.ts`, edit the `HERO_PANELS` array. Each panel has:
- `triggerAt` / `exitAt` — scroll % when it appears/disappears (0–1)
- `side` — `'left'` | `'right'` | `'center'`
- `cameraRotation` / `cameraPosition` — where the 3D camera moves

### Swap 3D Model
Replace `public/models/IP12PRO1.glb` with any other `.glb` file, then update the import path in `IPhoneModel.tsx`.

### Adjust Scroll Speed / Easing
In `src/lib/hooks/useLenis.ts`:
```ts
duration: 1.4,        // increase = slower scroll
wheelMultiplier: 1,   // increase = faster scroll
```

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| Next.js 14 | Framework + App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Three.js + R3F | 3D rendering |
| @react-three/drei | 3D helpers (Float, Environment, etc.) |
| @react-three/postprocessing | Bloom + Chromatic Aberration |
| Framer Motion | UI animations + scroll transforms |
| GSAP | Advanced scroll-driven timelines |
| Lenis | Smooth scroll |
| Zustand | (ready to use) global state |

---

## 📦 Troubleshooting

**`Module not found: Can't resolve 'three'`**
```bash
npm install three @types/three
```

**GLB model shows pink / missing textures**
- Make sure `public/models/IP12PRO1.glb` exists
- Run `npm run dev` from the project root (not `src/`)

**Blank white screen**
- Check browser console for errors
- Make sure Node v18+ is installed: `node --version`

**Slow animation on mobile**
- The `AdaptiveDpr` component automatically reduces pixel ratio on low-end devices
- You can also set `dpr={[1, 1.5]}` in `Scene.tsx`

---

## 🚀 Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or simply connect your GitHub repo at [vercel.com](https://vercel.com) — it auto-detects Next.js.

---

## 📄 License
Built for a 3D web agency client presentation. Model by datsketch1@gmail.com.
