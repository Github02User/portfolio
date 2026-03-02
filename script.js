// ── NAVBAR SCROLL ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ── SCROLL REVEAL ──
const fadeEls = document.querySelectorAll(
  '.hero-text, .hero-img-wrap, .about-img-wrap, .col-lg-7, .skill-card, .project-card, .timeline-item, .contact-info-item, .contact-form-wrap'
);

fadeEls.forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ── SKILL PROGRESS BARS ──
const progBars = document.querySelectorAll('.prog-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      setTimeout(() => { bar.style.width = width + '%'; }, 200);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

progBars.forEach(bar => barObserver.observe(bar));

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const toastMsg = document.getElementById('toastMsg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show success message
    formSuccess.classList.remove('d-none');
    contactForm.reset();

    // Show toast
    toastMsg.style.display = 'flex';
    toastMsg.style.alignItems = 'center';
    setTimeout(() => { toastMsg.style.display = 'none'; }, 4000);

    // Hide success after delay
    setTimeout(() => { formSuccess.classList.add('d-none'); }, 5000);
  });
}

// ── SMOOTH ANCHOR CLOSE MOBILE NAV ──
document.querySelectorAll('.nav-link, .btn-hire').forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    if (navMenu.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// ── COUNTER ANIMATION (stats) ──
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate once when hero stats visible
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
