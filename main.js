/**
 * DECIBELS AUDIO SYSTEMS - MAIN INTERACTIVE ENGINE
 * Background Video Hero & 4-Frame Full-Screen Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. NAVBAR SCROLL BACKDROP BLUR & ACTIVE LINK OBSERVER
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. 4-FRAME SCROLL REVEAL ENGINE FOR THE ENGINEERING SECTION
  const expSection = document.getElementById('experience-reveal-section');
  const revealFrames = document.querySelectorAll('.reveal-frame');
  const stepNavItems = document.querySelectorAll('.step-nav-item');
  const sideNums = document.querySelectorAll('.side-num');

  let activeFrameIndex = -1;

  function updateFrameScroll() {
    if (!expSection) return;

    const rect = expSection.getBoundingClientRect();
    const totalHeight = expSection.clientHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / totalHeight));

    let targetIndex = 0;
    if (progress >= 0.75) {
      targetIndex = 3;
    } else if (progress >= 0.50) {
      targetIndex = 2;
    } else if (progress >= 0.25) {
      targetIndex = 1;
    } else {
      targetIndex = 0;
    }

    if (targetIndex !== activeFrameIndex) {
      activeFrameIndex = targetIndex;

      revealFrames.forEach((frame, idx) => {
        if (idx === targetIndex) {
          frame.classList.add('active');
        } else {
          frame.classList.remove('active');
        }
      });

      stepNavItems.forEach((item, idx) => {
        if (idx === targetIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Side Numbers Highlight Mapping
    const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / (totalDocHeight || 1);
    const numIndex = Math.min(7, Math.floor(scrollPercent * 8));
    
    sideNums.forEach((num, idx) => {
      if (idx === numIndex) {
        num.classList.add('active');
      } else {
        num.classList.remove('active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateFrameScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateFrameScroll();

  // Allow clicking on right step items to scroll to frame position
  stepNavItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      if (!expSection) return;
      const sectionTop = expSection.offsetTop;
      const totalHeight = expSection.clientHeight - window.innerHeight;
      const targetScroll = sectionTop + (totalHeight * (idx / 3));
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  // 3. PRODUCTS CAROUSEL SLIDERS
  const prodCarousel = document.getElementById('products-carousel');
  const prodPrev = document.getElementById('prod-prev');
  const prodNext = document.getElementById('prod-next');

  if (prodCarousel && prodPrev && prodNext) {
    prodPrev.addEventListener('click', () => {
      prodCarousel.scrollBy({ left: -340, behavior: 'smooth' });
    });

    prodNext.addEventListener('click', () => {
      prodCarousel.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  // 4. CONSULTATION / QUOTE DRAWER SLIDE-OVER
  const quoteDrawerOverlay = document.getElementById('quote-drawer-overlay');
  const triggerQuoteBtns = document.querySelectorAll('.trigger-quote-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const quoteForm = document.getElementById('quote-form');

  function openQuoteDrawer() {
    if (quoteDrawerOverlay) {
      quoteDrawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuoteDrawer() {
    if (quoteDrawerOverlay) {
      quoteDrawerOverlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  triggerQuoteBtns.forEach(btn => {
    btn.addEventListener('click', openQuoteDrawer);
  });

  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeQuoteDrawer);

  if (quoteDrawerOverlay) {
    quoteDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === quoteDrawerOverlay) closeQuoteDrawer();
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your Decibels Audio consultation request has been submitted. Our acoustic engineer will contact you shortly.');
      quoteForm.reset();
      closeQuoteDrawer();
    });
  }
});
