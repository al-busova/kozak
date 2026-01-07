import './sass/index.scss';
import EmblaCarousel from 'embla-carousel';

const emblaNode = document.querySelector('.embla__viewport');
const progressThumb = document.querySelector('.embla-progress__thumb');
const progressTrack = document.querySelector('.embla-progress__track');
const embla = EmblaCarousel(emblaNode, {
  align: 'start',
  containScroll: 'trimSnaps',
  dragFree: false,
  loop: false,
});

const onWheel = e => {
  const canScrollPrev = embla.canScrollPrev();
  const canScrollNext = embla.canScrollNext();

  if ((e.deltaY < 0 && !canScrollPrev) || (e.deltaY > 0 && !canScrollNext)) {
    return; // отдаём scroll странице
  }

  e.preventDefault();

  if (e.deltaY > 0) {
    embla.scrollNext();
  } else {
    embla.scrollPrev();
  }
};

emblaNode.addEventListener('wheel', onWheel, { passive: false });

const updateProgress = () => {
  const progress = embla.scrollProgress(); // 0 → 1
  const trackWidth = progressTrack.offsetWidth;
  const thumbWidth = progressThumb.offsetWidth;
  const maxTranslate = trackWidth - thumbWidth;
  const translateX = maxTranslate * progress;

  progressThumb.style.transform = `translateX(${translateX}px)`;
};

embla.on('scroll', updateProgress);
embla.on('resize', updateProgress);
embla.on('init', updateProgress);

const emblaNode2 = document.querySelector('.embla__viewport--2');
const progressThumb2 = document.querySelector('.embla-progress__thumb--2');
const progressTrack2 = document.querySelector('.embla-progress__track--2');
const embla2 = EmblaCarousel(emblaNode2, {
  align: 'start',
  containScroll: 'trimSnaps',
  dragFree: false,
  loop: false,
});

const onWheel2 = e => {
  const canScrollPrev = embla2.canScrollPrev();
  const canScrollNext = embla2.canScrollNext();

  if ((e.deltaY < 0 && !canScrollPrev) || (e.deltaY > 0 && !canScrollNext)) {
    return; // отдаём scroll странице
  }

  e.preventDefault();

  if (e.deltaY > 0) {
    embla2.scrollNext();
  } else {
    embla2.scrollPrev();
  }
};

emblaNode2.addEventListener('wheel', onWheel2, { passive: false });

const updateProgress2 = () => {
  const progress = embla2.scrollProgress(); // 0 → 1
  const trackWidth = progressTrack2.offsetWidth;
  const thumbWidth = progressThumb2.offsetWidth;
  const maxTranslate = trackWidth - thumbWidth;
  const translateX = maxTranslate * progress;

  progressThumb2.style.transform = `translateX(${translateX}px)`;
};

embla2.on('scroll', updateProgress2);
embla2.on('resize', updateProgress2);
embla2.on('init', updateProgress2);

(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

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
