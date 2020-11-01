$('.toast').toast();

const forms = document.getElementsByClassName('needs-validation');

// Loop over them and prevent submission
Array.prototype.filter.call(forms, (form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('was-validated');
  }, false);
});
