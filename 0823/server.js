const express = require('express');
const app = express();
const router = require('./router')
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')
// const mysql = require('mysql');

app.set('view engine','html');
nunjucks.configure('page',{express:app})

app.use(bodyParser.urlencoded({extended:true}))
// const connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:"hw0823"

// })

// connection.connect();

app.use('/',router)

app.listen(3000,()=>{
    'sesrver 3000 start'
})
