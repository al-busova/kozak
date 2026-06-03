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
