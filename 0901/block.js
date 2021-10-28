const {MerkleTree} = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');
const merkle = require('merkle')
console.log(SHA256([{id:'abc'},{id:'ccc'}]).toString());
console.log(SHA256(['abc','ccc']).toString());
console.log('과연')
console.log(merkle('sha256').sync(['abc','ccc']).root());

const fs = require('fs')

function getVersion(){
    const packageVer = JSON.parse(fs.readFileSync('../package.json').toString('utf8')).version;
    return packageVer
}
console.log('packagever',getVersion())

console.log('timestamp',Date.now()/1000)
console.log('HashPrevBlock','0'.repeat(64));
console.log('index',0)
body=['hello'];
console.log('88888연속하는 값은******')
console.log(merkle('sha256').sync(body))
console.log(merkle('sha256').sync(body).root())
console.log(SHA256(body).toString())
console.log(new MerkleTree(['hello'].map(v=>SHA256(v)),SHA256).getRoot().toString('hex'));


///배열도 가능하다.