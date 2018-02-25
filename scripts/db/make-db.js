/**
 * This script will create:
 * drop.sql   : drop all tables and sequences
 * build.sql  : create tables, sequences, procedures, triggers, ...
 * all.sql    : include drop and build
 */

const fs = require('fs');
const path = require('path');

console.log('Running...');

// all necessary sql statements
const data = {
  DropAll: require('./drop-all'),
  CreateSequences: require('./create-sequences'),
  CreateTables: require('./create-tables'),
  CreateTriggers: require('./create-triggers'),
  AlterTables: require('./alter-tables')
};

// sql statements for drop database
const sqlDropDb = data.DropAll;

// sql statement for build database
const sqlBuildDb = String().concat(
  data.CreateSequences,
  data.CreateTables,
  data.CreateTriggers,
  data.AlterTables
);

// sql statements for drop and build
const sqlAll = data.DropAll.concat(sqlBuildDb);

// create script files .sql

fs.writeFileSync(path.join(__dirname, './drop.sql'), sqlDropDb);
console.log('./scripts/db/drop.sql is created completely');

fs.writeFileSync(path.join(__dirname, './build.sql'), sqlBuildDb);
console.log('./scripts/db/build.sql is created completely');

fs.writeFileSync(path.join(__dirname, './all.sql'), sqlAll);
console.log('./scripts/db/all.sql is created completely');

console.log('Done.\n');
console.log('====================================================================');
console.log('Usage:');
console.log('+ drop.sql   : drop all tables and sequences');
console.log('+ build.sql  : create tables, sequences, procedures, triggers, ...');
console.log('+ all.sql    : include drop and build');
console.log('====================================================================');
