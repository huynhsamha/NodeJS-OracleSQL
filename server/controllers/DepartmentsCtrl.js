import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Department from './../models/Department';

const insert = async (department = new Department(), cb) => {
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
        :department_name,
        :manager_id
      )
      RETURNING department_id INTO :department_id`;

    const params = {
      department_name: department.department_name,
      manager_id: department.manager_id,
      department_id: {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
      }
    };

    const res = await conn.execute(sql, params);
    console.log(res);

    if (res.rowsAffected == 1) {
      department.department_id = res.outBinds.department_id[0];
      cb(null, { created: true, row: department });
    } else {
      cb(null, { created: false });
    }

  } catch (err) {
    console.log(err);
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

const updateOneById = async (id, department = new Department(), cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();

    const sql_update = department.getSQL_update();
    const sql = `UPDATE DEPARTMENTS SET ${sql_update} where department_id=${id}`;
    console.log(sql);

    const res = await conn.execute(sql);
    console.log(res);

    if (res.rowsAffected == 1) {
      cb(null, { updated: true });
    } else {
      cb(null, { updated: false });
    }

  } catch (err) {
    cb(err);
  }
};


const deleteOneById = async (id, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql = `DELETE FROM DEPARTMENTS where department_id=${id}`;

    const res = await conn.execute(sql);
    console.log(res);

    if (res.rowsAffected == 1) {
      cb(null, { deleted: true });
    } else {
      cb(null, { deleted: false });
    }

  } catch (err) {
    cb(err);
  }
};

export default {
  insert,
  findAll,
  findOneById,
  updateOneById,
  deleteOneById
};
