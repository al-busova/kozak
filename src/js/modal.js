export function initModal(modal) {
  const closeBtn = modal.querySelector('.modal__btn-close');

  function openModal() {
    modal.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  // кнопка
  closeBtn.addEventListener('click', closeModal);

  // клік по фону
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // 👇 повертаємо функцію відкриття
  return {
    openModal,
  };
}
