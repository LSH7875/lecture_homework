const wsModuel = require('ws')

module.exports = function (_server){
    const wss = new wsModuel.Server({server:_server});
    wss.on('connection',function(ws,req){
        let ip = req.headers['x-forwarede-for'] || req.connection.remoteAddress;
        console.group(ip+"아이피의 클라이언트로부터 접속 요청이 있었습니다.")
        ws.on('message', function(message){
            console.log(ip,"로 부터 받은 메세지");
            ws.send("echo:"+message)
        })
        ws.on('error',function(){
            console.log(ip+"클라이언트와 연결중 오류 발생"+error)

        })
        ws.on('close',function(){
            console.log(ip+"클라이언트와 접속이 끊어졌습니다.")
        })
    })
}