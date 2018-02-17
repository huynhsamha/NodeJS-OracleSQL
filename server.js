/**
 * Babel ES6 to ES5
 */
require('babel-register');
require('babel-polyfill');

/**
 * Run file .env to set environment variables
 */
require('dotenv').config();

/**
 * Kill process after Ctrl+C in terminal,
 * when use node-oracle, port run is not killed
 * this is useful for development
 */
process.on('SIGINT',function(){
  process.exit(0);
});

/**
 * Your app here
 */
require('./server/app');
