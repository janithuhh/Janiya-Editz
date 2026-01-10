/* TemplateMo 595 – 3D Coverflow (Clean Version) */

// Elements
const items = document.querySelectorAll('.coverflow-item');
const dotsContainer = document.getElementById('dots');
const container = document.querySelector('.coverflow-container');

let currentIndex = 3;
let isAnimating = false;

/* Create dots */
items.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.addEventListener('click', () => goToIndex(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

/* Update coverflow */
function updateCoverflow() {
  if (isAnimating) return;
  isAnimating = true;

  items.forEach((item, index) => {
    let offset = index - currentIndex;

    if (offset > items.length / 2) offset -= items.length;
    if (offset < -items.length / 2) offset += items.length;

    const abs = Math.abs(offset);
    const sign = Math.sign(offset);

    item.style.transform = `
      translateX(${offset * 220}px)
      translateZ(${-abs * 200}px)
      rotateY(${-sign * Math.min(abs * 60, 60)}deg)
      scale(${1 - abs * 0.1})
    `;

    item.style.opacity = abs > 3 ? 0 : 1 - abs * 0.2;
    item.style.zIndex = 100 - abs;
    item.classList.toggle('active', index === currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });

  setTimeout(() => (isAnimating = false), 600);
}

/* Navigation */
function navigate(direction) {
  if (isAnimating) return;
  currentIndex = (currentIndex + direction + items.length) % items.length;
  updateCoverflow();
}

/* Go directly */
function goToIndex(index) {
  if (index === currentIndex) return;
  currentIndex = index;
  updateCoverflow();
}

/* Keyboard support */
container.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

/* Click image */
items.forEach((item, index) => {
  item.addEventListener('click', () => goToIndex(index));
});

/* Autoplay */
let autoplay = setInterval(() => navigate(1), 4000);

/* Play / Pause */
function toggleAutoplay() {
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');

  if (autoplay) {
    clearInterval(autoplay);
    autoplay = null;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  } else {
    autoplay = setInterval(() => navigate(1), 4000);
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }
}

/* Init */
updateCoverflow();

