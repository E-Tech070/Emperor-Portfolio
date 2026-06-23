/* =========================================
   EMPEROR BOOST — script.js
   Original logic + Professional Enhancements
   ========================================= */

/* ── MOBILE NAV ── */
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('active');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
  document.body.style.overflow = '';
}

/* ── SELECT PLAN FROM PRICING CARDS ── */
function selectPlan(plan) {
  const select = document.getElementById('f-plan');
  // Map button label to matching option text
  const optionMap = {
    'Starter - ₦500': 'Starter — ₦500',
    'Standard - ₦1,500': 'Standard — ₦1,500',
    'Premium - ₦3,000': 'Premium — ₦3,000',
    'VIP - ₦7,000': 'VIP — ₦7,000'
  };
  const targetValue = optionMap[plan] || plan;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].text === targetValue) {
      select.selectedIndex = i;
      break;
    }
  }
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
  // Briefly highlight the select field
  select.classList.add('error');
  select.classList.remove('error');
  select.style.borderColor = 'var(--lime)';
  select.style.boxShadow = '0 0 0 3px rgba(198,241,53,0.15)';
  setTimeout(() => {
    select.style.borderColor = '';
    select.style.boxShadow = '';
  }, 1800);
}

/* ── FAQ TOGGLE ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

/* ── TOAST NOTIFICATION ── */
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── FORM VALIDATION & ORDER SUBMIT ── */
function submitBoostOrder() {
  const fields = [
    { id: 'f-name', label: 'Full Name' },
    { id: 'f-phone', label: 'WhatsApp Number' },
    { id: 'f-link', label: 'Link or Business Name' },
    { id: 'f-plan', label: 'Package' },
    { id: 'f-type', label: 'Promotion Type' }
  ];

  let isValid = true;

  // Clear previous errors
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    el.classList.remove('error');
  });

  // Validate
  for (const f of fields) {
    const el = document.getElementById(f.id);
    if (!el.value.trim()) {
      el.classList.add('error');
      isValid = false;
    }
  }

  if (!isValid) {
    showToast('⚠️ Please fill in all required fields');
    // Scroll to first error
    const firstError = document.querySelector('.form-input.error, .form-select.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const link = document.getElementById('f-link').value.trim();
  const plan = document.getElementById('f-plan').value;
  const type = document.getElementById('f-type').value;
  const msg = document.getElementById('f-msg').value.trim() || 'No additional message';

  const text =
    `Hello Emperor Boost! 👋%0A%0AI'd like to place an order:%0A%0A` +
    `*Name:* ${encodeURIComponent(name)}%0A` +
    `*Phone:* ${encodeURIComponent(phone)}%0A` +
    `*Link/Business:* ${encodeURIComponent(link)}%0A` +
    `*Package:* ${encodeURIComponent(plan)}%0A` +
    `*Type:* ${encodeURIComponent(type)}%0A` +
    `*Message:* ${encodeURIComponent(msg)}%0A%0A` +
    `Kindly confirm my order and send payment details. Thank you!`;

  window.open(`https://wa.me/234XXXXXXXXXX?text=${text}`, '_blank');

  // Show success
  document.getElementById('form-success').style.display = 'block';
  showToast('✅ Redirecting to WhatsApp...');

  // Clear form
  ['f-name', 'f-phone', 'f-link', 'f-msg'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-plan').selectedIndex = 0;
  document.getElementById('f-type').selectedIndex = 0;
}

/* ── REMOVE ERROR CLASS ON INPUT ── */
document.addEventListener('DOMContentLoaded', () => {
  ['f-name', 'f-phone', 'f-link', 'f-plan', 'f-type'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => el.classList.remove('error'));
      el.addEventListener('change', () => el.classList.remove('error'));
    }
  });
});

/* ── SCROLL PROGRESS BAR ── */
function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = pct + '%';
}

/* ── HEADER SCROLL EFFECT ── */
function updateHeader() {
  const h = document.querySelector('.header');
  if (!h) return;
  if (window.scrollY > 50) {
    h.style.background = 'rgba(10,10,15,0.98)';
    h.classList.add('scrolled');
  } else {
    h.style.background = 'rgba(10,10,15,0.85)';
    h.classList.remove('scrolled');
  }
}

/* ── BACK TO TOP BUTTON ── */
function updateBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

/* ── SCROLL REVEAL (INTERSECTION OBSERVER) ── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach(el => observer.observe(el));
}

/* ── ANIMATED COUNTER ── */
function animateCounter(el, target, suffix, duration = 1800) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    if (suffix === 'K+') {
      el.textContent = (current >= 1000 ? Math.floor(current / 1000) + 'K' : current) + '+';
    } else {
      el.textContent = current + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = (suffix === 'K+') ? '10K+' : target + suffix;
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const statEls = document.querySelectorAll('.hero-stat-num[data-target]');
  if (!statEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statEls.forEach(el => observer.observe(el));
}

/* ── ACTIVE NAV LINK ON SCROLL ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--lime)';
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ── MASTER SCROLL HANDLER ── */
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateHeader();
  updateBackToTop();
}, { passive: true });

/* ── INIT ON DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initActiveNav();
  updateScrollProgress();
  updateHeader();
  updateBackToTop();
});