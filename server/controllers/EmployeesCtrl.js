import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Employee from './../models/Employee';

const insert = async (employee, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql =
      `INSERT INTO EMPLOYEES
      (
        first_name, last_name, email, phone,
        hire_date, job_id, salary,
        manager_id, department_id
      )
      VALUES
      (
        ${employee.first_name},
        ${employee.last_name},
        ${employee.email},
        ${employee.phone},
        TO_DATE(${employee.hire_date}, 'yyyy-mm-dd'),
        ${employee.job_id},
        ${employee.salary},
        ${employee.manager_id},
        ${employee.department_id},
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
    const sql =
      `SELECT emp.*, dep.*
      FROM EMPLOYEES emp
      LEFT JOIN DEPARTMENTS dep
      ON emp.department_id = dep.department_id`;

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
    const sql = `SELECT * FROM EMPLOYEES WHERE employee_id=${id}`;
    const res = await conn.execute(sql);
    console.log(res);
    cb(null, res.rows[0]);

  } catch (err) {
    cb(err);
  }
};

const updateOneById = async (id, employee, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();

    const columns = [];
    if (employee.title && employee.title != '')
      columns.push(`title='${employee.title}'`);

    const sql = `UPDATE EMPLOYEES SET ${columns.join(',')} where employee_id=${id}`;

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
