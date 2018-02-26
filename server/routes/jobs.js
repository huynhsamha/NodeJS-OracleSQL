import express from 'express';

const router = express.Router();

import JobsCtrl from '../controllers/JobsCtrl';


router.get('/', (req, res, next) => {
  JobsCtrl.findAll((err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send(data);
  });
});

router.post('/', (req, res, next) => {
  const job = req.body;
  console.log(job);
  JobsCtrl.insert(job, (err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ message: 'Job is created' });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  JobsCtrl.findOneById(id, (err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (data) res.status(200).send(data);
    else res.status(404).send({ errorMessage: 'Job not found' });
  });
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const job = req.body;
  console.log(id);
  console.log(job);
  if (id != job.job_id) {
    return res.send(new Error('Not match ID job'));
  }
  JobsCtrl.updateOneById(id, job, (err, rowsAffected) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (rowsAffected == 0) res.status(404).send({ errorMessage: 'Job not found' });
    else res.status(200).send({ message: 'Job is updated' });
  });
});

module.exports = router;
