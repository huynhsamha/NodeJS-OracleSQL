$(() => {
  $('#btn-find-one-todo').click(() => {
    const id = $('#id-todo').val();
    console.log(id);
    window.location.href = `/api/todo/${id}`;
  });
});
