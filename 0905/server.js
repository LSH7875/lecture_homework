const express = require('express');
const app = express();
const ws = require("./network");
port=3000;
app.get('/',(req,res)=>{
    res.send("ssssss")
})
ws('8080');
app.listen(port, ()=>{
    console.log( `server port is ${port} `)
})