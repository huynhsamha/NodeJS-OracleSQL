import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Job from './../models/Job';

const insert = async (job = new Job(), cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql =
      `INSERT INTO JOBS
      (
        job_title, min_salary, max_salary
      )
      VALUES
      (
        :job_title,
        :min_salary,
        :max_salary
      )
      RETURNING job_id INTO :job_id`;

    const params = {
      job_id: {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
      },
      job_title: job.job_title,
      min_salary: job.min_salary,
      max_salary: job.max_salary
    };

    const res = await conn.execute(sql, params);
    console.log(res);

    if (res.rowsAffected == 1) {
      job.job_id = res.outBinds.job_id[0];
      cb(null, { created: true, row: job });
    } else {
      cb(null, { created: false });
    }

  } catch (err) {
    cb(err);
  }
};

const findAll = async (cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql = 'SELECT * FROM JOBS';

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
    const sql = `SELECT * FROM JOBS WHERE job_id=${id}`;
    const res = await conn.execute(sql);
    console.log(res);
    cb(null, res.rows[0]);

  } catch (err) {
    cb(err);
  }
};

const updateOneById = async (id, job, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();

    const columns = [];
    if (job.title && job.title != '')
      columns.push(`title='${job.title}'`);

    const sql = `UPDATE JOBS SET ${columns.join(',')} where job_id=${id}`;

    const res = await conn.execute(sql);
    console.log(res);
    cb(null, res.rowsAffected);

  } catch (err) {
    cb(err);
  }
};

const deleteOneById = async (id, cb) => {
  const pool = oracledb.getPool();
  try {
    const conn = await pool.getConnection();
    const sql = `DELETE FROM JOBS where job_id=${id}`;

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
