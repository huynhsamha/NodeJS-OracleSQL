class Job {

  constructor({
    job_id,
    job_title,
    min_salary,
    max_salary,
    created_at = new Date().getTime(),
    updated_at = new Date().getTime()
  }) {

    this.job_id = parseInt(job_id, 10) || null;
    this.job_title = job_title || null;
    this.min_salary = parseFloat(min_salary) || null;
    this.max_salary = parseFloat(max_salary) || null;

    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  canInsert() {
    return this.job_title && this.min_salary && this.max_salary && this.min_salary < this.max_salary;
  }

  canUpdate() {
    return this.job_id;
  }

  getSQL_update() {
    const columns = [];

    if (this.job_title)
      columns.push(`job_title='${this.job_title}'`);

    if (this.min_salary)
      columns.push(`min_salary=${this.min_salary}`);

    if (this.max_salary)
      columns.push(`max_salary=${this.max_salary}`);

    return columns.join(',');
  }

}

export default Job;
