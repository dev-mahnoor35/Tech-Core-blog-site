/**
 * Tech Core — Absolute Dynamic Animations Engine
 * Automatically applies Multi-Directional Entrance Reveals & 3D Hover Lift
 * to EVERY single element, container, card, box, and button across all pages.
 * Built for Mahnoor Fatima
 */

document.addEventListener("DOMContentLoaded", () => {

  // 1. INTERSECTION OBSERVER CONFIGURATION
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -30px 0px",
    threshold: 0.1
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target); // Trigger once for ultra-smooth performance
      }
    });
  }, observerOptions);

  // 2. AGGRESSIVE AUTO-TARGETING FOR EVERY PAGE ELEMENT
  const applySiteWideEntranceAnimations = () => {
    // Queries literally EVERY component, container, box, text block, and interactive element
    const allElements = document.querySelectorAll(`
      header, nav, .hero-section, .hero-banner, section, footer,
      .card, .feature-card, .course-card, .article-card, .persona-box, .resource-box, .box,
      h1, h2, h3, h4, h5, h6,
      p, ul, ol, li, blockquote,
      button, .btn-black, .btn, input, textarea, select, form,
      img, svg, .icon, .badge, .tag,
      div:not(#aiWindow):not(#aiTrigger):not(.ai-chat-body):not(.ai-chat-header):not(.ai-chat-input-area)
    `);

    let counter = 0;

    allElements.forEach((el) => {
      // Ignore AI Widget internals and empty structural wrappers
      if (
        el.closest("#aiWindow") || 
        el.id === "aiTrigger" || 
        el.children.length > 8 || 
        el.classList.contains("reveal-active")
      ) {
        return;
      }

      // Automatically assign directional reveal classes if not assigned
      if (
        !el.classList.contains("reveal-left") &&
        !el.classList.contains("reveal-right") &&
        !el.classList.contains("reveal-up")
      ) {
        if (counter % 3 === 0) {
          el.classList.add("reveal-left");
        } else if (counter % 3 === 1) {
          el.classList.add("reveal-up");
        } else {
          el.classList.add("reveal-right");
        }
        counter++;
      }

      // Attach observer
      revealOnScroll.observe(el);
    });
  };

  // 3. UNIVERSAL HOVER DYNAMICS FOR ALL BOXES, CARDS & INTERACTIVE ITEMS
  const applyUniversalHoverEffects = () => {
    const hoverTargets = document.querySelectorAll(`
      .card, .feature-card, .course-card, .article-card, .persona-box, .resource-box, .box,
      button, .btn-black, .btn, input, textarea, select,
      img, .tag, .badge, li
    `);

    hoverTargets.forEach((item) => {
      // Smooth transition property setup
      item.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s ease, border-color 0.35s ease";

      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-6px) scale(1.018)";
        item.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.18)";
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(0px) scale(1)";
        item.style.boxShadow = "none";
      });
    });
  };

  // Execute All Animations
  applySiteWideEntranceAnimations();
  applyUniversalHoverEffects();
});