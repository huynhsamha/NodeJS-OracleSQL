import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

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

const findAll = async (cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const res = await conn.execute('select * from Todo');
    console.log(res);
    cb(null, res.rows);

  } catch (err) {
    cb(err);
  }
};

const findOneById = async (id, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql = `select * from Todo where id=${id}`;
    const res = await conn.execute(sql);
    console.log(res);
    cb(null, res.rows[0]);

  } catch (err) {
    cb(err);
  }
};

const updateOneById = async (id, todo, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();

    const columns = [];
    if (todo.title && todo.title != '')
      columns.push(`title='${todo.title}'`);
    if (todo.content && todo.content != '')
      columns.push(`content='${todo.content}'`);
    if (todo.date_start && todo.date_start != '')
      columns.push(`date_start=to_date(${todo.date_start}, 'yyyy-mm-dd')`);
    if (todo.date_end && todo.date_end != '')
      columns.push(`date_end=to_date(${todo.date_end}, 'yyyy-mm-dd')`);

    const sql = `update Todo set ${columns.join(',')} where id=${id}`;
    console.log(sql);

    const res = await conn.execute(sql);
    console.log(res);
    cb(null, res.rowsAffected);

  } catch (err) {
    cb(err);
  }
};

export default {
  createSequence,
  createTable,
  insert,
  findAll,
  findOneById,
  updateOneById
};
