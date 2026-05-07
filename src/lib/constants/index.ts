// ─── Site Metadata ───
export const SITE_META = {
  title: 'iPhone 12 Pro — A New Era of Pro.',
  description: 'Ceramic Shield. A14 Bionic. Pro camera system. The most powerful iPhone ever.',
  url: 'https://iphone.agency',
};

// ─── Navigation ───
export const NAV_LINKS = [
  { label: 'Overview', href: '#hero' },
  { label: 'Camera', href: '#camera' },
  { label: 'Chip', href: '#chip' },
  { label: 'Design', href: '#design' },
  { label: 'Compare', href: '#lineup' },
];

// ─── Hero Scroll Sections ───
export const HERO_PANELS = [
  {
    id: 'know',
    triggerAt: 0.08,
    exitAt: 0.18,
    side: 'center',
    tag: 'Get to Know iPhone',
    heading: 'A new era\nof Pro.',
    body: 'Say hello to the iPhone 12 Pro. Built for those who demand more — from every angle.',
    cameraRotation: [0, 0, 0] as [number, number, number],
    cameraPosition: [0, 0, 5] as [number, number, number],
  },
  {
    id: 'ios',
    triggerAt: 0.20,
    exitAt: 0.34,
    side: 'right',
    tag: 'iOS & Apple Intelligence',
    heading: 'Intelligence\nthat adapts\nto you.',
    body: 'iOS 18 introduces Apple Intelligence — personal, private, powerful. Writing tools, photo magic, Siri reimagined.',
    cameraRotation: [0, 0.3, 0] as [number, number, number],
    cameraPosition: [1.2, 0, 4.5] as [number, number, number],
  },
  {
    id: 'innovation',
    triggerAt: 0.36,
    exitAt: 0.50,
    side: 'left',
    tag: 'Innovation',
    heading: 'Ceramic Shield.\nFour times\nbetter.',
    body: 'Tougher than any smartphone glass. Built with nano-ceramic crystals, engineered for survival.',
    cameraRotation: [0, Math.PI, 0] as [number, number, number],
    cameraPosition: [-1.2, 0, 4.2] as [number, number, number],
  },
  {
    id: 'environment',
    triggerAt: 0.52,
    exitAt: 0.64,
    side: 'right',
    tag: 'Environment',
    heading: '100% recycled\nrare earth\nelements.',
    body: 'Apple is committed to being carbon neutral across the entire supply chain by 2030.',
    cameraRotation: [0.2, Math.PI + 0.3, 0] as [number, number, number],
    cameraPosition: [1, 0.3, 4.5] as [number, number, number],
  },
  {
    id: 'camera',
    triggerAt: 0.66,
    exitAt: 0.78,
    side: 'left',
    tag: 'Cutting-Edge Camera',
    heading: 'Pro photography.\nIn your pocket.',
    body: 'Triple camera system with LiDAR Scanner. Night mode portraits. ProRAW. Cinema-grade video.',
    cameraRotation: [0.1, Math.PI + 0.5, 0.05] as [number, number, number],
    cameraPosition: [-0.5, 0.5, 3.2] as [number, number, number],
    zoomCamera: true,
  },
  {
    id: 'chip',
    triggerAt: 0.80,
    exitAt: 0.90,
    side: 'right',
    tag: 'Chip & Battery Life',
    heading: 'A14 Bionic.\nThe fastest\nchip ever.',
    body: 'First chip built on a 5-nanometer process. Up to 17 hours video playback. MagSafe charging.',
    cameraRotation: [0, Math.PI * 1.5, 0] as [number, number, number],
    cameraPosition: [1.5, 0, 4] as [number, number, number],
  },
  {
    id: 'privacy',
    triggerAt: 0.91,
    exitAt: 0.96,
    side: 'left',
    tag: 'Privacy',
    heading: 'Privacy is\na human right.',
    body: 'App Tracking Transparency. On-device intelligence. Your data stays yours.',
    cameraRotation: [0, Math.PI * 2, 0] as [number, number, number],
    cameraPosition: [0, 0, 4.8] as [number, number, number],
  },
];

// ─── Closer Look Cards ───
export const CLOSER_CARDS = [
  {
    id: 'ceramic-shield',
    icon: '🛡',
    title: 'Ceramic Shield',
    body: 'Tougher than any smartphone glass, front and back.',
    color: '#1C1C1E',
    accent: '#FF6B2B',
  },
  {
    id: 'magsafe',
    icon: '🧲',
    title: 'MagSafe',
    body: 'A perfectly aligned magnetic connection for accessories and wireless charging.',
    color: '#1C1C1E',
    accent: '#FF6B2B',
  },
  {
    id: 'lidar',
    icon: '📡',
    title: 'LiDAR Scanner',
    body: 'Incredibly fast AR. Night mode portraits. Pro-level depth sensing.',
    color: '#1C1C1E',
    accent: '#FF6B2B',
  },
  {
    id: '5g',
    icon: '📶',
    title: '5G Speed',
    body: 'The fastest 5G in a smartphone. Stream. Download. Dominate.',
    color: '#1C1C1E',
    accent: '#FF6B2B',
  },
  {
    id: 'pro-display',
    icon: '📺',
    title: 'Super Retina XDR',
    body: '2532 x 1170 OLED. HDR. Dolby Vision. True Tone.',
    color: '#1C1C1E',
    accent: '#FF6B2B',
  },
  {
    id: 'ss-design',
    icon: '✨',
    title: 'Surgical-Grade Steel',
    body: 'A flat-edge design with surgical-grade stainless steel band.',
    color: '#1C1C1E',
    accent: '#FF6B2B',
  },
];

// ─── Lineup ───
export const LINEUP_ITEMS = [
  {
    model: 'iPhone 12',
    tagline: 'Blast past fast.',
    price: 'From $699',
    colors: ['#1C1C1E', '#FFFFFF', '#FF3B30', '#007AFF', '#34C759'],
    size: '6.1"',
    chip: 'A14 Bionic',
    camera: 'Dual 12MP',
  },
  {
    model: 'iPhone 12 mini',
    tagline: 'Small. But mighty.',
    price: 'From $599',
    colors: ['#1C1C1E', '#FFFFFF', '#FF3B30', '#007AFF', '#34C759'],
    size: '5.4"',
    chip: 'A14 Bionic',
    camera: 'Dual 12MP',
  },
  {
    model: 'iPhone 12 Pro',
    tagline: 'It\'s a whole new ballgame.',
    price: 'From $999',
    colors: ['#1C1C1E', '#C0C0C0', '#1D3557', '#FF6B2B'],
    size: '6.1"',
    chip: 'A14 Bionic',
    camera: 'Triple 12MP + LiDAR',
    isHighlighted: true,
  },
  {
    model: 'iPhone 12 Pro Max',
    tagline: 'The biggest, best iPhone camera ever.',
    price: 'From $1,099',
    colors: ['#1C1C1E', '#C0C0C0', '#1D3557', '#FF6B2B'],
    size: '6.7"',
    chip: 'A14 Bionic',
    camera: 'Triple 12MP + LiDAR',
  },
];

// ─── Why Apple Sections ───
export const WHY_APPLE_STEPS = [
  {
    step: '01',
    title: 'Apple Trade In',
    heading: 'Get credit\nfor your old\ndevice.',
    body: 'Trade in your eligible device for credit toward your next iPhone. It\'s good for you and the planet.',
    cta: 'See what your device is worth →',
    icon: '♻️',
  },
  {
    step: '02',
    title: 'Ways to Buy',
    heading: 'Your way\nto get\niPhone.',
    body: 'Buy online, pick up in store, or have it delivered. Carrier deals. Apple Card Monthly Installments.',
    cta: 'Explore buying options →',
    icon: '🛒',
  },
  {
    step: '03',
    title: 'Personal Setup',
    heading: 'We\'ll help\nyou get\nstarted.',
    body: 'A Specialist will help you set up your new iPhone, migrate your data, and learn what\'s new.',
    cta: 'Schedule your session →',
    icon: '🎯',
  },
  {
    step: '04',
    title: 'Delivery & Pickup',
    heading: 'Fast, free\ndelivery to\nyour door.',
    body: 'Free delivery in 1 business day. Order by 5pm for same-day collection at an Apple Store near you.',
    cta: 'Check delivery times →',
    icon: '📦',
  },
  {
    step: '05',
    title: 'Guided Shopping',
    heading: 'Not sure\nwhere to\nstart?',
    body: 'Answer a few questions and we\'ll help you find the right iPhone, plan, and accessories.',
    cta: 'Get a recommendation →',
    icon: '💬',
  },
];

// ─── Camera Specs ───
export const CAMERA_SPECS = [
  { label: 'Main', aperture: 'ƒ/1.6', zoom: '2x optical zoom in', mp: '12MP' },
  { label: 'Ultra Wide', aperture: 'ƒ/2.4', zoom: '0.5x', mp: '12MP' },
  { label: 'Telephoto', aperture: 'ƒ/2.0', zoom: '4x optical zoom range', mp: '12MP' },
];

// ─── Battery Stats ───
export const BATTERY_STATS = [
  { label: 'Video Playback', hours: 17, icon: '▶️' },
  { label: 'Audio Playback', hours: 65, icon: '🎵' },
  { label: 'Video Streaming', hours: 11, icon: '📡' },
];

// ─── iPhone Colors ───
export const IPHONE_COLORS = {
  cosmicOrange: '#FF6B2B',
  pacificBlue: '#1B4F72',
  silver: '#C8C8C8',
  graphite: '#3A3A3C',
};

// ─── Scroll Config ───
export const SCROLL_CONFIG = {
  heroHeight: '600vh',
  lerp: 0.08,
  damping: 0.1,
};
