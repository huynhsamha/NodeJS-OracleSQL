import express from 'express';

const router = express.Router();

import TodoCtrl from '../controllers/TodoCtrl';


router.get('/create-sequence', (req, res, next) => {
  TodoCtrl.createSequence((err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send('Create sequence Todo successfully');
  });
});

router.get('/create-table', (req, res, next) => {
  TodoCtrl.createTable((err) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    res.status(200).send('Create table Todo successfully');
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
    res.status(200).send('Created OK');
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  TodoCtrl.findOneById(id, (err, data) => {
    if (err) { console.log(err); return res.status(500).send(err); }
    if (data) res.status(200).send(data);
    else res.status(404).send({ message: 'Todo Not Found' });
  });
});

router.put('/', (req, res, next) => {
});

module.exports = router;
