import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const mobileMenu = () => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const sendBtn = document.querySelector('.consultation__btn');
  const closeSendBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    if (!isMenuOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    enableBodyScroll(document.body);
  });
  mobileMenu.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.target.blur();
      mobileMenu.classList.remove('is-open');
      openMenuBtn.setAttribute('aria-expanded', false);
      enableBodyScroll(document.body);
    }
  });
};
