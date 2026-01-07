import EmblaCarousel from 'embla-carousel';

function initEmbla({ viewport, track, thumb, options = {} }) {
  const emblaNode = document.querySelector(viewport);
  const progressTrack = document.querySelector(track);
  const progressThumb = document.querySelector(thumb);

  if (!emblaNode || !progressTrack || !progressThumb) return;

  const embla = EmblaCarousel(emblaNode, {
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    ...options,
  });

  const onWheel = e => {
    const canScrollPrev = embla.canScrollPrev();
    const canScrollNext = embla.canScrollNext();

    if ((e.deltaY < 0 && !canScrollPrev) || (e.deltaY > 0 && !canScrollNext)) {
      return;
    }

    e.preventDefault();
    e.deltaY > 0 ? embla.scrollNext() : embla.scrollPrev();
  };

  const updateProgress = () => {
    const progress = embla.scrollProgress(); // 0 → 1
    const trackWidth = progressTrack.offsetWidth;
    const thumbWidth = progressThumb.offsetWidth;
    const maxTranslate = trackWidth - thumbWidth;

    progressThumb.style.transform = `translateX(${maxTranslate * progress}px)`;
  };

  emblaNode.addEventListener('wheel', onWheel, { passive: false });

  embla.on('scroll', updateProgress);
  embla.on('resize', updateProgress);
  embla.on('init', updateProgress);

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
