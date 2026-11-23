/* =========================================================
   ANAS PORTFOLIO — shared site behavior
   Loaded on every page so navigation, reveals and motion
   stay consistent site-wide.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAV: scrolled state ---------- */
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('mobilePanel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        panel.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- HERO IMAGE REVEAL ---------- */
  const heroIllustration = document.querySelector('.hero-illustration');
  if (heroIllustration) {
    requestAnimationFrame(() => {
      setTimeout(() => heroIllustration.classList.add('in'), 150);
    });
  }

  /* ---------- SCROLL REVEALS ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        const value = Math.floor(eased * target);
        el.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
          if (suffix) {
            el.innerHTML = target + '<span class="suffix">' + suffix + '</span>';
          }
        }
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(c => cio.observe(c));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------- CAPABILITY BARS ---------- */
  const bars = document.querySelectorAll('.cap-fill');
  if (bars.length && 'IntersectionObserver' in window) {
    const bio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = (el.dataset.width || '0') + '%';
          bio.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => bio.observe(b));
  } else {
    bars.forEach(b => { b.style.width = (b.dataset.width || '0') + '%'; });
  }

  /* ---------- TESTIMONIAL SLIDER ---------- */
  const track = document.getElementById('tSlides');
  if (track) {
    const slides = Array.from(track.children);
    const dotsWrap = document.getElementById('tDots');
    const prevBtn = document.getElementById('tPrev');
    const nextBtn = document.getElementById('tNext');
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 't-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      restart();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    render();
    restart();
  }

});
