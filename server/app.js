/**
 * Dependencies
 */
import express from 'express';
import http from 'http';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './config/db';
import index from './routes/index';
import todo from './routes/todo';


/**
 * Configure Database Oracle
 */
db.CreatePool()
  .then((pool) => {
    console.log(`OracleDB: pool ${pool.poolAlias} is created`);
  })
  .catch(err => console.log(err));


/**
 * Configure App Express
 */
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

/**
 * Configure Routes
 */
app.use('/', index);
app.use('/todo/', todo);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});


const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
