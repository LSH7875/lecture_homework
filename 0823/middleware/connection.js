const mysql = require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:"hw0823"

})

module.exports = connection;