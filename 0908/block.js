const CryptoJs = require( 'crypto-js')
const merkle = require( 'merkle')
const fs = require( 'fs')

const GENERATE_BLOCK_INTERVAL=10;
const NUMBER_CHANGE_BLOCK_DIFFICULTY =10;


class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}
class Header{
    constructor(version,index,time,previousHash,merkleRoot,difficulty,nonce){
        this.version = version
        this.index = index
        this.time = time
        this.previousHash = previousHash
        this.merkleRoot = merkleRoot
        this.difficulty = difficulty
        this.nonce = nonce
    }
}

function createGenesisBlock(){
    const version="1.0.0"
    const index=0;
    const time = 111111
    const previousHash="0".repeat(64);
    const body=["data는 hello"]
    const merkleRoot = getMerkleRoot(body);
    const difficulty=0;
    const nonce=0;
    const header = new Header(version,index,time,previousHash,merkleRoot,difficulty,nonce)
    return new Block(header,body)
}



function getMerkleRoot(body){
    return merkle('sha256').sync(body).root()
}

Blocks=[createGenesisBlock()];

function getBlock(){
    return Blocks
}

function getLastBlock(){
    return Blocks[Blocks.length-1]
}

function nextBlock(data){
    const previousBlock = getLastBlock()
    const version = getVersion();
    const time = (new Date.now())/1000;
    const index = getPreIndex(previousBlock)+1;
    const body = data;
    const merkleRoot = getMerkleRoot(body);
    const previousHash = getPrevHash(previousBlock);
    const difficulty=getDifficulty(index-1)
    const nonce = getNonce(version,index,time,previousHash,merkleRoot,difficult)
    const header = new Header(version,index,time,previousHash,merkleRoot,difficulty,nonce)
    return new Block()
}

function getDifficulty(index){
    difficulty = blocks[blocks.length-1].header.difficulty
    if(index%GENERATE_BLOCK_INTERVAL===0&& index!==0){
        if(timeMinus()>GENERATE_BLOCK_INTERVAL*NUMBER_CHANGE_BLOCK_DIFFICULTY*2){
            return difficulty-1;
        }else if(timeMinus()<GENERATE_BLOCK_INTERVAL*NUMBER_CHANGE_BLOCK_DIFFICULTY/2){
            return difficulty+1;
        }else{
            return difficulty
        }
    }
}

function timeMinus(){
    return  blocks[blocks.length-1].header.time-blocks[blocks.length-GENERATE_BLOCK_INTERVAL].header.time
}
function getNonce(version,index,time,previousHash,merkleRoot,difficulty){
    let nonce = 0;
    while(true){
        if(blockCondition(version,index,time,previousHash,merkleRoot,difficulty,nonce)){
            return nonce;
        }
        nonce++;
    }
}

function blockCondition(version,index,time,previousHash,merkleRoot,difficulty,nonce){
    const blockString=version+index+time+previousHash+merkleRoot+difficulty+nonce;  
    const encrypString = CryptoJs.SHA256(blockString).toUpperCase();
    const BinaryString = hextoBinary(encrypString)
    if(BinaryString.startsWith("0".repeat(difficulty))){return true;}
    else {return false;}
}

function hextoBinary(encryptString){
    const binaryTxt =""; 
    for(i=0;i<encryptString.length;i++){
        binaryTxt += parseInt(encryptStirng[i],16).toString(2).padStart(4,'0');
    }
    return binaryTxt;
}

function getPrevHash(previousBlock){
    const {version,index,time,previousHash,merkleRoot,difficulty,nonce} = previousBlock.header;
    const string = version+index+time+previousHash+merkleRoot+difficulty+nonce;
    const encryptString =CryptoJs.SHA256(string).toUpperCase() ;
    return encryptString
}

function addBlock(data){
    block = nextBlock(data);
    ValidCurrnetBlock(block,getLastBlock());
    Blocks.push(data)
}

function ValidCurrentBlock(block,prev){
    if(ValidType(block)&&ValidIndex(block,prev)&&Validmarkle(block,prev)){
        return true
    }
    return false;

}

function ValidType(block){
    console.log(block.header.version)
    console.log(block.header.index)
    console.log(block.header.time)
    console.log(block.header.merkleRoot)
    console.log(block.header.previousHash)
    console.log(block.header.nonce)
    console.log(block.header.difficulty)
}

function wholeValidBlock(){

}

function getVersion(){
    const version = JSON.parse(fs.readFileSync('./package.json')).version
    return version
}
nextBlock()

function getPreIndex(previousBlock){
    const index = previousBlock.header.index;
    return index;
}