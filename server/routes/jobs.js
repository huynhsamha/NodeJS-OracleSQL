import express from 'express';
import lowercaseKeys from 'lowercase-keys';

const router = express.Router();

import Job from './../models/Job';
import JobsCtrl from '../controllers/JobsCtrl';

router.get('/', (req, res, next) => {
  JobsCtrl.findAll((err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ data });
  });
});

router.post('/', (req, res, next) => {
  const data = req.body;
  const job = new Job(lowercaseKeys(data));
  console.log(data);
  console.log(job);
  if (!job.canInsert()) {
    return res.status(400).send({ message: 'Bad Request: Job created is not valid to insert' });
  }
  JobsCtrl.insert(job, (err, ans = { created: false, row: {} }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (ans.created) {
      return res.status(201).send({ message: 'Job is created', row: ans.row });
    }
    res.status(400).send({ message: 'Bad Request: Job created is conflit to insert' });
  });
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10) || null;
  console.log(id);
  if (!id) {
    return res.status(400).send({ message: 'Bad Request: Id is not valid to delete' });
  }
  JobsCtrl.deleteOneById(id, (err, ans = { deleted: false }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (ans.deleted) {
      return res.status(200).send({ message: 'Job is deleted' });
    }
    res.status(400).send({ message: 'Bad Request: Job deleted is conflit to delete' });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  JobsCtrl.findOneById(id, (err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (data) res.status(200).send({ data });
    else res.status(404).send({ errorMessage: 'Job not found' });
  });
});

router.put('/', (req, res, next) => {
  const data = req.body;
  const job = new Job(lowercaseKeys(data));
  console.log(data);
  console.log(job);
  if (!job.canUpdate()) {
    return res.status(400).send({ message: 'Bad Request: Job is not valid to update' });
  }
  JobsCtrl.updateOneById(job.job_id, job, (err, ans = { updated: false }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (ans.updated) {
      return res.status(200).send({ message: 'Job is updated' });
    }
    res.status(400).send({ message: 'Bad Request: Job updated is not found or conflict to update' });
  });
});

module.exports = router;
