/* ==========================================================================
   MOTION DESIGN & INTERACTIONS CINÉMATOGRAPHIQUES
   RAMDE Abdoul Rachid — MR_RAMDE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. LUEUR DE CURSEUR D'AMBIANCE (DESKTOP) ---
  const ambientCursor = document.getElementById('ambient-cursor');
  if (ambientCursor && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderGlow() {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      ambientCursor.style.left = `${currentX}px`;
      ambientCursor.style.top = `${currentY}px`;
      requestAnimationFrame(renderGlow);
    }
    renderGlow();
  }


  // --- 2. BOUTONS MAGNÉTIQUES AVEC MOTION DESIGN ---
  const magneticBtns = document.querySelectorAll('.btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  // --- 3. ANIMATIONS GSAP & SCROLLTRIGGER ---
  if (typeof gsap !== 'undefined') {
    // Enregistrement du plugin ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // A. Hero Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
    
    heroTl.from('.hero-avatar-wrap', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.5)'
    })
    .from('.hero-tag', { opacity: 0, y: -15, duration: 0.5 }, '-=0.6')
    .from('.hero-name', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
    .from('.hero-title-role', { opacity: 0, y: 15, duration: 0.6 }, '-=0.5')
    .from('.hero-desc', { opacity: 0, y: 15, duration: 0.6 }, '-=0.5')
    .from('.meta-chip', { opacity: 0, y: 10, stagger: 0.1, duration: 0.5 }, '-=0.4')
    .from('.hero-cta-btns .btn', { opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.5 }, '-=0.3');

    // B. Encart Objectif Pro
    gsap.from('.statement-card', {
      scrollTrigger: {
        trigger: '.statement-card',
        start: 'top 85%'
      },
      opacity: 0,
      y: 25,
      duration: 0.8,
      ease: 'power2.out'
    });

    // C. Bento Cards Compétences
    gsap.from('.gs-card', {
      scrollTrigger: {
        trigger: '#competences',
        start: 'top 75%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    });

    // D. Timeline Expériences (Slide in fluide)
    const timelineItems = document.querySelectorAll('.gs-timeline-item');
    timelineItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%'
        },
        opacity: 0,
        x: -30,
        duration: 0.75,
        delay: index * 0.08,
        ease: 'power3.out'
      });
    });

    // E. Barres de langues
    gsap.from('.lang-fill', {
      scrollTrigger: {
        trigger: '#formation',
        start: 'top 75%'
      },
      width: '0%',
      stagger: 0.2,
      duration: 1.2,
      ease: 'power3.out'
    });

    // F. Bannière Contact
    gsap.from('.contact-banner', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%'
      },
      scale: 0.96,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.2)'
    });

  } else {
    // Fallback si GSAP indisponible hors-ligne
    document.querySelectorAll('.gs-fade-up, .gs-card, .gs-timeline-item').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }


  // --- 4. TÉLÉCHARGER / IMPRIMER EN PDF ---
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }


  // --- 5. SCROLL-SPY ACTIF SUR LA NAVBAR ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

});
