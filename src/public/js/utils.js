function httpSend(url, method, body, okCallback, errorCallback) {
  const options = {
    method,
  };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
  }

  let result;

  fetch(url, options).then((res) => {
    const resOk = res.ok;
    result = res.json();
    result.then((json) => {
      if (resOk) {
        if (okCallback) okCallback(result);
      } else if (errorCallback) {
        errorCallback(json.message);
      }
    });
  });
  return result;
}

function setErrorText(text = '') {
  document.querySelector('p.error').innerHTML = text.trim();
}

function showSaveOkModal() {
  $('#modal-success-save').modal('show');
  setTimeout(() => {
    $('#modal-success-save').modal('hide');
    window.location.href = '/admin';
  }, 1500);
}

function showSendOkModal() {
  $('#modal-success-send').modal('show');
  setTimeout(() => {
    $('#modal-success-send').modal('hide');
  }, 1500);
}

function showError(text = '') {
  setErrorText(text);
  $('#modal-error').modal('show');
  setTimeout(() => {
    $('#modal-error').modal('hide');
  }, 2000);
}

function checkFormValidity() {
  const form = document.querySelector('form.needs-validation');
  form.classList.add('was-validated');
  isFormValid = true;
  if (form) {
    isFormValid = form.checkValidity();
  }
  return isFormValid;
}
