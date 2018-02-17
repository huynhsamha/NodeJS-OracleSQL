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
    cb(err);
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
    cb(err);
  }
};

const insert = async (todo, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql =
      `insert into Todo (id, title, content, date_start, date_end)
        values (
          Todo_Sequence.nextval,
          :title,
          :content,
          to_date(:date_start, 'yyyy-mm-dd'),
          to_date(:date_end, 'yyyy-mm-dd')
        )`;

    const params = [todo.title, todo.content, todo.date_start, todo.date_end];

    const res = await conn.execute(sql, params);
    console.log(res);
    cb();

  } catch (err) {
    cb(err);
  }
};

export default {
  createSequence,
  createTable,
  insert
};
