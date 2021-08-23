console.log('list 안dp 들어옴')

const connection = require('../../middleware/connection')
connection.connect();


let list = async(req,res)=>{
    console.log('list들어옴')
    // res.send('list')
    let aa;
    let qqq = await connection.query('select id,subject,hit,writer,DATE_FORMAT(date,"%Y-%m-%d") as date FROM board',function(err,results){
        if(err)console.log(err);
        else{
            aa= results;
            console.log('------------result---------',results)
            console.log('qqq')
            console.log(results)
            res.render('./board/index.html',{list:results})
        }
    });
    
}

const write = (req,res)=>{
    console.log('write들어옴')
    res.render('./board/write.html',{mode:0})
}

const writePost = async (req,res)=>{
    console.log('----req------',req.body.subject);
    let write = await connection.query(
        `INSERT INTO board (subject,writer,content) values(
        '${req.body.subject}','${req.body.writer}','${req.body.content}')`
    ,function(err,results){
        if(err)console.log(err);
        console.log('완료')
        res.redirect('/board')
        
    })
    
}

const read =async (req,res)=>{
    let id = req.params.id;
    let qqq = await connection.query(`select id,subject,writer,content,hit from board where id = ${req.params.id}`,async function(err,results,field){
        console.log('-------hit--------',results[0].hit)
        let hit = parseInt(results[0].hit)+1;
        console.log('바꾼hit',hit)
        let aaa = await connection.query(`  UPDATE board  
                                            SET hit = '${hit}'                                                   
                                            where id = '${id}'`
                                            ,function(err){console.log(err)});
        res.render('./board/read.html',{
            subject:results[0].subject,
            writer:results[0].writer,
            content:results[0].content,
            id : req.params.id,
            })}
    )
}

const modify = async (req,res)=>{
    console.log('modify들어옴')
    id = req.params.id;
    let qqq = await connection.query(`select id,subject,writer,content from board where id = ${req.params.id}`,function(err,results,field){
        console.log(results)
        res.render('./board/write.html',{
            subject:results[0].subject,
            writer:results[0].writer,
            content:results[0].content,
            id : req.params.id,
            mode:1
        }
        )
    })
    
}

const modifyPost = async (req,res)=>{
    console.log('modifypost들어옴')
    console.log(req.params.id);
    let modify = await connection.query(
        `UPDATE board SET   subject = '${req.body.subject}',
                            writer='${req.body.writer}'
                            ,content='${req.body.content}' 
                        WHERE id = '${req.params.id}'`
    ,function(err,results){
        if(err)console.log(err);
        console.log('완료')
        res.redirect('/board')
        
    })
    
}

const deletefn = async (req,res)=>{
    let aaaa = await connection.query(
        `DELETE FROM board 
                        WHERE id = '${req.params.id}'`,function(err){
                            if(err)console.log(err);
                            res.redirect('/board')
                        })
}

module.exports = {list,write,writePost,read,modify,modifyPost,deletefn}