$(() => {

  /**
   * Find Todo Be One
   */
  $('#find-todo-btn').click(() => {
    const id = $('#find-todo-id').val();
    console.log(id);
    $.ajax({
      url: `/api/todo/${id}`,
      type: 'get'
    })
      .statusCode({
        200: (data) => {
          console.log(data);
          $('#find-todo-info')
            .html(`Title '${data.TITLE}' is found`)
            .append(` <a href="/api/todo/${id}">More</a>`);
        },
        404: () => {
          $('#find-todo-info').html(`ID ${id} not found`);
        }
      });
  });


  /**
   * Update Todo By One
   */
  $('#update-todo-form').submit(function (e) {
    const id = $('#update-todo-id').val();
    console.log(id);
    $(this).attr('action', `/api/todo/${id}`);
    // e.preventDefault();
  });

});
