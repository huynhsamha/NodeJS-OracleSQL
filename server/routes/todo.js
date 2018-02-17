import express from 'express';

const router = express.Router();

import TodoCtrl from '../controllers/TodoCtrl';


router.get('/create-sequence', (req, res, next) => {
  TodoCtrl.createSequence((err) => {
    if (err) { console.log(err); return res.send(err); }
    res.send('Create sequence Todo successfully');
  });
});

router.get('/create-table', (req, res, next) => {
  TodoCtrl.createTable((err) => {
    if (err) { console.log(err); return res.send(err); }
    res.send('Create table Todo successfully');
  });
});


router.get('/', (req, res, next) => {
  TodoCtrl.getAll((err, data) => {
    if (err) { console.log(err); return res.send(err); }
    res.send(data);
  });
});

router.post('/', (req, res, next) => {
  const todo = req.body;
  console.log(todo);
  TodoCtrl.insert(todo, (err) => {
    if (err) { console.log(err); return res.send(err); }
    res.send('Created OK');
  });
});


module.exports = router;
