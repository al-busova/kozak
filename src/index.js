import './sass/index.scss';
import { mobileMenu } from './js/modile-menu';
import initEmbla from './js/sliders';
import { initTableScrollbar } from './js/scroll-bar';

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
const tables = document.querySelectorAll('.subscriptions__simple-table');

tables.forEach(table => {
  let activeRowHeader = null;
  let activeColHeader = null;

  table.addEventListener('mouseover', e => {
    const cell = e.target.closest('td');
    if (!cell || !table.contains(cell)) return;

    const row = cell.parentElement;
    const cellIndex = cell.cellIndex;

    // 🔹 очищаємо попередні активні
    if (activeRowHeader) activeRowHeader.classList.remove('is-active');
    if (activeColHeader) activeColHeader.classList.remove('is-active');

    // 🔹 новий row header
    const rowHeader = row.querySelector('th');
    if (rowHeader) {
      rowHeader.classList.add('is-active');
      activeRowHeader = rowHeader;
    }

    // 🔹 новий col header
    const colHeader = table.querySelector(
      `thead th:nth-child(${cellIndex + 1})`
    );
    if (colHeader) {
      colHeader.classList.add('is-active');
      activeColHeader = colHeader;
    }
  });

  table.addEventListener('mouseleave', () => {
    if (activeRowHeader) activeRowHeader.classList.remove('is-active');
    if (activeColHeader) activeColHeader.classList.remove('is-active');

    activeRowHeader = null;
    activeColHeader = null;
  });
});
