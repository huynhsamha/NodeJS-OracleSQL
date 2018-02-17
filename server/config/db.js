import oracledb from 'oracledb';
import dbconfig from '../../config/db';

/**
 * Config global oracledb
 */
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

function CreatePool() {
  return oracledb.createPool({
    user: dbconfig.user,
    password: dbconfig.password,
    connectString: dbconfig.connectString,
    poolMin: 5,
    poolMax: 44
  });
}

function ClosePool() {
  return oracledb.getPool().close();
}

export default {
  CreatePool,
  ClosePool
};
