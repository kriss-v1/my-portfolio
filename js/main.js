const svgPlaceholder = (letter, bg = '#1a1a3e', accent = '#6c63ff') =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="${bg}"/>
    <rect x="0" y="0" width="600" height="6" fill="${accent}"/>
    <text x="300" y="210" text-anchor="middle" fill="${accent}" font-family="sans-serif" font-size="80" font-weight="bold" opacity="0.4">${letter}</text>
  </svg>`)}`;

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with product management, cart functionality, and payment integration.',
    image: "images/e commerce.jpg",
    tags: ['React', 'Node.js', 'My sql', 'Stripe'],
    details: 'Built a complete e-commerce platform featuring user authentication, product catalog with search and filtering, shopping cart, checkout flow with Stripe integration, and an admin dashboard for inventory management.'
  },
  {
    id: 2,
    title: 'School Management system',
    description: 'Kanban-style school management tool with real-time collaboration and drag-and-drop interfaces.',
    image: "images/school management.jpg",
    tags: ['HTML5', 'CSS3', 'My sql', 'Node.js'],
    details: 'Developed a real-time collaborative task management application with drag-and-drop Kanban boards, Notes, Tests and live courses for students.'
  },
  {
    id: 3,
    title: 'Library Management System',
    description: 'AI Powered books management tool with visualization dashboard with historical data of borrowed books and students.',
    image: "images/library management.webp",
    tags: ['Node.js', 'REST API', 'OpenAI', 'HTML&CSS'],
    details: 'Created an AI-powered library managent system that uses GPT models and algorithm to highlight your most viewed books, stories, and trending books with their description.'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Interactive weather visualization dashboard with historical data and forecasting.',
    image: "images/weather.jpg",
    tags: ['JavaScript', 'HTML5', 'REST API', 'CSS3'],
    details: 'Built an interactive weather dashboard displaying current conditions, 7-day forecasts, and historical data visualizations using HTML5 with data from OpenWeatherMap API.'
  },
  {
    id: 5,
    title: 'Song Request Platform',
    description: 'Song request platform with World best playlists from all countries.',
    image: "images/song.jpg",
    tags: ['REST API', 'My sql', 'Node.js', 'React'],
    details: 'Designed a CI/CD monitoring dashboard that tracks the requested songs to be played, request history, and live requested songs with real-time alerting.'
  },
  {
    id: 6,
    title: 'Social Media API',
    description: 'RESTful API backend for a social media platform with real-time features.',
    image: "images/social media.jpg",
    tags: ['Express.js', 'MySQL', 'Redis', 'JWT'],
    details: 'Engineered a scalable RESTful API for a social media platform featuring user authentication (JWT), posts, comments, likes, friend requests, newsfeed generation, and Redis-cached real-time notifications.'
  }
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(p => `
    <article class="project-card" data-id="${p.id}">
      <img class="project-card__image" src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="project-card__body">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__tags">
          ${p.tags.map(t => `<span class="project-card__tag">${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });
}

function openModal(id) {
  const p = projects.find(proj => proj.id === id);
  if (!p) return;
  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <img src="${p.image}" alt="${p.title}">
    <h2>${p.title}</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin:16px 0">
      ${p.tags.map(t => `<span class="project-card__tag">${t}</span>`).join('')}
    </div>
    <p>${p.details}</p>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  const modal = document.getElementById('project-modal');
  modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
  modal.querySelector('.modal__close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});

const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('svg');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
icon.outerHTML = savedTheme === 'dark'
  ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
  : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const svg = themeToggle.querySelector('svg');
  svg.outerHTML = next === 'dark'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
});

const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});

navList.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function setError(input, message) {
  const group = input.closest('.form__group');
  const errorEl = group.querySelector('.form__error');
  errorEl.textContent = message;
  errorEl.classList.add('show');
  group.classList.add('error');
}

function clearError(input) {
  const group = input.closest('.form__group');
  const errorEl = group.querySelector('.form__error');
  errorEl.textContent = '';
  errorEl.classList.remove('show');
  group.classList.remove('error');
}

form.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => clearError(el));
  el.addEventListener('blur', () => {
    if (el.hasAttribute('required') && !el.value.trim()) {
      setError(el, 'This field is required');
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;
  const fields = ['name', 'email', 'subject', 'message'];

  fields.forEach(f => {
    const input = form.elements[f];
    if (!input.value.trim()) {
      setError(input, 'This field is required');
      valid = false;
    } else if (f === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      setError(input, 'Please enter a valid email');
      valid = false;
    }
  });

  if (!valid) return;

  showToast('Message sent successfully! I\'ll get back to you soon.');
  form.reset();
});

document.querySelectorAll('.section:not(#hero)').forEach(section => {
  section.style.opacity = '0';
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(section);
});
