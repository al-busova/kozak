export function initForm({ onSuccess }) {
  const form = document.querySelector('.consultation__form');
  const nameInput = document.getElementById('userName');
  const telInput = document.getElementById('userTel');
  const btnSend = form.querySelector('.consultation__btn');
  const nameError = document.getElementById('nameError');
  const telError = document.getElementById('telError');

  const telRegex = /^\+380\d{9}$/;

  function validate(showErrors = false) {
    let isValid = true;

    if (nameInput.value.trim() === '') {
      if (showErrors) nameError.textContent = "Введіть ім'я";
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    if (!telRegex.test(telInput.value.trim())) {
      if (showErrors) telError.textContent = 'Формат: +380XXXXXXXXX';
      isValid = false;
    } else {
      telError.textContent = '';
    }

    return isValid;
  }

  nameInput.addEventListener('input', () => validate());
  telInput.addEventListener('input', () => validate());

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isValid = validate(true); // 🔥 показуємо помилки

    if (!isValid) return;

    const data = {
      name: nameInput.value,
      tel: telInput.value,
    };

    localStorage.setItem('formData', JSON.stringify(data));

    onSuccess();
  });
}
