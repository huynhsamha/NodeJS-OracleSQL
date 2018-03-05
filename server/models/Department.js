class Department {

  constructor({
    department_id,
    department_name,
    manager_id,
    created_at = new Date().getTime(),
    updated_at = new Date().getTime()
  }) {

    this.department_id = parseInt(department_id, 10) || null;
    this.department_name = department_name || null;
    this.manager_id = parseInt(manager_id, 10) || null;

    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  canInsert() {
    return this.department_name;
  }

  canUpdate() {
    return this.department_id;
  }

  getSQL_update() {
    const columns = [];

    if (this.department_name)
      columns.push(`department_name='${this.department_name}'`);

    if (this.manager_id)
      columns.push(`manager_id=${this.manager_id}`);

    return columns.join(',');
  }

}

export default Department;
