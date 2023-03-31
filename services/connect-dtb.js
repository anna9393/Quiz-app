const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'quiz',
    password: 'password'
});

module.exports = conn;