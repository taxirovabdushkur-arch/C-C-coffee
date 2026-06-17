/* ========== MENU DATA ========== */
const menuData = {
  coffee: [
    { icon:'☕', name:'Эспрессо',  desc:'Насыщенный, концентрированный. Основа всего.',                  price:'от 12 000 сум' },
    { icon:'☕', name:'Американо', desc:'Эспрессо с горячей водой — мягкий и ароматный.',                price:'от 14 000 сум' },
    { icon:'☕', name:'Капучино',  desc:'Эспрессо, молоко и воздушная пенка.',                           price:'от 18 000 сум' },
    { icon:'☕', name:'Латте',     desc:'Нежный кофе с большим количеством молока.',                     price:'от 20 000 сум' },
    { icon:'☕', name:'Раф',       desc:'Сливочный кофе на основе сливок — наш фирменный фаворит.',      price:'от 22 000 сум' },
  ],
  cold: [
    { icon:'🧊', name:'Айс Латте',    desc:'Классический латте со льдом.',                              price:'от 22 000 сум' },
    { icon:'🧊', name:'Холодный Брю', desc:'Кофе холодного заваривания — мягкий вкус.',                 price:'от 24 000 сум' },
    { icon:'🧊', name:'Фраппе',       desc:'Взбитый ледяной кофе с молоком.',                           price:'от 24 000 сум' },
    { icon:'🍵', name:'Матча Латте',  desc:'Японский матча с молоком — нежный и освежающий.',           price:'от 26 000 сум' },
  ],
  tea: [
    { icon:'🍵', name:'Зелёный чай',  desc:'Классический китайский зелёный чай.',                       price:'от 10 000 сум' },
    { icon:'🍵', name:'Чёрный чай',   desc:'Крепкий и ароматный — с молоком или без.',                  price:'от 10 000 сум' },
    { icon:'🍵', name:'Травяной сбор',desc:'Мята, ромашка, мелисса — расслабляющее сочетание.',         price:'от 12 000 сум' },
    { icon:'🍵', name:'Фруктовый чай',desc:'Яркий, насыщенный и ароматный — без кофеина.',              price:'от 14 000 сум' },
  ],
  dessert: [
    { icon:'🍰', name:'Чизкейк', desc:'Нежный классический чизкейк Нью-Йорк.',                         price:'от 25 000 сум' },
    { icon:'🍫', name:'Брауни',  desc:'Шоколадный брауни — плотный, тёмный, карамельный.',             price:'от 18 000 сум' },
    { icon:'🥐', name:'Круассан',desc:'Хрустящий, слоёный — со сливочным маслом или начинкой.',        price:'от 16 000 сум' },
    { icon:'🍩', name:'Маффин',  desc:'Пышный маффин — черничный, шоколадный или ванильный.',          price:'от 14 000 сум' },
  ]
};

function renderMenu(cat) {
  document.getElementById('menuGrid').innerHTML = menuData[cat].map(item => `
    <div class="menu-card">
      <div class="menu-card-icon">${item.icon}</div>
      <div class="menu-card-name">${item.name}</div>
      <div class="menu-card-desc">${item.desc}</div>
      <div class="menu-card-price">${item.price}</div>
    </div>
  `).join('');
}
renderMenu('coffee');

document.getElementById('menuTabs').addEventListener('click', e => {
  if (!e.target.classList.contains('tab-btn')) return;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  renderMenu(e.target.dataset.cat);
});

/* ========== INTRO ANIMATION ========== */
window.addEventListener('load', () => {
  const intro  = document.getElementById('intro');
  const logo   = document.getElementById('intro-logo');
  const header = document.getElementById('header');

  setTimeout(() => {
    logo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    logo.style.opacity = '1';
    logo.style.transform = 'scale(1)';
  }, 100);

  setTimeout(() => { logo.style.transform = 'scale(1.06)'; }, 900);

  setTimeout(() => {
    intro.style.transition = 'opacity 0.6s ease';
    intro.style.opacity = '0';
  }, 1500);

  setTimeout(() => {
    intro.classList.add('done');
    header.classList.add('visible');
  }, 2100);
});

/* ========== SCROLL REVEAL ========== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========== MOBILE NAV ========== */
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');
let navOpen = false;

burger.addEventListener('click', () => {
  navOpen = !navOpen;
  mobileNav.classList.toggle('open', navOpen);
  const spans = burger.querySelectorAll('span');
  if (navOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobileNav() {
  navOpen = false;
  mobileNav.classList.remove('open');
  burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

/* ========== CONTACT FORM ========== */
function submitForm() {
  const name  = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  if (!name || !phone) { alert('Пожалуйста, заполните имя и номер телефона.'); return; }
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('fname').value = '';
  document.getElementById('fphone').value = '';
  document.getElementById('fmsg').value = '';
  setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 5000);
}

/* ========== ACTIVE NAV ON SCROLL ========== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  document.querySelectorAll('nav a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });