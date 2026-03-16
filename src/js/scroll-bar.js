export function initTableScrollbar() {
  document
    .querySelectorAll('.subscriptions__scroll-wrapper')
    .forEach(wrapper => {
      const area = wrapper.querySelector('.js-scroll-area');
      const bar = wrapper.querySelector('.js-scrollbar');
      const thumb = wrapper.querySelector('.subscriptions-scrollbar__thumb');

      if (!area || !bar || !thumb) return;

      const update = () => {
        const maxScroll = area.scrollWidth - area.clientWidth;
        const maxMove = bar.clientWidth - thumb.clientWidth;

        if (maxScroll <= 0) {
          bar.style.display = 'none';
          return;
        }

        bar.style.display = '';
        thumb.style.transform = `translateX(${(area.scrollLeft / maxScroll) * maxMove}px)`;
      };

      area.addEventListener('scroll', update);
      window.addEventListener('resize', update);

      thumb.addEventListener('pointerdown', e => {
        const startX = e.clientX;
        const startScroll = area.scrollLeft;

        const maxScroll = area.scrollWidth - area.clientWidth;
        const maxMove = bar.clientWidth - thumb.clientWidth;

        const move = e => {
          const dx = e.clientX - startX;
          area.scrollLeft = startScroll + (dx / maxMove) * maxScroll;
        };

        const up = () => {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      });

      update();
    });
}
// export function initTableScrollbar() {
//   const wrappers = document.querySelectorAll('.subscriptions__scroll-wrapper');

//   wrappers.forEach(wrapper => {
//     const scrollArea = wrapper.querySelector('.js-scroll-area');
//     const scrollbar = wrapper.querySelector('.js-scrollbar');
//     const thumb = wrapper.querySelector('.subscriptions-scrollbar__thumb');

//     if (!scrollArea || !scrollbar || !thumb) return;

//     function updateScrollbar() {
//       const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;

//       if (maxScroll <= 0) {
//         thumb.style.transform = 'translateX(0)';
//         return;
//       }

//       const progress = scrollArea.scrollLeft / maxScroll;
//       const maxTranslate = scrollbar.offsetWidth - thumb.offsetWidth;

//       thumb.style.transform = `translateX(${progress * maxTranslate}px)`;
//     }

//     scrollArea.addEventListener('scroll', updateScrollbar);
//     window.addEventListener('resize', updateScrollbar);

//     let isDragging = false;
//     let startX = 0;
//     let startScroll = 0;

//     thumb.addEventListener('pointerdown', e => {
//       isDragging = true;
//       startX = e.clientX;
//       startScroll = scrollArea.scrollLeft;
//       thumb.setPointerCapture(e.pointerId);
//     });

//     window.addEventListener('pointermove', e => {
//       if (!isDragging) return;

//       const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
//       const maxTranslate = scrollbar.offsetWidth - thumb.offsetWidth;

//       const deltaX = e.clientX - startX;
//       scrollArea.scrollLeft = startScroll + (deltaX / maxTranslate) * maxScroll;
//     });

//     window.addEventListener('pointerup', () => {
//       isDragging = false;
//     });

//     updateScrollbar();
//   });
// }
