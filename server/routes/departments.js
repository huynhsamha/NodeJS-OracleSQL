import express from 'express';

const router = express.Router();

import DepartmentsCtrl from '../controllers/DepartmentsCtrl';


router.get('/', (req, res, next) => {
  DepartmentsCtrl.findAll((err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send(data);
  });
});

router.post('/', (req, res, next) => {
  const department = req.body;
  console.log(department);
  DepartmentsCtrl.insert(department, (err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ message: 'Department is created' });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  DepartmentsCtrl.findOneById(id, (err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (data) res.status(200).send(data);
    else res.status(404).send({ errorMessage: 'Department not found' });
  });
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const department = req.body;
  console.log(id);
  console.log(department);
  if (id != department.department_id) {
    return res.send(new Error('Not match ID department'));
  }
  DepartmentsCtrl.updateOneById(id, department, (err, rowsAffected) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (rowsAffected == 0) res.status(404).send({ errorMessage: 'Department not found' });
    else res.status(200).send({ message: 'Department is updated' });
  });
});

module.exports = router;
