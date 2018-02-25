require('dotenv').config();

process.on('SIGINT', () => {
  process.exit(0);
});

const oracledb = require('oracledb');
const dbconfig = require('./../../config/db');

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

oracledb.getConnection({
  user: dbconfig.user,
  password: dbconfig.password,
  connectString: dbconfig.connectString
})
  .then((conn) => {
    console.log('Connect DB successfully');
  })
  .catch(err => console.log(err));
