import './sass/index.scss';
import { mobileMenu } from './js/modile-menu';
import initEmbla from './js/sliders';
import { initTableScrollbar } from './js/scroll-bar';
// import initCustomScrollbar from './js/scroll-bar';

mobileMenu();

initEmbla({
  viewport: '.embla__viewport',
  track: '.embla-progress__track',
  thumb: '.embla-progress__thumb',
  prevBtn: '.embla__btn--prev',
  nextBtn: '.embla__btn--next',
});

initEmbla({
  viewport: '.embla__viewport--2',
  track: '.embla-progress__track--2',
  thumb: '.embla-progress__thumb--2',
  prevBtn: '.embla__btn--prev-2',
  nextBtn: '.embla__btn--next-2',
});
initEmbla({
  viewport: '.embla__viewport--3',
  track: '.embla-progress__track--3',
  thumb: '.embla-progress__thumb--3',
  prevBtn: '.embla__btn--prev-3',
  nextBtn: '.embla__btn--next-3',
});
initTableScrollbar();
// document.querySelectorAll('.subscriptions').forEach(initCustomScrollbar);
