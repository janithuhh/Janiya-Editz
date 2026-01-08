// Simple scroll animation
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
