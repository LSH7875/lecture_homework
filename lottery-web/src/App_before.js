import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState,useReducer} from 'react';
import Web3 from 'web3' 


const reducer = (state,action)=>{
  switch(action.type){
    case "INIT":{
      let {web3,Instance,account}=action;
      return {
        ...state,web3,Instance,account,flag:true
      }
    }
    case "GETPOT": { 
      let {pot}= action;
      return {
        ...state,pot
      }
    }
    case "CLICKCARD":{
      let _Character = action.data;
      let {challenges} = action;
      console.log('clickcard',_Character);
      return {
        ...state,challenges:[challenges,_Character]
      }
    }
  }
}



function App() {

  
  let lotteryAddress = '0xAd134a738d3BB45a8D58844a68ED5e8bC1e802fb';
  let lotteryABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "BET", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "DRAW", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "FAIL", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "REFUND", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "WIN", "type": "event" }, { "inputs": [], "name": "answerForTest", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getPot", "outputs": [ { "internalType": "uint256", "name": "pot", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes1", "name": "challenges", "type": "bytes1" } ], "name": "betAndDistribute", "outputs": [ { "internalType": "bool", "name": "result", "type": "bool" } ], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [ { "internalType": "bytes1", "name": "challenges", "type": "bytes1" } ], "name": "bet", "outputs": [ { "internalType": "bool", "name": "result", "type": "bool" } ], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [], "name": "distribute", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "answer", "type": "bytes32" } ], "name": "setAnswerForTest", "outputs": [ { "internalType": "bool", "name": "result", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "internalType": "bytes32", "name": "answer", "type": "bytes32" } ], "name": "isMatch", "outputs": [ { "internalType": "enum Lottery.BettingResult", "name": "", "type": "uint8" } ], "stateMutability": "pure", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "getBetInfo", "outputs": [ { "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" }, { "internalType": "address", "name": "bettor", "type": "address" }, { "internalType": "bytes1", "name": "challenges", "type": "bytes1" } ], "stateMutability": "view", "type": "function", "constant": true } ];

  const initialState={
    betRecords:[],
    winRecords:[],
    failRecords:[],
    pot:'0',
    challenges:['A','B'],
    finalRecords:[{
      bettor:'어쩌구 저쩌구',
      index:'0',
      challenges:'ab',
      answer:'ab',
      targetBlockNumber:'10',
      pot:'0'
    }],
    Instance:null,
    account:null,
    web3:null,
    flag:false,
  }
  const [state,dispatch]=useReducer(reducer,initialState);

  const bet = async()=>{
    let {challenges,web3,Instance,account}=state;
    let challenge = '0x'+challenges[0].toLowerCase()+challenges[1].toLowerCase();
    let nonce = await web3.eth.getTransactionCount(account[0]);
    Instance.methods.betAndDistribute(challenge).send({from:account[0], value:5000000000000000, gas:300000, nonce:nonce})
    .on('transactyionHash',(hash)=>{
      console.log(hash);//그냥 해시값 찾아봤다.
    });
  }
  const getBetEvents = async()=>{
    let records = [];
    let {Instance} = state;
    let events = await Instance.getPastEvents('BET',{fromBlock:0, toBlock:'latest'});
    console.log('events',events);
    //블록의 처음부터 끝까지 나온 BET을 가져와라
  }
  
  const initWeb3 = async () =>{
    // const contract = require('@truffle/contract');
    let web3
    if(window.ethereum){

      web3 = new Web3(window.ethereum);
      console.log(web3)
      try{
        await window.ethereum.enable();        
      }catch (error){
        console.log(`error ouccur ${error}`)
      }
    } else if(window.web3) { //legacy dapp browers..
      //이게 실행이 됨
      web3 = new Web3(Web3.curentProvider);
      // console.log(await web3.eth.getAccounts());
    } else {
      console.log('너 이더리움 없어 메타마스크라도 깔아라....')
    }
    let accounts = await web3.eth.getAccounts();//여기서 왜 안되지?
    
    //스마트 컨트랙트 만들 때 가장 먼저 해야하는 것이 smart contract 객체를 만드는 일이다.
    let lotteryContract = new web3.eth.Contract(lotteryABI, lotteryAddress); // console.log('로테리컨트랙트',lotteryContract)
    
    // let pot = await lotteryContract.methods.getPot().call();
    // console.log('pot:',pot);

    let owner = await lotteryContract.methods.owner().call();
    console.log('owner:', owner);
   
    // dispatch({ type: 'INIT', web3, account: accounts, Instance: lotteryContract })
    // await getPot();
    // await getPot();
    // await getPot();
    // await getBetEvents();
    return web3
  }

  const onClickCard=(Character)=>{
    console.log('e');
    dispatch({type:"CLICKCARD",data:Character,challenges:state.challenges[1]})
  }
  

  const getCard = (_Character,_cardStyle)=>{
    let _card='';
    if(_Character === 'A'){
      _card = '🂡'
    }
    if(_Character === 'B'){
      _card = '🂱'
    }
    if(_Character === 'C'){
      _card = '🃁'
    }
    if(_Character === 'D'){
      _card = '🃑'
    }

    return (
      <button className={_cardStyle} onClick = {()=>{onClickCard(_Character)}}>
        <div className = "card-body text-center">
        <p className = "card-text"></p>
        <p className = "card-text text-center" style={{fontSize:300}}>{_card}</p>
        <p className = "card-text"></p>
        </div>
      </button>
    )
  }

  const getPot = async()=>{
    let {Instance,web3}=state;
    console.log('인스턴스와 아이들',Instance)
    let pot = await Instance.methods.getPot().call();
    console.log(pot);
    let potString = web3.utils.fromWei(pot.toString(),'ether');
    //eth단위로 변환시켜줌
    console.log('pot',potString);
    dispatch({type:"GETPOT",pot:potString});
  }

  const pollData = async()=>{
    await initWeb3(); 
    
  }

  useEffect(()=>{
    pollData(); 
  },[]);

  return (
    <div className="App">
      <div className = "container">
        <div className = "jumbotron">
          <h1>Current Pot : {state.pot}</h1>
          <p>Lottery</p>
          <p>Lottery tutorial</p>
          <p>Your Bet</p>
          <p>{state.challenges[0]} {state.challenges[1]}</p>
        </div>
      </div>

      {/*card section */}
      <div className = "container">
        <div className = "card-group">
          {getCard('A','dard bg-primary')}
          {getCard('B','dard bg-warning')}
          {getCard('C','dard bg-danger')}
          {getCard('D','dard bg-success')}
        </div>
      </div>
      <br/>
      <div className = "container">
        <button className = "btn btn-danger btn-lg" onClick={bet}>BET!</button>
      </div>
      <br/>
      <div className = "container">
        <table className = "table table-dark table-striped">
          <thead>
            <tr>
              <th>Index</th>
              <th>Address</th>
              <th>Challenge</th>
              <th>Answer</th>
              <th>Pot</th>
              <th>Status</th>
              <th>AnswerBlockNumber</th>
            </tr>
          </thead>
          <tbody>
            {
              state.finalRecords.map((record,index)=>{
                return(
                  <tr key = {index}>
                    <td>{record.index}</td>
                    <td>{record.bettor}</td>
                    <td>{record.challenges}</td>
                    <td>{record.answer}</td>
                    <td>{record.pot}</td>
                    <td>{record.win}</td>
                    <td>{record.targetBlockNumber}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default App;
