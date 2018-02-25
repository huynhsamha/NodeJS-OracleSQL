const fs = require('fs');
const path = require('path');

const data = {
  JOBS:
    fs.readFileSync(path.join(__dirname, './CREATE-TRIGGERS-JOBS.sql')).toString(),

  DEPARTMENTS:
    fs.readFileSync(path.join(__dirname, './CREATE-TRIGGERS-DEPARTMENTS.sql')).toString(),

  EMPLOYEES:
    fs.readFileSync(path.join(__dirname, './CREATE-TRIGGERS-EMPLOYEES.sql')).toString()
};

module.exports = String().concat(
  data.JOBS,
  data.EMPLOYEES,
  data.DEPARTMENTS
);
