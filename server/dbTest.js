import Db from './dbConnect';

Db.CreatePool('FirstPool')
.then(pool => {
  console.log(`${pool.poolAlias} has been created`);
  pool.getConnection((err, conn) => {
    if (err) console.log(err);
    else {
      console.log('Connection is OK');
      console.log(pool.poolAlias);
      Db.ClosePool(pool.poolAlias)
        .then(() => console.log(`${pool.poolAlias} was closed`))
        .catch(err => console.log(err));
    }
  });
})
.catch(err => console.log(err))
