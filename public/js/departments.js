$(() => {

  const datatable_departments = $('#table-departments').DataTable({
    ajax: '/api/departments',
    columnDefs: [
      {
        targets: 0,
        data: 'DEPARTMENT_ID',
        render(data, type, row, meta) {
          return `<div class="text-center">${data}</div>`;
        }
      },
      {
        targets: 1,
        data: 'DEPARTMENT_NAME'
      },
      {
        targets: 2,
        data: 'MANAGER_ID',
        render(data, type, row, meta) {
          return `<div class="text-center">${data || 'null'}</div>`;
        }
      },
      {
        targets: 3,
        data: 'MANAGER_ID',
        render(data, type, row, meta) {
          return `<div class="text-center">${data || 'null'}</div>`;
        }
      },
      {
        targets: 4,
        defaultContent:
          `<div class="text-center sha-dt-icons">
            <button class="btn btn-success btn-edit-department">
              <span><i class="fa fa-edit"></i></span>
            </button>
            <button class="btn btn-danger btn-remove-department">
              <span><i class="fa fa-trash"></i></span>
            </button>
          </div>`
      }
    ],
    lengthMenu: [[10, 20, 25, 50, -1], [10, 20, 25, 50, 'All']]
  });

  // On edit department
  let rowModalEditDepartment = null;
  $('#table-departments tbody').on('click', 'button.btn-edit-department', function () {
    /**
     * DataTables.net - API get row
     */
    rowModalEditDepartment = datatable_departments.row($(this).parents('tr'));
    const data = rowModalEditDepartment.data();
    console.log(data);
    $('#edit-department-name').val(data.DEPARTMENT_NAME);
    $('#edit-department-manager-id').val(data.MANAGER_ID);
    $('#modal-edit-department').modal('show');
  });

  $('#btn-edit-department').click(() => {
    const data = rowModalEditDepartment.data();
    const department = {
      DEPARTMENT_NAME: $('#edit-department-name').val() || null,
      MANAGER_ID: $('#edit-department-manager-id').val() || null
    };
    if (department.DEPARTMENT_NAME) data.DEPARTMENT_NAME = department.DEPARTMENT_NAME;
    if (department.MANAGER_ID) data.MANAGER_ID = department.MANAGER_ID;
    console.log(department);
    console.log(data);

    updateDepartment(data, rowModalEditDepartment);
  });

  function updateDepartment(data, row) {
    $.confirm({
      buttons: {
        okSuccess: { text: 'OK', btnClass: 'btn-success' },
        okError: { text: 'OK', btnClass: 'btn-danger' }
      },
      content() {
        const self = this;
        return $.ajax({
          url: '/api/departments',
          type: 'put',
          data
        })
          .statusCode({
            400: () => {
              self.setTitle('Warning');
              self.setContent('Invalid id department to update');
              self.setType('red');
              self.buttons.okSuccess.hide();
            },
            200: () => {
              self.setTitle('Notification');
              self.setContent('Update department successfully!');
              self.setType('green');
              self.buttons.okError.hide();
              /**
               * DataTables.net - API update row
               */
              row.data(data).draw();
              // Clear data modal
              $('#edit-department-name').val('');
              $('#edit-department-manager-id').val('');
              $('#modal-edit-department').modal('hide');
              rowModalEditDepartment = null;
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

  // On remove department
  $('#table-departments tbody').on('click', 'button.btn-remove-department', function () {
    /**
     * DataTables.net - API get row
     */
    const row = datatable_departments.row($(this).parents('tr'));
    const data = row.data();
    console.log(data);
    $.confirm({
      title: 'Warning',
      content: `Do you want to remove the department ${data.DEPARTMENT_ID}?<br>
        Name: "${data.DEPARTMENT_NAME}"?`,
      type: 'red',
      columnClass: 'col-md-8',
      buttons: {
        ok: {
          text: 'OK',
          btnClass: 'btn-danger',
          action: () => {
            removeDepartment(data.DEPARTMENT_ID, row);
          }
        },
        cancle: {
          text: 'Cancle',
          btnClass: 'btn-default'
        }
      }
    });
  });

  function removeDepartment(id, row) {
    $.confirm({
      buttons: {
        okSuccess: { text: 'OK', btnClass: 'btn-success' },
        okError: { text: 'OK', btnClass: 'btn-danger' }
      },
      content() {
        const self = this;
        return $.ajax({
          url: `/api/departments/${id}`,
          type: 'delete'
        })
          .statusCode({
            400: () => {
              self.setTitle('Warning');
              self.setContent('Invalid id department to delete');
              self.setType('red');
              self.buttons.okSuccess.hide();
            },
            200: () => {
              self.setTitle('Notification');
              self.setContent('Remove department successfully!');
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

  // On insert department
  $('#btn-insert-department').click(() => {
    const department = {
      department_name: $('#department-name').val(),
      manager_id: $('#department-manager-id').val()
    };
    console.log(department);
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
          url: '/api/departments',
          type: 'post',
          data: department
        })
          .statusCode({
            400: () => {
              self.setTitle('Error');
              self.setContent('Invalid data to insert new department.');
              self.setType('red');
              self.buttons.okSuccess.hide();
            },
            201: (data) => {
              self.setTitle('Notification');
              self.setContent(data.message);
              self.setType('green');
              self.buttons.okError.hide();
              console.log(data);
              insertDepartmentToTable(data.row);
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

  function insertDepartmentToTable(row) {
    /**
     * DataTables.net - API add new row(s)
     *
     * + row.add({}): add a new row
     * + rows.add([{},{}]): add multiple rows
     */
    datatable_departments.row
      .add({
        DEPARTMENT_ID: row.department_id,
        DEPARTMENT_NAME: row.department_name,
        MIN_SALARY: row.min_salary,
        MAX_SALARY: row.max_salary
      })
      .draw(false);

    // Clear data insert department
    $('#department-name').val('');
    $('#department-manager-id').val('');
  }

});
