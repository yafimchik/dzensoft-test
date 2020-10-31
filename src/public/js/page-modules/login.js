let btnLogin;
window.onload = () => {
  btnLogin = document.querySelector('button.btn-login');
  btnLogin.addEventListener('click', () => {
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
