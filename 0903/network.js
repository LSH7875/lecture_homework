const WebSocket = require('ws');
const PORT = process.env.PORT || 6005;
const peer =[];

function pushPeer(data){
    peer.push(data)
}
function Socketinit (){
    const server = new WebSocket.Server({port:PORT})
}
function write(){

}
function addPeer(peer){
    const server = WebSocket(peer)
}
function showPeer(){

}
module.exports={Socketinit,addPeer,showPeer}