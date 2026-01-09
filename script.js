/* =========================
   SECTION SCROLL ANIMATION
========================= */
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const pos = section.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (pos < screen - 100) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
});


/* =========================
   IMAGE WATCH (SCROLL) ANIMATION
========================= */
const images = document.querySelectorAll('.spost, .Tute_covers');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.2
  }
);

images.forEach(img => observer.observe(img));
