const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')

function createGenesisBlock(){
    //header(version,time,index,prevhash,roothash),body
    const version = getVersion();
    const index = 0;
    const time = (Date.now());
    const previousHash = '0'.repeat(64);
    const body=['a','b','c']
    const rootHash = merkle('sha256').sync(body).root()
    const header = new BlockHeader(version,index,previousHash,time,rootHash)
    
    return new Block(header,body)
}

class BlockHeader{
    constructor(version,index, previousHash,timestamp,merkleRoot){
        this.version = version;
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.merkleRoot = merkleRoot;
    }
}

class Block{
    constructor(header,body){
        this.header = header;
        this.body = body;
    }
}

function getVersion(){
    const version=JSON.parse(fs.readFileSync('./package.json')).version
    return version
}

let Blocks = [createGenesisBlock()]



//getLastBlock : Blocks의 마지막 배열을 반환하는 함수
function getLastBlock(){
    return (Blocks[Blocks.length-1])
}


//addBlock : 검증과정을 거친 후 Blocks에 push 하는 함수
function addBlock(data){
//data 하기전에 체크해야 함
    const newBlock = nextBlock(data)
    if(verify(newBlock,getLastBlock())){

        Blocks.push(newBlock)
        return 0
    }
}

//두번째 블록부터 이것을 따라 만든다. 
function nextBlock(data){
    const version = getVersion();
    const index = (getLastBlock().header.index+1)
    const time = (Date.now());
    const previousHash = createpreviousHash()
    const body=data;
    const rootHash = merkle('sha256').sync(body).root()
    const header = new BlockHeader(version,index,previousHash,time,rootHash)
    
    return new Block(header,body)
}

function createpreviousHash(){
    const prev = getLastBlock();
    const {version, index,time,previousHash,rootHash}=prev.header;
    const preHeaderString=version+index+time+previousHash+rootHash
    const Hash = CryptoJs.SHA256(preHeaderString).toString()
    return Hash
}
//데이터가 맞는지 
function verify(newBlock,getLastBlock){
    //커런트 암호화, 인덱스, 타입, 예전 블록들도 
    if(!verifyType(newBlock)){
        console.log('data type error')
        return false;
    }

    if(!verifyIndex(newBlock,getLastBlock)){
        console.log(`index error`)
        return false;
    }
    
    if(!verifyCurrentMerkle(newBlock)){
        verifyType(newBlock)
        console.log(`currenthash error`)
        return false;
    }

    if(!verifyBody(newBlock)){
        console.log('empty body')
        return false
    }
    // if(VerifyWhole(newBlock)){
    //     return false;
    // };
    return true;
}


//type이 제대로 되어있는지 확인하기 위해서 만드는 function 
function verifyType(newBlock){
    if((typeof newBlock.body)==="object" &&
    (typeof newBlock.header.index) ==="number" &&
    (typeof newBlock.header.version) ==="string" &&
    (typeof newBlock.header.previousHash) ==="string" &&
    (typeof newBlock.header.timestamp) ==="number" &&
    (typeof newBlock.header.merkleRoot) ==="string"){
        return true;
    }
    return false;
}

//인덱스 순서가 맞는지 확인하는 함수
function verifyIndex(newBlock,LastBlock){
    if(newBlock.header.index ===(LastBlock.header.index+1)){
        return true;
    }
    return false;
}

//현재 데이터의 merkleroot가 제대로 되어있는지 확인하기 위한 작업
function verifyCurrentMerkle(newBlock){
    if (newBlock.header.merkleRoot === merkle('sha256').sync(newBlock.body).root()){
        console.log('합격임')
        return true;
    }
    return false;
}


//body의 내용이 하나도 없으면 오류가 생기게 하는 function
function verifyBody(newBlock){
    if(newBlock.body.length ===0){
        return false;
    }
    return true;
}


//전체적인 배열이 잘 되어있는가를 검증하는 system
function VerifyWhole(newBlock){
//genesis 블럭이 같은지 검증해본다.
//그 후의 모든 블럭이 같은지 점검해본다. 
//한번 물어보도록 하자!!!!!

    return true;
}

addBlock(['hello']);

addBlock(['nice to meet you'])

addBlock([`what's up`])


