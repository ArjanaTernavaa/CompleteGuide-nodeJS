const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    namedPlaceholders: true
});


module.exports = pool.promise();    //we get back promises when executing a query