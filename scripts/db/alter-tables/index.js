const fs = require('fs');
const path = require('path');

const data = {
  EMPLOYEES:
    fs.readFileSync(path.join(__dirname, './ALTER-TABLE-EMPLOYEES.sql')).toString(),

  DEPARTMENTS:
    fs.readFileSync(path.join(__dirname, './ALTER-TABLE-DEPARTMENTS.sql')).toString()
};

module.exports = String().concat(
  data.EMPLOYEES,
  data.DEPARTMENTS
);
