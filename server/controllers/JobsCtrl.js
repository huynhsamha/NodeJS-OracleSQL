import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const insert = async (job, cb) => {
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
        '${job.job_title}',
        ${parseFloat(job.min_salary)},
        ${parseFloat(job.max_salary)}
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

export default {
  insert,
  findAll,
  findOneById,
  updateOneById
};
