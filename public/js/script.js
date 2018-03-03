$(() => {

  const datatable_jobs = $('#table-jobs').DataTable({
    ajax: '/api/jobs',
    columnDefs: [
      {
        targets: 0,
        data: 'JOB_ID',
        render(data, type, row, meta) {
          return `<div class="text-center">${data}</div>`;
        }
      },
      {
        targets: 1,
        data: 'JOB_TITLE'
      },
      {
        targets: 2,
        data: 'MIN_SALARY',
        render(data, type, row, meta) {
          return `<div class="text-right">$${data}</div>`;
        }
      },
      {
        targets: 3,
        data: 'MAX_SALARY',
        render(data, type, row, meta) {
          return `<div class="text-right">$${data}</div>`;
        }
      },
      {
        targets: 4,
        defaultContent:
          `<div class="text-center sha-dt-icons">
            <button class="btn btn-success btn-edit-job">
              <span><i class="fa fa-edit"></i></span>
            </button>
            <button class="btn btn-danger btn-remove-job">
              <span><i class="fa fa-trash"></i></span>
            </button>
          </div>`
      }
    ],
    lengthMenu: [[10, 20, 25, 50, -1], [10, 20, 25, 50, 'All']]
  });

  // On edit job
  $('#table-jobs tbody').on('click', 'button.btn-edit-job', function () {
    var data = datatable_jobs.row($(this).parents('tr')).data();
    console.log(data);
  });

  // On remove job
  $('#table-jobs tbody').on('click', 'button.btn-remove-job', function () {
    /**
     * DataTables.net - API get row
     */
    const row = datatable_jobs.row($(this).parents('tr'));
    const data = row.data();
    console.log(data);
    $.confirm({
      title: 'Warning',
      content: `Do you want to remove the job ${data.JOB_ID}?<br>
        Title: "${data.JOB_TITLE}"?`,
      type: 'red',
      columnClass: 'col-md-8',
      buttons: {
        ok: {
          text: 'OK',
          btnClass: 'btn-danger',
          action: () => {
            removeJob(data.JOB_ID, row);
          }
        },
        cancle: {
          text: 'Cancle',
          btnClass: 'btn-default'
        }
      }
    });
  });

  function removeJob(id, row) {
    $.confirm({
      buttons: {
        okSuccess: { text: 'OK', btnClass: 'btn-success' },
        okError: { text: 'OK', btnClass: 'btn-danger' }
      },
      content() {
        const self = this;
        return $.ajax({
          url: `/api/jobs/${id}`,
          type: 'delete'
        })
          .statusCode({
            400: () => {
              self.setTitle('Warning');
              self.setContent('Invalid id job to delete');
              self.setType('red');
              self.buttons.okSuccess.hide();
            },
            200: () => {
              self.setTitle('Notification');
              self.setContent('Remove job successfully!');
              self.setType('green');
              self.buttons.okError.hide();
              /**
               * DataTables.net - API remove row
               */
              row.remove().draw();
            },
            500: () => {
              self.setTitle('Error');
              self.setContent('Error on server. Please try again!');
              self.setType('red');
              self.buttons.okSuccess.hide();
            }
          });
      }
    });
  }

  // On insert job
  $('#btn-insert-job').click(() => {
    const job = {
      job_title: $('#job-title').val(),
      min_salary: $('#job-min-salary').val(),
      max_salary: $('#job-max-salary').val()
    };
    console.log(job);
    /**
     * TODO: can check valid data here...
     */
    $.confirm({
      buttons: {
        okSuccess: { text: 'OK', btnClass: 'btn-success' },
        okError: { text: 'OK', btnClass: 'btn-danger' }
      },
      content() {
        const self = this;
        return $.ajax({
          url: '/api/jobs',
          type: 'post',
          data: job
        })
          .statusCode({
            400: () => {
              self.setTitle('Error');
              self.setContent('Invalid data to insert new job.');
              self.setType('red');
              self.buttons.okSuccess.hide();
            },
            201: (data) => {
              self.setTitle('Notification');
              self.setContent(data.message);
              self.setType('green');
              self.buttons.okError.hide();
              console.log(data);
              insertJobToTable(data.row);
            },
            409: (data) => {
              self.setTitle('Notification');
              self.setContent(data.message);
              self.setType('orange');
              self.buttons.okSuccess.hide();
            },
            500: () => {
              self.setTitle('Error');
              self.setContent('Error on server. Please try again!');
              self.setType('red');
              self.buttons.okSuccess.hide();
            }
          });
      }
    });
  });

  function insertJobToTable(row) {
    /**
     * DataTables.net - API add new row(s)
     *
     * + row.add({}): add a new row
     * + rows.add([{},{}]): add multiple rows
     */
    datatable_jobs.row
      .add({
        JOB_ID: row.job_id,
        JOB_TITLE: row.job_title,
        MIN_SALARY: row.min_salary,
        MAX_SALARY: row.max_salary
      })
      .draw(false);
  }

});
