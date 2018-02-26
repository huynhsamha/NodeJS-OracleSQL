import express from 'express';

const router = express.Router();

import EmployeesCtrl from '../controllers/EmployeesCtrl';


router.get('/', (req, res, next) => {
  EmployeesCtrl.findAll((err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send(data);
  });
});

router.post('/', (req, res, next) => {
  const employee = req.body;
  console.log(employee);
  EmployeesCtrl.insert(employee, (err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ message: 'Employee is created' });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  EmployeesCtrl.findOneById(id, (err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (data) res.status(200).send(data);
    else res.status(404).send({ errorMessage: 'Employee not found' });
  });
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const employee = req.body;
  console.log(id);
  console.log(employee);
  if (id != employee.employee_id) {
    return res.send(new Error('Not match ID employee'));
  }
  EmployeesCtrl.updateOneById(id, employee, (err, rowsAffected) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (rowsAffected == 0) res.status(404).send({ errorMessage: 'Employee not found' });
    else res.status(200).send({ message: 'Employee is updated' });
  });
});

module.exports = router;
