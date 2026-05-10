/* ============================================================
   projects.js — Project modal logic + media gallery

   HOW TO ADD MEDIA TO A PROJECT:
   ─────────────────────────────────────────────────────────────
   In the PROJECT_DATA array below, find the project by its id.
   Then populate the `media` array with objects like:

   Screenshots:
     { type: 'image', src: 'assets/images/campus-safety-1.png', alt: 'Home screen' }

   Local video:
     { type: 'video', src: 'assets/videos/campus-safety-demo.mp4' }

   YouTube embed:
     { type: 'youtube', videoId: 'dQw4w9WgXcQ' }

   Leave `media: []` to keep the placeholder shown until you're ready.
   ─────────────────────────────────────────────────────────────
   ============================================================ */

const PROJECT_DATA = [
  {
    id: 'campus-safety',
    stage: 'STAGE 01',
    title: 'LU CAMPUS SAFETY APP',
    description: `Production ride-catching platform adopted by Lawrence University.
Supports real-time ride requests, facility access, and safety assistance
for students, faculty, and officers. Features live location sharing,
geocoding, and routing via Google Maps APIs.
Live on both the App Store and Google Play.`,
    tech: ['REACT NATIVE', 'SPRING BOOT', 'AWS', 'MYSQL', 'DOCKER', 'GITHUB ACTIONS', 'GOOGLE MAPS API', 'EC2', 'RDS', 'ALB', 'LAMBDA'],
    links: [
      { label: '▶ GITHUB', url: 'https://github.com/M1nJun' },
      // { label: '▶ APP STORE', url: 'https://apps.apple.com/...' },
      // { label: '▶ GOOGLE PLAY', url: 'https://play.google.com/...' },
    ],
    media: [
      // ADD SCREENSHOTS / VIDEOS HERE
      // Example: { type: 'image', src: 'assets/images/campus-1.png', alt: 'Home screen' }
    ]
  },
  {
    id: 'ai-coach',
    stage: 'STAGE 02',
    title: 'AI FITNESS COACH',
    description: `HackHarvard 2023 — a personalized AI coach generating customized
workout plans from fitness goals, sleep patterns, and caloric data
pulled from wearable devices via Terra API.
Built in 24 hours by a team of four.`,
    tech: ['IONIC REACT', 'FLASK', 'LANGCHAIN', 'OPENAI API', 'TERRA API', 'PYTHON'],
    links: [
      { label: '▶ GITHUB', url: 'https://github.com/M1nJun' },
    ],
    media: []
  },
  {
    id: 'mock-malloc',
    stage: 'STAGE 03',
    title: 'MOCK MALLOC',
    description: `Custom re-implementation of C's malloc() from scratch.
Enables dynamic heap memory allocation with full control over
block sizing, splitting, and coalescing — no standard library.`,
    tech: ['C', 'SYSTEMS PROGRAMMING', 'MEMORY MANAGEMENT'],
    links: [
      { label: '▶ GITHUB', url: 'https://github.com/M1nJun' },
    ],
    media: []
  },
  {
    id: 'autocomplete',
    stage: 'STAGE 04',
    title: 'WORD AUTOCOMPLETE',
    description: `Text prediction pipeline built on an LSTM neural network.
Includes custom data preprocessing, numerical encoding,
and training on a large corpus to predict the next word in a sequence.`,
    tech: ['PYTHON', 'TENSORFLOW / KERAS', 'NUMPY', 'LSTM'],
    links: [
      { label: '▶ GITHUB', url: 'https://github.com/M1nJun' },
    ],
    media: []
  },
  {
    id: 'stable-surfaces',
    stage: 'STAGE 05',
    title: 'STABLE SURFACES RESEARCH',
    description: `CS/Math research at Lawrence University.
Designed a computation program generating new examples of
stable surfaces using graph theory and combinatorics.`,
    tech: ['C++', 'PYTHON', 'GRAPH THEORY', 'COMBINATORICS'],
    links: [
      { label: '▶ GITHUB', url: 'https://github.com/M1nJun' },
    ],
    media: []
  }
];

/* ── MODAL STATE ── */
let currentMediaIndex = 0;
let currentMedia      = [];

/* ── OPEN MODAL ── */
function openModal(projectId) {
  const data = PROJECT_DATA.find(p => p.id === projectId);
  if (!data) return;

  currentMedia      = data.media || [];
  currentMediaIndex = 0;

  const overlay = document.getElementById('project-modal');
  overlay.querySelector('.modal-stage').textContent  = data.stage;
  overlay.querySelector('.modal-title').textContent  = data.title;
  overlay.querySelector('.modal-desc').textContent   = data.description;

  // Tech tags
  const tagsEl = overlay.querySelector('.modal-tech .tech-tags');
  tagsEl.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

  // Links
  const linksEl = overlay.querySelector('.modal-links');
  linksEl.innerHTML = data.links.map(l =>
    `<a href="${l.url}" target="_blank" rel="noopener" class="project-link">${l.label}</a>`
  ).join('');

  // Media gallery
  renderGallery(overlay);

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ── CLOSE MODAL ── */
function closeModal() {
  const overlay = document.getElementById('project-modal');
  overlay.classList.remove('open');
  document.body.style.overflow = '';

  // Stop any playing video/youtube
  const iframes = overlay.querySelectorAll('iframe');
  iframes.forEach(f => { f.src = f.src; }); // reset by reassigning src
}

/* ── RENDER GALLERY ── */
function renderGallery(overlay) {
  const gallery = overlay.querySelector('.media-gallery');
  // Clear previous media (keep placeholder)
  gallery.querySelectorAll('.media-item').forEach(el => el.remove());

  const placeholder  = gallery.querySelector('.media-placeholder');
  const navPrev      = gallery.querySelector('.gallery-nav.prev');
  const navNext      = gallery.querySelector('.gallery-nav.next');
  const dotsContainer = gallery.querySelector('.gallery-dots');
  const counter      = gallery.querySelector('.gallery-counter');

  if (!currentMedia.length) {
    // No media yet — show placeholder
    placeholder.style.display  = 'flex';
    navPrev.style.display      = 'none';
    navNext.style.display      = 'none';
    dotsContainer.innerHTML    = '';
    counter.style.display      = 'none';
    return;
  }

  placeholder.style.display = 'none';
  counter.style.display     = 'block';

  // Build media elements
  currentMedia.forEach((item, i) => {
    let el;
    if (item.type === 'image') {
      el = document.createElement('img');
      el.src = item.src;
      el.alt = item.alt || '';
    } else if (item.type === 'video') {
      el = document.createElement('video');
      el.src = item.src;
      el.controls = true;
    } else if (item.type === 'youtube') {
      el = document.createElement('iframe');
      el.src = `https://www.youtube.com/embed/${item.videoId}`;
      el.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      el.allowFullscreen = true;
    }
    el.classList.add('media-item');
    if (i === 0) el.classList.add('active');
    gallery.appendChild(el);
  });

  // Navigation
  const showNav = currentMedia.length > 1;
  navPrev.style.display = showNav ? 'flex' : 'none';
  navNext.style.display = showNav ? 'flex' : 'none';

  // Dots
  dotsContainer.innerHTML = currentMedia.map((_, i) =>
    `<div class="gallery-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>`
  ).join('');
  dotsContainer.querySelectorAll('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', () => goToMedia(parseInt(dot.dataset.idx)));
  });

  updateCounter();
}

/* ── NAVIGATE GALLERY ── */
function goToMedia(idx) {
  const overlay = document.getElementById('project-modal');
  const items   = overlay.querySelectorAll('.media-item');
  const dots    = overlay.querySelectorAll('.gallery-dot');

  // Pause any video before switching
  items[currentMediaIndex]?.pause?.();

  items[currentMediaIndex]?.classList.remove('active');
  dots[currentMediaIndex]?.classList.remove('active');

  currentMediaIndex = (idx + currentMedia.length) % currentMedia.length;

  items[currentMediaIndex]?.classList.add('active');
  dots[currentMediaIndex]?.classList.add('active');
  updateCounter();
}

function updateCounter() {
  const counter = document.querySelector('#project-modal .gallery-counter');
  if (counter) counter.textContent = `${currentMediaIndex + 1} / ${currentMedia.length}`;
}

/* ── WIRE UP CARDS ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card[data-id]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });

  // Close button
  document.querySelector('#project-modal .modal-close')
    ?.addEventListener('click', closeModal);

  // Click outside modal to close
  document.getElementById('project-modal')
    ?.addEventListener('click', e => {
      if (e.target === e.currentTarget) closeModal();
    });

  // ESC to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Gallery arrows
  document.querySelector('#project-modal .gallery-nav.prev')
    ?.addEventListener('click', e => { e.stopPropagation(); goToMedia(currentMediaIndex - 1); });
  document.querySelector('#project-modal .gallery-nav.next')
    ?.addEventListener('click', e => { e.stopPropagation(); goToMedia(currentMediaIndex + 1); });
});
