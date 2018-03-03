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
  if (!job.isValid()) {
    return res.status(400).send({ message: 'Bad Request' });
  }
  JobsCtrl.insert(job, (err, { created = false, row }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (created) {
      return res.status(201).send({ message: 'Job is created', row });
    }
    res.status(409).send({ message: 'Job created is conflit' });
  });
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  console.log(id);
  if (!id || typeof id != 'number') {
    return res.status(400).send({ message: 'Bad Request' });
  }
  JobsCtrl.deleteOneById(id, (err, { deleted = false }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (deleted) {
      return res.status(200).send({ message: 'Job is deleted' });
    }
    res.status(409).send({ message: 'Job deleted is conflit' });
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
  if (!job.job_id) {
    return res.status(400).send({ message: 'Bad Request' });
  }
  JobsCtrl.updateOneById(job.job_id, job, (err, { updated = false }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (updated) {
      return res.status(200).send({ message: 'Job is updated' });
    }
    res.status(409).send({ message: 'Job updated is conflict' });
  });
});

module.exports = router;
