/* ══ SPLASH SCREEN ══ */
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 600);
    }, 2500);
  }
});

/* ══ SUPABASE CLIENT ══ */
const SUPABASE_URL  = 'https://cpvwnqehlhkzvybiztxu.supabase.co';
const SUPABASE_ANON = 'sb_publishable_Y4pWyU9zeaKWW5xC2AEuFQ_kOkcY9mz';
const _supabase = (typeof supabase !== 'undefined')
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

/* ══ MENU DATA ══ */
const menuData = {
  coffee: [
    { id:1,  icon:'☕', img:'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80', name:'Эспрессо',    desc:'Насыщенный и концентрированный. Основа всего.',              priceNum:12000, price:'12 000 сум' },
    { id:2,  icon:'☕', img:'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80', name:'Американо',   desc:'Эспрессо с горячей водой — мягкий и ароматный.',            priceNum:14000, price:'14 000 сум' },
    { id:3,  icon:'☕', img:'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80', name:'Капучино',    desc:'Эспрессо, молоко и воздушная пенка.',                       priceNum:18000, price:'18 000 сум' },
    { id:4,  icon:'☕', img:'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80', name:'Латте',       desc:'Нежный кофе с большим количеством молока.',                 priceNum:20000, price:'20 000 сум' },
    { id:5,  icon:'☕', img:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80', name:'Раф',         desc:'Сливочный кофе на основе сливок — наш фаворит.',            priceNum:22000, price:'22 000 сум' },
    { id:6,  icon:'☕', img:'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&q=80', name:'Флэт Уайт',  desc:'Двойной эспрессо с микропеной — насыщенный.',               priceNum:20000, price:'20 000 сум' },
  ],
  raf: [
    { id:21, icon:'☕', img:'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80', name:'Раф Ваниль',  desc:'Нежный раф с ванильным сиропом.',                           priceNum:24000, price:'24 000 сум' },
    { id:22, icon:'☕', img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', name:'Мокко',       desc:'Кофе с шоколадом — сладкий и насыщенный.',                  priceNum:22000, price:'22 000 сум' },
    { id:23, icon:'☕', img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', name:'Раф Карамель', desc:'Раф с карамельным сиропом и сливками.',                     priceNum:25000, price:'25 000 сум' },
  ],
  cold: [
    { id:7,  icon:'🧊', img:'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=400&q=80', name:'Айс Латте',   desc:'Классический латте со льдом — освежающий.',                 priceNum:22000, price:'22 000 сум' },
    { id:8,  icon:'🧊', img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', name:'Холодный Брю',desc:'Кофе холодного заваривания — мягкий без горечи.',           priceNum:24000, price:'24 000 сум' },
    { id:9,  icon:'🧊', img:'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&q=80', name:'Фраппе',      desc:'Взбитый ледяной кофе с молоком.',                           priceNum:24000, price:'24 000 сум' },
    { id:10, icon:'🍵', img:'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80', name:'Матча Латте', desc:'Японский зелёный матча с молоком.',                          priceNum:26000, price:'26 000 сум' },
  ],
  dessert: [
    { id:15, icon:'🍰', img:'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=400&q=80', name:'Чизкейк',  desc:'Нежный классический чизкейк Нью-Йорк.',                      priceNum:25000, price:'25 000 сум' },
    { id:16, icon:'🍫', img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80', name:'Брауни',   desc:'Шоколадный брауни — плотный с карамелью.',                   priceNum:18000, price:'18 000 сум' },
    { id:17, icon:'🥐', img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', name:'Круассан', desc:'Хрустящий, слоёный со сливочным маслом.',                    priceNum:16000, price:'16 000 сум' },
    { id:18, icon:'🍩', img:'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80', name:'Маффин',   desc:'Пышный маффин — черничный или шоколадный.',                  priceNum:14000, price:'14 000 сум' },
  ]
};

const allItems = Object.values(menuData).flat();
let cart = {};
let currentCat = 'coffee';

/* ══ 1. SCROLL REVEAL ══ */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

/* ══ 2. HEADER SCROLL EFFECT ══ */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ══ 3. MOBILE NAV ══ */
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');
let navOpen = false;
if (burger) {
  burger.addEventListener('click', () => {
    navOpen = !navOpen;
    mobileNav.classList.toggle('open', navOpen);
    const s = burger.querySelectorAll('span');
    if (navOpen) {
      s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s.forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
    }
  });
}
function closeMobileNav() {
  navOpen = false;
  if (mobileNav) mobileNav.classList.remove('open');
  if (burger) burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

/* ══ 4. ABOUT VIDEO — autoplay on scroll ══ */
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('aboutVideo');
  if (!video) return;
  video.addEventListener('canplay', () => video.play().catch(() => {}));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { video.play().catch(() => {}); }
      else { video.pause(); }
    });
  }, { threshold: 0 });
  obs.observe(video);
});

/* ══ 5. GALLERY LIGHTBOX ══ */
function openLightbox(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeOrderModal();
  }
});

/* ══ 6. COUNTERS ANIMATION ══ */
function animateCounters() {
  const counters = document.querySelectorAll('.count-num');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500;
      const start = performance.now();
      const startVal = 0;
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(startVal + (target - startVal) * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

/* ══ 7. SPECIALS SLIDER ══ */
const staticSpecials = [
  {
    img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
    label: 'Акция дня',
    title: 'Кофе + Десерт',
    desc: 'Закажи любой кофе и получи десерт в подарок при заказе до 22:00.'
  },
  {
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80',
    label: 'Только утром',
    title: 'Утренний раф',
    desc: 'Скидка 20% на все рафы с 8:00 до 10:00 каждый будний день.'
  },
  {
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    label: 'Выходные',
    title: 'Happy Weekend',
    desc: 'По субботам и воскресеньям — второй капучино за полцены.'
  },
  {
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
    label: 'Для компаний',
    title: 'Стол на 4+',
    desc: 'При бронировании стола на 4 и более — комплиментарные круассаны.'
  },
];

let specialsIndex = 0;
let specialsData  = [];

async function loadSpecials() {
  try {
    const res = await fetch('/api/promotions');
    if (!res.ok) throw new Error();
    const promos = await res.json();
    if (promos && promos.length) {
      specialsData = promos;
    } else {
      specialsData = staticSpecials;
    }
  } catch {
    specialsData = staticSpecials;
  }
  renderSpecials();
}

function renderSpecials() {
  const track = document.getElementById('specialsTrack');
  const dots  = document.getElementById('specialsDots');
  if (!track) return;

  track.innerHTML = specialsData.map(p => `
    <div class="special-card">
      <img src="${p.img || p.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'}" alt="${p.title || p.name || ''}"/>
      <div class="special-card-body">
        <span class="special-label">${p.label || p.promo_label || 'Акция'}</span>
        <h3>${p.title || p.name || ''}</h3>
        <p>${p.desc || p.description || ''}</p>
      </div>
    </div>
  `).join('');

  if (dots) {
    dots.innerHTML = specialsData.map((_, i) =>
      `<div class="slider-dot ${i === 0 ? 'active' : ''}" onclick="goSpecials(${i})"></div>`
    ).join('');
  }
}

function goSpecials(index) {
  specialsIndex = Math.max(0, Math.min(index, specialsData.length - 1));
  const track = document.getElementById('specialsTrack');
  if (!track) return;
  const cardW = 300 + 19.2; // card width + gap
  track.style.transform = `translateX(-${specialsIndex * cardW}px)`;
  document.querySelectorAll('#specialsDots .slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === specialsIndex);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('specialsPrev');
  const nextBtn = document.getElementById('specialsNext');
  if (prevBtn) prevBtn.addEventListener('click', () => goSpecials(specialsIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goSpecials(specialsIndex + 1));
});

/* ══ 8. REVIEWS SLIDER ══ */
const staticReviews = [
  { customer_name: 'Алишер М.', text: 'Лучший раф в городе. Доставка пришла за 25 минут — кофе горячий и идеальный. Теперь заказываю каждое утро!', rating: 5, created_at: '2 дня назад' },
  { customer_name: 'Нилуфар Т.', text: 'Очень удобно заказывать через сайт. Никаких очередей — выбрал, оплатил, жди. Капучино просто восхитительный.', rating: 5, created_at: '5 дней назад' },
  { customer_name: 'Санжар К.',  text: 'Стабильное качество каждый день. Бариста знают своё дело — вкус всегда одинаково хороший. Рекомендую всем!', rating: 5, created_at: '1 неделю назад' },
  { customer_name: 'Дилноза Р.', text: 'Матча латте — просто огонь. Атмосфера уютная, персонал приветливый. Приходим сюда каждые выходные.', rating: 5, created_at: '2 недели назад' },
  { customer_name: 'Бахром А.',  text: 'Брониронал столик онлайн — всё прошло гладко. Встретили по первому классу. Холодный брю рекомендую всем!', rating: 5, created_at: '3 недели назад' },
];

let reviewsIndex = 0;
let reviewsData  = [];

async function loadReviews() {
  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error();
    const reviews = await res.json();
    reviewsData = Array.isArray(reviews) && reviews.length ? reviews : staticReviews;
  } catch {
    reviewsData = staticReviews;
  }
  renderReviews();
}

function renderReviews() {
  const track = document.getElementById('reviewsTrack');
  const dots  = document.getElementById('reviewsDots');
  if (!track) return;

  track.innerHTML = reviewsData.map(r => {
    const stars = '★'.repeat(Math.min(5, r.rating || 5));
    const initial = (r.customer_name || r.name || '?')[0].toUpperCase();
    const dateStr = r.created_at
      ? (r.created_at.includes('ago') || r.created_at.includes('назад') ? r.created_at : new Date(r.created_at).toLocaleDateString('ru-RU'))
      : '';
    return `
      <div class="review-card">
        <div class="review-stars">${stars}</div>
        <p class="review-text">«${r.text || r.comment || ''}»</p>
        <div class="review-author">
          <div class="review-avatar">${initial}</div>
          <div>
            <div class="review-name">${r.customer_name || r.name || 'Гость'}</div>
            <div class="review-date">${dateStr}</div>
          </div>
        </div>
      </div>`;
  }).join('');

  if (dots) {
    dots.innerHTML = reviewsData.map((_, i) =>
      `<div class="slider-dot ${i === 0 ? 'active' : ''}" onclick="goReviews(${i})"></div>`
    ).join('');
  }
}

function goReviews(index) {
  reviewsIndex = Math.max(0, Math.min(index, reviewsData.length - 1));
  const track = document.getElementById('reviewsTrack');
  if (!track) return;
  const cardW = 320 + 19.2;
  track.style.transform = `translateX(-${reviewsIndex * cardW}px)`;
  document.querySelectorAll('#reviewsDots .slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === reviewsIndex);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  if (prevBtn) prevBtn.addEventListener('click', () => goReviews(reviewsIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goReviews(reviewsIndex + 1));
});

/* ══ 9. RATING STARS ══ */
let reviewRating = 5;

function initRatingStars() {
  const wrap = document.getElementById('ratingStars');
  if (!wrap) return;
  const stars = [...wrap.querySelectorAll('span')];
  const paint = n => stars.forEach(s => s.classList.toggle('on', +s.dataset.v <= n));
  stars.forEach(s => {
    s.addEventListener('mouseenter', () => paint(+s.dataset.v));
    s.addEventListener('click', () => { reviewRating = +s.dataset.v; paint(reviewRating); });
  });
  wrap.addEventListener('mouseleave', () => paint(reviewRating));
  paint(reviewRating);
}

/* ══ 10. SUBMIT REVIEW ══ */
async function submitReview() {
  const name = document.getElementById('revName').value.trim();
  const text = document.getElementById('revText').value.trim();
  if (!name) { document.getElementById('revName').focus(); alert('Введите имя'); return; }
  if (!text) { document.getElementById('revText').focus(); alert('Напишите отзыв'); return; }
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_name: name, text, rating: reviewRating })
    });
    if (!res.ok) throw new Error();
    document.getElementById('revSuccess').style.display = 'block';
    document.getElementById('revName').value = '';
    document.getElementById('revText').value = '';
    reviewRating = 5;
    initRatingStars();
    setTimeout(() => { document.getElementById('revSuccess').style.display = 'none'; }, 4500);
  } catch {
    alert('Не удалось отправить отзыв. Пожалуйста, попробуйте позже.');
  }
}

/* ══ 11. BOOKING FORM ══ */
async function submitBooking() {
  const name    = document.getElementById('bookName')?.value.trim();
  const phone   = document.getElementById('bookPhone')?.value.trim();
  const date    = document.getElementById('bookDate')?.value;
  const time    = document.getElementById('bookTime')?.value;
  const guests  = document.getElementById('bookGuests')?.value;
  const comment = document.getElementById('bookComment')?.value.trim();

  if (!name)  { document.getElementById('bookName')?.focus(); alert('Введите имя'); return; }
  if (!phone) { document.getElementById('bookPhone')?.focus(); alert('Введите телефон'); return; }
  if (!date)  { document.getElementById('bookDate')?.focus(); alert('Выберите дату'); return; }
  if (!time)  { document.getElementById('bookTime')?.focus(); alert('Выберите время'); return; }

  try {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, date, time, guests, comment, type: 'booking' })
    });
  } catch (_) {}

  // Show success animation
  const successEl = document.getElementById('bookingSuccess');
  if (successEl) successEl.classList.add('show');

  // Clear form
  ['bookName','bookPhone','bookDate','bookTime','bookComment'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const guestEl = document.getElementById('bookGuests');
  if (guestEl) guestEl.value = '2';
}

/* ══ 12. YANDEX MAP ══ */
function initMap() {
  if (typeof ymaps === 'undefined') return;
  ymaps.ready(() => {
    const mapEl = document.getElementById('ymap');
    if (!mapEl) return;
    const map = new ymaps.Map('ymap', {
      center: [41.299496, 69.240073],
      zoom: 16,
      controls: ['zoomControl']
    });
    const placemark = new ymaps.Placemark(
      [41.299496, 69.240073],
      { balloonContent: 'T7 Coffee — ул. Амира Темура, 107' },
      { preset: 'islands#greenDotIconWithCaption', iconCaption: 'T7 Coffee' }
    );
    map.geoObjects.add(placemark);
  });
}

/* ══ 13. PAGE MENU (section) ══ */
function renderPageMenu(cat) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  const items = menuData[cat] || [];
  grid.innerHTML = items.map(item => {
    const ratingVal = (4.3 + (item.id % 7) * 0.1).toFixed(1);
    const reviewsCount = 20 + (item.id * 13) % 200;
    return `
    <div class="menu-card" onclick="openOrderModal();setTimeout(()=>{addToCart(${item.id})},400)">
      <div style="overflow:hidden">
        <img class="menu-card-img" src="${item.img}" alt="${item.name}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <div style="display:none;width:100%;aspect-ratio:4/3;background:var(--s2);align-items:center;justify-content:center;font-size:2.5rem">${item.icon}</div>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-rating">⭐ ${ratingVal} <span class="reviews-count">(${reviewsCount})</span></div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <div class="menu-card-price">${item.price}</div>
          <button class="menu-card-add" onclick="event.stopPropagation();openOrderModal();setTimeout(()=>{addToCart(${item.id})},400)">+</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ══ 14. MENU TABS ══ */
function initMenuTabs() {
  document.querySelectorAll('.menu-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPageMenu(btn.dataset.cat);
    });
  });
}

/* ══ 15. FETCH MENU FROM SERVER ══ */
async function fetchMenu() {
  try {
    const res = await fetch('/api/menu');
    if (!res.ok) return;
    const items = await res.json();
    const fresh = { coffee:[], raf:[], cold:[], dessert:[] };
    items.forEach(item => {
      const cat = fresh[item.category] !== undefined ? item.category : 'coffee';
      const local = allItems.find(i => i.name === item.name);
      fresh[cat].push({
        id: item.id, icon: item.icon || '☕',
        img: item.image_url || (local ? local.img : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80'),
        name: item.name, desc: item.description || '',
        priceNum: item.price_num || 0, price: item.price
      });
    });
    Object.assign(menuData, fresh);
    allItems.length = 0;
    allItems.push(...Object.values(menuData).flat());
  } catch (_) {}
}

/* ══ 16. ORDER MODAL ══ */
function openOrderModal() {
  document.getElementById('orderOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  fetchMenu().then(() => renderOrderItems(currentCat));
}
function closeOrderModal() {
  document.getElementById('orderOverlay').classList.remove('open');
  document.body.style.overflow = '';
  const cw = document.getElementById('cartWrap');
  const co = document.getElementById('checkoutWrap');
  if (cw) cw.style.display = 'flex';
  if (co) co.style.display = 'none';
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('orderOverlay')) closeOrderModal();
}

/* ORDER TABS */
document.addEventListener('DOMContentLoaded', () => {
  const orderTabsEl = document.getElementById('orderTabs');
  if (orderTabsEl) {
    orderTabsEl.addEventListener('click', e => {
      if (!e.target.classList.contains('order-tab')) return;
      document.querySelectorAll('.order-tab').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCat = e.target.dataset.cat;
      const searchEl = document.getElementById('orderSearch');
      if (searchEl) searchEl.value = '';
      renderOrderItems(currentCat);
    });
  }

  const searchEl = document.getElementById('orderSearch');
  if (searchEl) {
    searchEl.addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) { renderOrderItems(currentCat); return; }
      renderItemsArray(allItems.filter(i => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)));
    });
  }
});

/* RENDER ORDER ITEMS */
function renderOrderItems(cat) { renderItemsArray(menuData[cat] || []); }

function renderItemsArray(items) {
  const grid = document.getElementById('orderItems');
  if (!items.length) { grid.innerHTML = '<div class="order-no-results">Ничего не найдено 🔍</div>'; return; }
  grid.innerHTML = items.map(item => {
    const qty = cart[item.id] || 0;
    const imgEl = item.img
      ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px" onerror="this.style.display='none';this.parentElement.textContent='${item.icon}'">`
      : item.icon;
    const ratingVal = (4.3 + (item.id % 7) * 0.1).toFixed(1);
    return `
      <div class="order-item-card">
        <div class="order-item-img">${imgEl}</div>
        <div class="order-item-body">
          <div class="order-item-name">${item.name}</div>
          <div style="font-size:0.7rem;color:var(--accent);margin-top:2px;font-weight:600">⭐ ${ratingVal}</div>
          <div class="order-item-desc">${item.desc}</div>
        </div>
        <div class="order-item-footer">
          <div class="order-item-price">${item.price}</div>
          ${qty === 0
            ? `<button class="order-item-add" onclick="addToCart(${item.id})">+</button>`
            : `<div class="order-item-counter">
                <button class="counter-btn" onclick="changeQty(${item.id},-1)">−</button>
                <span class="counter-num">${qty}</span>
                <button class="counter-btn" onclick="changeQty(${item.id},1)">+</button>
              </div>`
          }
        </div>
      </div>`;
  }).join('');
}

/* ══ 17. CART ══ */
function addToCart(id)  { cart[id] = (cart[id] || 0) + 1; refreshAll(); }
function changeQty(id, delta) { cart[id] = (cart[id] || 0) + delta; if (cart[id] <= 0) delete cart[id]; refreshAll(); }
function clearCart() { if (!Object.keys(cart).length) return; if (!confirm('Очистить корзину?')) return; cart = {}; refreshAll(); }

function refreshAll() {
  const searchEl = document.getElementById('orderSearch');
  const q = searchEl ? searchEl.value.toLowerCase().trim() : '';
  q ? renderItemsArray(allItems.filter(i => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)))
    : renderOrderItems(currentCat);
  renderCart();
}

function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmpty   = document.getElementById('cartEmpty');
  const cartFooter  = document.getElementById('cartFooter');
  const clearBtn    = document.getElementById('cartClearBtn');
  const ids = Object.keys(cart).map(Number);
  if (!ids.length) {
    if (cartEmpty)  cartEmpty.style.display  = 'flex';
    if (cartItemsEl) cartItemsEl.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'none';
    if (clearBtn)   clearBtn.style.display   = 'none';
    return;
  }
  if (cartEmpty)  cartEmpty.style.display  = 'none';
  if (cartItemsEl) cartItemsEl.style.display = 'flex';
  if (cartFooter) cartFooter.style.display = 'block';
  if (clearBtn)   clearBtn.style.display   = 'block';
  if (cartItemsEl) {
    cartItemsEl.innerHTML = ids.map(id => {
      const item = allItems.find(i => i.id === id); if (!item) return '';
      const qty = cart[id];
      return `<div class="cart-row">
        <div class="cart-row-icon">${item.icon}</div>
        <div class="cart-row-info">
          <div class="cart-row-name">${item.name}</div>
          <div class="cart-row-price">${item.price} × ${qty} = ${(item.priceNum*qty).toLocaleString('ru-RU')} сум</div>
        </div>
        <div class="cart-row-counter">
          <button class="cart-counter-btn" onclick="changeQty(${id},-1)">−</button>
          <span class="cart-counter-num">${qty}</span>
          <button class="cart-counter-btn" onclick="changeQty(${id},1)">+</button>
        </div></div>`;
    }).join('');
  }
  const total = ids.reduce((s,id) => s+(allItems.find(i=>i.id===id)?.priceNum||0)*cart[id], 0);
  const str = total.toLocaleString('ru-RU') + ' сум';
  const sub = document.getElementById('cartSubtotal');
  const tot = document.getElementById('cartTotal');
  if (sub) sub.textContent = str;
  if (tot) tot.textContent = str;
}

/* ══ 18. CHECKOUT ══ */
function toggleCheckout() {
  const cw = document.getElementById('cartWrap');
  const co = document.getElementById('checkoutWrap');
  const isCart = cw.style.display !== 'none';
  cw.style.display = isCart ? 'none' : 'flex';
  co.style.display = isCart ? 'flex' : 'none';
  if (isCart) {
    const ids = Object.keys(cart).map(Number);
    const total = ids.reduce((s,id) => s+(allItems.find(i=>i.id===id)?.priceNum||0)*cart[id], 0);
    const el = document.getElementById('checkoutTotal');
    if (el) el.textContent = total.toLocaleString('ru-RU') + ' сум';
  }
}

async function placeOrder() {
  const name    = document.getElementById('orderName')?.value.trim();
  const phone   = document.getElementById('orderPhone')?.value.trim();
  const address = document.getElementById('orderAddr')?.value.trim();
  const floor   = document.getElementById('orderFloor')?.value.trim();
  const comment = document.getElementById('orderComment')?.value.trim();
  const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cash';
  if (!name)    { document.getElementById('orderName')?.focus();  alert('Введите имя'); return; }
  if (!phone)   { document.getElementById('orderPhone')?.focus(); alert('Введите телефон'); return; }
  if (!address) { document.getElementById('orderAddr')?.focus();  alert('Введите адрес'); return; }
  const ids = Object.keys(cart).map(Number);
  const items = ids.map(id => { const item = allItems.find(i=>i.id===id); return {...item, qty:cart[id]}; });
  if (!items.length) { alert('Корзина пуста'); return; }
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, phone, address, floor, comment, payment, items})
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert('Не удалось оформить заказ: ' + (data.error || 'ошибка сервера') + '\nПожалуйста, напишите нам в Telegram @t7delivery');
      return;
    }
    const checkoutWrap = document.getElementById('checkoutWrap');
    if (checkoutWrap) {
      checkoutWrap.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;padding:2.5rem 1.5rem;text-align:center;gap:1rem">
          <div style="width:60px;height:60px;border-radius:50%;background:rgba(74,222,128,.15);border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--accent)">✓</div>
          <div style="font-size:1.1rem;font-weight:700;color:var(--text)">Заказ принят!</div>
          <p style="font-size:.85rem;color:var(--muted);line-height:1.6">Мы позвоним вам в течение 5 минут.</p>
          <a href="https://t.me/t7delivery" target="_blank" style="font-size:.78rem;color:var(--accent);text-decoration:none">@t7delivery</a>
          <button class="checkout-btn" onclick="closeOrderModal()" style="margin-top:1rem">Закрыть</button>
        </div>`;
    }
    cart = {};
  } catch {
    alert('Ошибка соединения. Пожалуйста, напишите нам в Telegram @t7delivery');
  }
}

/* ══ DOMContentLoaded: INIT ALL ══ */
document.addEventListener('DOMContentLoaded', async () => {
  initReveal();
  animateCounters();
  initRatingStars();
  await fetchMenu();
  initMenuTabs();
  renderPageMenu('coffee');
  loadSpecials();
  loadReviews();
});
