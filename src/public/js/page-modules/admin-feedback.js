let btnSave;

window.onload = () => {
  btnSave = document.querySelector('button.btn-save');
  const id = document.querySelector('#input-id').value.trim();
  btnSave.addEventListener('click', () => {
    if (checkFormValidity()) {
      const body = {
        name: document.querySelector('#input-name').value.trim(),
        email: document.querySelector('#input-email').value.trim(),
        phoneNumber: document.querySelector('#input-phone-number').value.trim(),
        title: document.querySelector('#input-title').value.trim(),
        message: document.querySelector('#input-message').value.trim(),
        status: !!document.querySelector('#input-status').checked,
      };
      httpSend(`/api/feedbacks/${id}`, 'put', body, showSaveOkModal, showError);
    }
  });
};
