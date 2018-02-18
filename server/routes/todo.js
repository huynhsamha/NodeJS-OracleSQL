import express from 'express';

const router = express.Router();

import TodoCtrl from '../controllers/TodoCtrl';


router.get('/create-sequence', (req, res, next) => {
  TodoCtrl.createSequence((err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ message: 'Create sequence Todo successfully' });
  });
});

router.get('/create-table', (req, res, next) => {
  TodoCtrl.createTable((err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ message: 'Create table Todo successfully' });
  });
});


router.get('/', (req, res, next) => {
  TodoCtrl.findAll((err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send(data);
  });
});

router.post('/', (req, res, next) => {
  const todo = req.body;
  console.log(todo);
  TodoCtrl.insert(todo, (err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send({ message: 'Todo is created' });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  TodoCtrl.findOneById(id, (err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (data) res.status(200).send(data);
    else res.status(404).send({ errorMessage: 'Todo Not Found' });
  });
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const todo = req.body;
  console.log(id);
  console.log(todo);
  if (id != todo.id) {
    return res.send(new Error('Not match ID todo'));
  }
  TodoCtrl.updateOneById(id, todo, (err, rowsAffected) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (rowsAffected == 0) res.status(404).send({ errorMessage: 'Todo not found' });
    else res.status(200).send({ message: 'Todo is updated' });
  });
});

module.exports = router;
