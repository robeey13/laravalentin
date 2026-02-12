function createFloatingHearts() {
  const container = document.getElementById('heartsBg');

  function spawnHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = '♥';

    const size = Math.random() * 10 + 7;
    const left = Math.random() * 100;
    const duration = Math.random() * 14 + 14;

    heart.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation-duration: ${duration}s;
      color: rgba(190, 130, 115, 0.18);
    `;

    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  setInterval(spawnHeart, 3500);

  for (let i = 0; i < 3; i++) {
    setTimeout(spawnHeart, i * 1000);
  }
}

function setupEnvelope() {
  const envelope = document.getElementById('envelope');
  const intro = document.getElementById('intro');
  const letterSection = document.getElementById('letterSection');

  envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
      intro.classList.add('hidden');
      letterSection.classList.add('visible');
    }, 800);
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.things-list li').forEach((item, i) => {
    item.style.transitionDelay = (i * 0.1) + 's';
    observer.observe(item);
  });
}
function setupBigHeart() {
  const bigHeart = document.getElementById('bigHeart');
  if (!bigHeart) return;

  bigHeart.addEventListener('click', () => {
    const rect = bigHeart.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('span');
      heart.classList.add('sparkle');
      heart.textContent = '♥';
      heart.style.fontSize = Math.random() * 12 + 10 + 'px';
      heart.style.color = 'rgba(190, 130, 115, 0.5)';

      const angle = (Math.PI * 2 * i) / 12;
      const dist = Math.random() * 100 + 50;
      heart.style.left = cx + 'px';
      heart.style.top = cy + 'px';
      heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      heart.style.setProperty('--ty', Math.sin(angle) * dist + 'px');

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  });
}
function setupSecret() {
  const btn = document.getElementById('secretBtn');
  const overlay = document.getElementById('secretOverlay');
  const closeBtn = document.getElementById('secretClose');
  const heartsContainer = document.getElementById('secretHearts');
  if (!btn || !overlay) return;

  function spawnModalHearts() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.classList.add('secret-float-heart');
        h.textContent = '♥';
        h.style.left = Math.random() * 100 + '%';
        h.style.fontSize = (Math.random() * 10 + 10) + 'px';
        h.style.color = 'rgba(190, 130, 115, 0.25)';
        h.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        h.style.animationDelay = (Math.random() * 0.4) + 's';
        heartsContainer.appendChild(h);
        setTimeout(() => h.remove(), 4000);
      }, i * 250);
    }
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.classList.add('active');
    spawnModalHearts();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
}


function setupSlider() {
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');
  if (!track) return;

  const slides = track.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoPlayInterval;


  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentIndex - 1);
    resetAutoPlay();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentIndex + 1);
    resetAutoPlay();
  });


  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
      resetAutoPlay();
    }
  }, { passive: true });


  function startAutoPlay() {
    autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  startAutoPlay();
}


document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  setupEnvelope();
  setupScrollAnimations();
  setupBigHeart();
  setupSlider();
  setupSecret();
});