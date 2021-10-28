import Web3 from 'web3' 

const getWeb3 = async () =>{
    // const contract = require('@truffle/contract');
    let web3
    if(window.ethereum){
      web3 = new Web3(window.ethereum);
      try{
        await window.ethereum.enable();        
      }catch (error){
        console.log(`error ouccur ${error}`)
      }
    } else if(window.web3) { //legacy dapp browers..
      web3 = new Web3(Web3.curentProvider);
    } else {
      console.log('너 이더리움 없어 메타마스크라도 깔아라....')
    }
    
    return web3
}

export default getWeb3;