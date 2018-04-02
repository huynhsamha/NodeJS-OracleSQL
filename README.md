# node-oracle-sql

RESTful API with NodeJS and OracleSQL (node-oracledb)

## `oracledb` - connect to Oracle

```
yarn add oracledb
```

## `dotenv` - config environment variables

```
yarn add dotenv
```

### Config file `.env`
File `.env` in root of project, standing along with package.json
```
ORACLE_USER=[username of your oracle]
ORACLE_PASSWORD=[password for the above user]
```

File `.env` is ignored in `.gitignore`

### Config file `config/db.js`
This file to export the username and password of your database oracle
```js
module.exports = {
  user: process.env.ORACLE_USER || 'YOUR ORACLE USER',
  password: process.env.ORACLE_PASSWORD || 'YOUR ORACLE PASSWORD',
  connectString: 'localhost/XE'
};
```


## Config connect to oracle
In file `server/config/db.js`:
```js
import oracledb from 'oracledb';
import dbconfig from '../../config/db';

/**
 * Config global oracledb
 */
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

function CreatePool() {
  return oracledb.createPool({
    user: dbconfig.user,
    password: dbconfig.password,
    connectString: dbconfig.connectString,
    poolMin: 5,
    poolMax: 44
  });
}

function ClosePool() {
  return oracledb.getPool().close();
}

export default {
  CreatePool,
  ClosePool
};
```
