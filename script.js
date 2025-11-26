document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prev = document.querySelector('.btn-prev');
  const next = document.querySelector('.btn-next');
  const dots = document.querySelector('.carousel-dots');


  if (track) {
  let index = 0;
  let timer = null;

  function renderDots() {
    if (!dots) return;
    dots.innerHTML = '';
    const count = Math.max(1, slides.length - slidesPerView + 1);
    for (let i = 0; i < count; i++) {
      const b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === index ? 'true' : 'false');
      b.addEventListener('click', () => goTo(i));
      dots.appendChild(b);
    }
  }

  let slidesPerView = 1;
  let stride = 0;

  function update() {
    const wrapper = track.parentElement;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    slidesPerView = Math.max(1, Math.floor(wrapper.clientWidth / (slideWidth + gap)));
    stride = slideWidth + gap;
    const offset = -index * stride;
    track.style.transform = `translateX(${offset}px)`;
    if (dots) dots.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-selected', i === index ? 'true' : 'false'));
  }

  function goTo(i) {
    const maxIndex = Math.max(0, slides.length - slidesPerView);
    const cycle = maxIndex + 1;
    if (cycle <= 0) { index = 0; }
    else {
      index = ((i % cycle) + cycle) % cycle; // wrap-around
    }
    update();
    restartAutoplay();
  }

  function nextSlide() { goTo(index + 1); }
  function prevSlide() { goTo(index - 1); }

  function autoplay() { timer = setInterval(nextSlide, 5000); }
  function restartAutoplay() { clearInterval(timer); autoplay(); }

  function onResize() { update(); renderDots(); }

  update();
  renderDots();
  autoplay();

  if (next) next.addEventListener('click', nextSlide);
  if (prev) prev.addEventListener('click', prevSlide);
  window.addEventListener('resize', onResize);
  }

  // ----------- Media Partner Carousel -----------
  const mediaTrack = document.querySelector('.media-track');
  if (mediaTrack) {
    const mSlides = Array.from(mediaTrack.querySelectorAll('.media-slide'));
    const mPrev = document.querySelector('.media-prev');
    const mNext = document.querySelector('.media-next');

    let mIndex = 0;
    let mTimer = null;
    let mSlidesPerView = 1;
    let mStride = 0;

    function mUpdate() {
      const wrapper = mediaTrack.parentElement;
      const slideWidth = mSlides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(mediaTrack).gap) || 0;
      mSlidesPerView = Math.max(1, Math.floor(wrapper.clientWidth / (slideWidth + gap)));
      mStride = slideWidth + gap;
      const maxIndex = Math.max(0, mSlides.length - mSlidesPerView);
      mIndex = Math.max(0, Math.min(mIndex, maxIndex));
      mediaTrack.style.transform = `translateX(${-mIndex * mStride}px)`;
    }

    function mGoTo(i) {
      const maxIndex = Math.max(0, mSlides.length - mSlidesPerView);
      const cycle = maxIndex + 1;
      if (cycle <= 0) { mIndex = 0; }
      else {
        mIndex = ((i % cycle) + cycle) % cycle; // wrap-around
      }
      mUpdate();
      mRestartAutoplay();
    }

    function mNextSlide() { mGoTo(mIndex + 1); }
    function mPrevSlide() { mGoTo(mIndex - 1); }

    function mAutoplay() { mTimer = setInterval(mNextSlide, 3000); }
    function mRestartAutoplay() { clearInterval(mTimer); mAutoplay(); }

    function mOnResize() { mUpdate(); }

    mUpdate();
    mAutoplay();

    if (mNext) mNext.addEventListener('click', mNextSlide);
    if (mPrev) mPrev.addEventListener('click', mPrevSlide);
    window.addEventListener('resize', mOnResize);
  }

  // ----------------- Back to Top Button -----------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    // Show/hide on scroll
    const showThreshold = 200; // px
    function checkScroll() {
      if (window.scrollY > showThreshold) backToTopBtn.classList.add('show');
      else backToTopBtn.classList.remove('show');
    }
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Initialize
    checkScroll();
    window.addEventListener('scroll', checkScroll);
  }
});