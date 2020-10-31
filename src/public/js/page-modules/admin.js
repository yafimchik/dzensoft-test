window.onload = () => {
  const indexes = document.querySelectorAll('th.index');
  indexes.forEach((el) => {
    const indexEl = el;
    indexEl.innerHTML = Number(el.innerHTML) + 1;
  });

  const btnsDelete = document.querySelectorAll('.btn-delete');
  const btnsEdit = document.querySelectorAll('.btn-edit');

  btnsDelete.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.closest('tr.feedback-row').querySelector('td.id').innerHTML.trim();
      fetch(`/api/feedbacks/${id}`, { method: 'delete' }).then(() => {
        btn.parentElement.parentElement.remove();
      });
    });
  });

  btnsEdit.forEach((btn) => {
    const id = btn.closest('tr.feedback-row').querySelector('td.id').innerHTML.trim();
    btn.addEventListener('click', () => {
      document.location.href = `/admin/${id}`;
    });
  });
};
