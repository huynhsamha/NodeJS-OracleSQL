const fs = require('fs');
const path = require('path');

console.log('Running ...');

const data = {
  DropAll: require('./drop-all'),
  CreateSequences: require('./create-sequences'),
  CreateTables: require('./create-tables'),
  CreateTriggers: require('./create-triggers'),
  AlterTables: require('./alter-tables')
};

const sql = String().concat(
  data.DropAll,
  data.CreateSequences,
  data.CreateTables,
  data.CreateTriggers,
  data.AlterTables
);

fs.writeFileSync(path.join(__dirname, './build.sql'), sql);

console.log('./scripts/db/build.js is built complete');
