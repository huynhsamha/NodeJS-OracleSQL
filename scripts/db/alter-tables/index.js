const fs = require('fs');
const path = require('path');

const data = {
  EMPLOYEES:
    fs.readFileSync(path.join(__dirname, './ALTER-TABLE-EMPLOYEES.sql')).toString()
};

module.exports = String().concat(data.EMPLOYEES);
