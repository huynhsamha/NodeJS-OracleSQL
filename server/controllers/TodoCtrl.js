import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';

const createSequence = async (cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const res = await conn.execute('create sequence Todo_Sequence');
    console.log(res);
    cb();
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

const createTable = async (cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql = fs.readFileSync(path.join(__dirname, '../scripts/create-table-todo.sql')).toString();
    const res = await conn.execute(sql);
    console.log(res);
    cb();
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

const insert = async (todo, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

export default {
  createSequence,
  createTable
};
