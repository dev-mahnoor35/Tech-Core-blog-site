// Universal Scroll Animation Script for Tech Core
document.addEventListener('DOMContentLoaded', () => {
  // 1. Automatically find all card grids across all pages
  const gridContainers = document.querySelectorAll('.resources-grid, #courses-grid, .ps-grid, [class*="grid"]');

  gridContainers.forEach(grid => {
    const cards = grid.querySelectorAll('[class*="card"]');
    cards.forEach((card, index) => {
      card.classList.add('animate-on-scroll');
      
      // Even index cards slide from Left, Odd index cards slide from Right
      if (index % 2 === 0) {
        card.classList.add('animate-from-left');
      } else {
        card.classList.add('animate-from-right');
      }
    });
  });

  // 2. IntersectionObserver to trigger smooth animation when scrolled into view
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Animate once smoothly
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });
});