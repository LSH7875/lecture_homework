const express= require('express');
const app = express();
const PORT= process.env.PORT || 3000;
const BodyParser = require('body-parser');
const {getBlock,getLastBlock,addBlock,getVersion} = require('./non')
app.use(BodyParser.json())
const {Socketinit,addPeer,showPeer} = require('./network')


app.get('/version',(req,res)=>{
    res.send(getVersion())
})
app.get('/blocks',(req,res)=>{
    res.send(getBlock())
})

app.post('/addBlock',(req,res)=>{
    const data = req.body.data
    res.send(addBlock(data))
})














Socketinit();

app.listen(PORT,()=>{
    console.log(`server port ${PORT}`)
});



