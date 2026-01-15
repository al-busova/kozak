import EmblaCarousel from 'embla-carousel';

function initEmbla({ viewport, track, thumb }) {
  const viewportEl = document.querySelector(viewport);
  const trackEl = document.querySelector(track);
  const thumbEl = document.querySelector(thumb);
  // trackEl.offsetWidth === 0;
  if (!viewportEl || !trackEl || !thumbEl) return;

  const embla = EmblaCarousel(viewportEl, {
    dragFree: false,
    loop: false,
    containScroll: 'trimSnaps',
  });

  /* ---------------- sync FROM embla ---------------- */

  const syncThumbFromEmbla = () => {
    const max = trackEl.offsetWidth - thumbEl.offsetWidth;

    thumbEl.style.left = max * embla.scrollProgress() + 'px';
  };

  embla.on('init', syncThumbFromEmbla);
  embla.on('resize', syncThumbFromEmbla);
  embla.on('select', syncThumbFromEmbla);

  /* ---------------- thumb drag ---------------- */

  let isDragging = false;
  let offsetX = 0;

  const maxLeft = () => trackEl.offsetWidth - thumbEl.offsetWidth;

  const onMove = e => {
    if (!isDragging) return;

    const trackRect = trackEl.getBoundingClientRect();
    let left = e.clientX - trackRect.left - offsetX;

    left = Math.max(0, Math.min(maxLeft(), left));
    thumbEl.style.left = left + 'px';
  };

  const stopDrag = () => {
    if (!isDragging) return;

    isDragging = false;
    thumbEl.classList.remove('is-dragging');

    const progress = parseFloat(thumbEl.style.left) / maxLeft();

    embla.scrollToProgress(progress);

    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', stopDrag);
  };

  thumbEl.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;

    const rect = thumbEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;

    thumbEl.classList.add('is-dragging');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopDrag);
  });

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
