class Job {

  constructor({
    job_id = 0,
    job_title = '',
    min_salary = 0,
    max_salary = 0,
    created_at = new Date().getTime(),
    updated_at = new Date().getTime()
  }) {

    this.job_id = typeof job_id == 'string' ?
      parseFloat(job_id) : job_id;

    this.job_title = job_title;

    this.min_salary = typeof min_salary == 'string' ?
      parseFloat(min_salary) : min_salary;

    this.max_salary = typeof max_salary == 'string' ?
      parseFloat(max_salary) : max_salary;

    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  isValid() {
    return this.job_title.length > 0
    && typeof this.min_salary == 'number'
    && typeof this.max_salary == 'number'
    && this.min_salary > 0
    && this.max_salary > 0;
  }

  getSqlStatement_Set() {
    const columns = [];

    if (this.job_title.length > 0)
      columns.push(`job_title='${this.job_title}'`);
    if (this.min_salary > 0)
      columns.push(`min_salary=${this.min_salary}`);
    if (this.max_salary > 0)
      columns.push(`max_salary=${this.max_salary}`);

    return columns.join(',');
  }
}

export default Job;
