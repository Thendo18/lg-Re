require('dotenv').config();

const { Pool } = require('pg');

const conn_string = "";

pool = new Pool({

  connectionString: conn_string,
  ssl: {
    rejectUnauthorized: false
  }

    /*user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    */
  })

module.exports = pool;
