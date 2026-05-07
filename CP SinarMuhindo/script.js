/*--------loader--------------*/
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('loading');
  setTimeout(() => loader.classList.add('done'), 1400);
});




/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ---- Scroll Reveal ---- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

/* ---- Counter animation ---- */
function animateCount(el, target, duration = 1600) {
  let start = 0;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCount(el, parseInt(el.textContent));
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item .n').forEach(el => counterObserver.observe(el));

/* ---- Parallax hero ---- */


const slider = document.getElementById('aboutSlider');
const slides = document.querySelectorAll('.about-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let counter = 0;
const size = slides.length;
let autoSlideInterval;

function moveSlider() {
  slider.style.transform = `translateX(${-counter * 100}%)`;
}

function nextSlide() {
  counter = (counter + 1) % size;
  moveSlider();
}

function prevSlide() {
  counter = (counter - 1 + size) % size;
  moveSlider();
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetTimer();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetTimer();
});

// Auto Slide Logic
function startTimer() {
  autoSlideInterval = setInterval(nextSlide, 9000); // 9 detik
}

function resetTimer() {
  clearInterval(autoSlideInterval);
  startTimer();
}

// Inisialisasi
startTimer();

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active'); 
});