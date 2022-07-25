require('dotenv').config();

const { Pool } = require('pg');

const conn_string = "postgres://chkvetvjdgvjck:552eb5a54f77a4b449fe458372cebfa02dfde5fa789f062ed5a4f622b00af59d@ec2-52-204-157-26.compute-1.amazonaws.com:5432/d3gra89pg9acg1";

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
