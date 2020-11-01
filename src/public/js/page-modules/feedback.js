let btnSend;
window.onload = () => {
  btnSend = document.querySelector('button.btn-send');
  btnSend.addEventListener('click', () => {
    if (checkFormValidity()) {
      const body = {
        name: document.querySelector('#input-name').value.trim(),
        email: document.querySelector('#input-email').value.trim(),
        phoneNumber: document.querySelector('#input-phone-number').value.trim(),
        title: document.querySelector('#input-title').value.trim(),
        message: document.querySelector('#input-message').value.trim(),
      };
      httpSend(`/api/feedbacks/`, 'post', body, () => {
        showSendOkModal();
        document.querySelector('form').classList.remove('was-validated');
        document.querySelector('form').reset();
      }, showError);
    }
  });
};
