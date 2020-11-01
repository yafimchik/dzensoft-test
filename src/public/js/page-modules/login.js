let form;
window.onload = () => {
  form = document.querySelector('form.login');
  form.addEventListener('submit', () => {
    if (checkFormValidity()) {
      const body = {
        username: document.querySelector('#input-username').value.trim(),
        password: document.querySelector('#input-password').value,
      };
      httpSend('/api/users/login', 'post', body, (resultPromise) => {
        resultPromise.then((token) => {
          if (token) {
            window.location.href = '/admin';
          }
        });
      }, showError);
    }
  });
};
