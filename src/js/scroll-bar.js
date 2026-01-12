export function initTableScrollbar() {
  const scrollArea = document.querySelector('.js-scroll-area');
  const scrollbar = document.querySelector('.js-scrollbar');
  const thumb = scrollbar?.querySelector('.subscriptions-scrollbar__thumb');

  if (!scrollArea || !scrollbar || !thumb) return;

  function updateScrollbar() {
    const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;

    if (maxScroll <= 0) {
      thumb.style.transform = 'translateX(0)';
      return;
    }

    const progress = scrollArea.scrollLeft / maxScroll;
    const maxTranslate = scrollbar.offsetWidth - thumb.offsetWidth;

    thumb.style.transform = `translateX(${progress * maxTranslate}px)`;
  }

  // 🔹 scroll → обновляет бегунок
  scrollArea.addEventListener('scroll', updateScrollbar);
  window.addEventListener('resize', updateScrollbar);

  // 🔹 DRAG бегунка
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;

  thumb.addEventListener('pointerdown', e => {
    isDragging = true;
    startX = e.clientX;
    startScroll = scrollArea.scrollLeft;
    thumb.setPointerCapture(e.pointerId);
  });

  window.addEventListener('pointermove', e => {
    if (!isDragging) return;

    const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
    const maxTranslate = scrollbar.offsetWidth - thumb.offsetWidth;

    const deltaX = e.clientX - startX;
    scrollArea.scrollLeft = startScroll + (deltaX / maxTranslate) * maxScroll;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  // первый апдейт
  updateScrollbar();
}

// function initCustomScrollbar(root) {
//   const scrollArea = root.querySelector('.js-scroll-area');
//   const scrollbar = root.querySelector('.js-scrollbar');
//   const thumb = scrollbar.querySelector('.subscriptions-scrollbar__thumb');

//   let isDragging = false;
//   let startX = 0;
//   let startScroll = 0;

//   const isMobile = () => window.innerWidth < 768;

//   const update = () => {
//     const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;

//     if (maxScroll <= 0) return;

//     const progress = scrollArea.scrollLeft / maxScroll;
//     const maxTranslate = scrollbar.offsetWidth - thumb.offsetWidth;

//     thumb.style.transform = `translateX(${maxTranslate * progress}px)`;

//     scrollbar.setAttribute('aria-valuenow', Math.round(progress * 100));
//   };

//   const onWheel = e => {
//     if (!isMobile()) return;

//     const atStart = scrollArea.scrollLeft === 0;
//     const atEnd =
//       scrollArea.scrollLeft + scrollArea.clientWidth >= scrollArea.scrollWidth;

//     if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) {
//       return;
//     }

//     e.preventDefault();
//     scrollArea.scrollLeft += e.deltaY;
//   };

//   const onPointerDown = e => {
//     isDragging = true;
//     startX = e.clientX;
//     startScroll = scrollArea.scrollLeft;
//     thumb.setPointerCapture(e.pointerId);
//   };

//   const onPointerMove = e => {
//     if (!isDragging) return;

//     const deltaX = e.clientX - startX;
//     const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
//     const maxTranslate = scrollbar.offsetWidth - thumb.offsetWidth;

//     const scrollDelta = (deltaX / maxTranslate) * maxScroll;

//     scrollArea.scrollLeft = startScroll + scrollDelta;
//   };

//   const onPointerUp = () => {
//     isDragging = false;
//   };

//   const enable = () => {
//     scrollArea.addEventListener('scroll', update);
//     scrollArea.addEventListener('wheel', onWheel, {
//       passive: false,
//     });
//     thumb.addEventListener('pointerdown', onPointerDown);
//     window.addEventListener('pointermove', onPointerMove);
//     window.addEventListener('pointerup', onPointerUp);
//     update();
//   };

//   const disable = () => {
//     scrollArea.removeEventListener('scroll', update);
//     scrollArea.removeEventListener('wheel', onWheel);
//     thumb.removeEventListener('pointerdown', onPointerDown);
//     window.removeEventListener('pointermove', onPointerMove);
//     window.removeEventListener('pointerup', onPointerUp);
//   };

//   const onResize = () => {
//     if (isMobile()) {
//       enable();
//     } else {
//       disable();
//     }
//   };

//   onResize();
//   window.addEventListener('resize', onResize);
// }

// export default initCustomScrollbar;
