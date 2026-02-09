import EmblaCarousel from 'embla-carousel';

function initEmbla({ viewport, track, thumb, prevBtn, nextBtn }) {
  const viewportEl = document.querySelector(viewport);
  const trackEl = document.querySelector(track);
  const thumbEl = document.querySelector(thumb);
  const prevBtnEl = prevBtn ? document.querySelector(prevBtn) : null;
  const nextBtnEl = nextBtn ? document.querySelector(nextBtn) : null;
  // trackEl.offsetWidth === 0;
  if (!viewportEl || !trackEl || !thumbEl) return;

  const embla = EmblaCarousel(viewportEl, {
    dragFree: false,
    loop: false,
    containScroll: 'trimSnaps',
  });

  /* ---------------- sync FROM embla ---------------- */

  const syncThumbFromEmbla = () => {
    const max = Math.max(0, trackEl.offsetWidth - thumbEl.offsetWidth);
    thumbEl.style.left = max * embla.scrollProgress() + 'px';
  };

  embla.on('init', syncThumbFromEmbla);
  embla.on('resize', syncThumbFromEmbla);
  embla.on('select', syncThumbFromEmbla);
  embla.on('scroll', syncThumbFromEmbla);

  /* ---------------- prev/next buttons ---------------- */

  const updateNav = () => {
    if (!prevBtnEl && !nextBtnEl) return;
    if (prevBtnEl) prevBtnEl.disabled = !embla.canScrollPrev();
    if (nextBtnEl) nextBtnEl.disabled = !embla.canScrollNext();
  };

  if (prevBtnEl) {
    prevBtnEl.addEventListener('click', () => embla.scrollPrev());
  }
  if (nextBtnEl) {
    nextBtnEl.addEventListener('click', () => embla.scrollNext());
  }

  embla.on('init', updateNav);
  embla.on('select', updateNav);
  embla.on('reInit', updateNav);

  /* ---------------- thumb drag ---------------- */

  let isDragging = false;
  let offsetX = 0;

  const maxLeft = () => Math.max(0, trackEl.offsetWidth - thumbEl.offsetWidth);
  const progressFromLeft = left => {
    const max = maxLeft();
    if (max === 0) return 0;
    return left / max;
  };
  const scrollToProgress = progress => {
    const snaps = embla.scrollSnapList();
    if (!snaps.length) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    snaps.forEach((snap, index) => {
      const distance = Math.abs(snap - progress);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    embla.scrollTo(closestIndex);
  };

  const onMove = e => {
    if (!isDragging) return;

    const trackRect = trackEl.getBoundingClientRect();
    let left = e.clientX - trackRect.left - offsetX;

    left = Math.max(0, Math.min(maxLeft(), left));
    thumbEl.style.left = left + 'px';
  };

  const stopDrag = e => {
    if (!isDragging) return;

    isDragging = false;
    thumbEl.classList.remove('is-dragging');

    const progress = progressFromLeft(parseFloat(thumbEl.style.left) || 0);

    scrollToProgress(progress);

    if (e && typeof e.pointerId === 'number') {
      thumbEl.releasePointerCapture(e.pointerId);
    }

    thumbEl.removeEventListener('pointermove', onMove);
    thumbEl.removeEventListener('pointerup', stopDrag);
    thumbEl.removeEventListener('pointercancel', stopDrag);
  };

  const startDrag = e => {
    e.preventDefault();
    isDragging = true;

    const rect = thumbEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;

    thumbEl.classList.add('is-dragging');

    thumbEl.setPointerCapture(e.pointerId);
    thumbEl.addEventListener('pointermove', onMove);
    thumbEl.addEventListener('pointerup', stopDrag);
    thumbEl.addEventListener('pointercancel', stopDrag);
  };

  thumbEl.addEventListener('pointerdown', startDrag);

  return embla;
}

export default initEmbla;

// import Siema from 'siema';

// const slider = new Siema({
//   selector: '.siema',
//   duration: 300,
//   easing: 'ease-out',
//   perPage: 1,
//   draggable: true,
//   multipleDrag: true,
//   threshold: 20,
//   loop: false,
//   onChange: () => {
//     // принудительный snap
//     slider.goTo(slider.currentSlide);
//   },
// });

// let isWheeling = false;

// const onWheel = e => {
//   const atStart = slider.currentSlide === 0;
//   const atEnd = slider.currentSlide === slider.innerElements.length - 1;

//   // если на краю — отдать scroll странице
//   if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) {
//     return;
//   }

//   e.preventDefault();

//   if (isWheeling) return;
//   isWheeling = true;

//   if (e.deltaY > 0) {
//     slider.next();
//   } else {
//     slider.prev();
//   }

//   setTimeout(() => {
//     isWheeling = false;
//   }, 350);
// };

// slider.selector.addEventListener('wheel', onWheel, {
//   passive: false, // ❗ обязательно
// });

// slider.onChange = () => {
//   if (slider.currentSlide === slider.innerElements.length - 2) {
//     slider.prev();
//   }
// };
