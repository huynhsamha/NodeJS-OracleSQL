class Employee {

  constructor() {
    this.employee_id = 0;
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.phone = 0;
    this.hire_date = new Date();
    this.job_id = 0;
    this.salary = 0;
    this.manager_id = 0;
    this.department_id = 0;
    this.created_at = new Date().getTime();
    this.updated_at = new Date().getTime();
  }

}

export default Employee;
