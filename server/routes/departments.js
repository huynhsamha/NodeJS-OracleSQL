import express from 'express';
import lowerKeys from 'lowercase-keys-object';

const router = express.Router();

import Department from './../models/Department';
import DepartmentsCtrl from '../controllers/DepartmentsCtrl';

router.get('/', (req, res, next) => {
  DepartmentsCtrl.findAll((err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ data });
  });
});

router.post('/', (req, res, next) => {
  const data = req.body;
  const department = new Department(lowerKeys(data));
  console.log(data);
  console.log(department);
  if (!department.canInsert()) {
    return res.status(400).send({ message: 'Bad Request: Department created is not valid to insert' });
  }
  DepartmentsCtrl.insert(department, (err, ans = { created: false, row: {} }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (ans.created) {
      return res.status(201).send({ message: 'Department is created', row: ans.row });
    }
    res.status(400).send({ message: 'Bad Request: Department created is conflit to insert' });
  });
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10) || null;
  console.log(id);
  if (!id) {
    return res.status(400).send({ message: 'Bad Request: Id is not valid to delete' });
  }
  DepartmentsCtrl.deleteOneById(id, (err, ans = { deleted: false }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (ans.deleted) {
      return res.status(200).send({ message: 'Department is deleted' });
    }
    res.status(400).send({ message: 'Bad Request: Department deleted is conflit' });
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

router.put('/', (req, res, next) => {
  const data = req.body;
  const department = new Department(lowerKeys(data));
  console.log(data);
  console.log(department);
  if (!department.canUpdate()) {
    return res.status(400).send({ message: 'Bad Request: Department is not valid to update' });
  }
  DepartmentsCtrl.updateOneById(department.department_id, department, (err, ans = { updated: false }) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (ans.updated) {
      return res.status(200).send({ message: 'Department is updated' });
    }
    res.status(400).send({ message: 'Bad Request: Department updated is conflict' });
  });
});

module.exports = router;
