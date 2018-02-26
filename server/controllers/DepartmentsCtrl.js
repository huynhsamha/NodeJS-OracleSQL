import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const insert = async (department, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql =
      `INSERT INTO DEPARTMENTS
      (
        department_name, manager_id
      )
      VALUES
      (
        ${department.department_name},
        ${department.manager_id}
      )`;

    const res = await conn.execute(sql);
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
    const sql = 'SELECT * FROM DEPARTMENTS';

    const res = await conn.execute(sql);
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
    const sql = `SELECT * FROM DEPARTMENTS WHERE department_id=${id}`;
    const res = await conn.execute(sql);
    console.log(res);
    cb(null, res.rows[0]);

  } catch (err) {
    cb(err);
  }
};

const updateOneById = async (id, department, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();

    const columns = [];
    if (department.title && department.title != '')
      columns.push(`title='${department.title}'`);

    const sql = `UPDATE DEPARTMENTS SET ${columns.join(',')} where department_id=${id}`;

    const res = await conn.execute(sql);
    console.log(res);
    cb(null, res.rowsAffected);

  } catch (err) {
    cb(err);
  }
};

export default {
  insert,
  findAll,
  findOneById,
  updateOneById
};
