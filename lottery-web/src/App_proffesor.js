import './App.css';
import lotteryStorageContract from './Lottery.json'

import React,{useEffect,useState,useReducer} from 'react';
import getWeb3 from './getWeb3'

const reducer = (state,action)=>{
  switch(action.type){
    case "INIT":{
      let {web3,Instance,accounts}=action;
      return {
        ...state,web3,Instance,accounts
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
  const [state,dispatch] = useReducer(reducer,initialState);

  const bet = async()=>{
    let {challenges,web3,Instance,accounts}=state;
    let challenge = '0x'+challenges[0].toLowerCase()+challenges[1].toLowerCase();
    let nonce = await web3.eth.getTransactionCount(accounts);
    console.log('Instance : ',Instance);
    await Instance.betAndDistribute(challenge).send({from:accounts,value:5000000000000000, gas:300000, nonce:nonce})
    // .on('transactyionHash',(hash)=>{
    //   console.log(hash);//그냥 해시값 찾아봤다.
    // });
  }
  const getBetEvents = async()=>{
    let records = [];
    let {Instance} = state;
    let events = await Instance.getPastEvents('BET',{fromBlock:0, toBlock:'latest'});
    console.log('events',events);
    //블록의 처음부터 끝까지 나온 BET을 가져와라
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

  const getPot = async(web3,Instance)=>{
    
    if (web3 != undefined && Instance != undefined) {
      console.log(`성공`,Instance)
      let pot = await Instance.getPot()
      // let potString = web3.utils.fromWei(pot.toString(),'ether')
      // clearInterval()
      // dispatch({ type:'GETPOT',pot:potString })
    } else {
      console.log(`실패`)
    }
    // console.log(`value : `,web3,Instance)

    // 
    // let pot = await Instance.getPot().call();
    
    // let potString = web3.utils.fromWei(pot.toString(),'ether');
    // //eth단위로 변환시켜줌
    // console.log('pot',potString);
    // dispatch({type:"GETPOT",pot:potString});
  }

  const pollData = async ()=>{
    let {web3, Instance, accounts} = state

  }

  const init = async () => {
    const contract = require('@truffle/contract')
    //얘가 abi랑 address를 뽑아서 instance를 만들어준다.
    //함수를 호출할때 methods를 생략하게 해준다.ㅣ 
    let web3 = await getWeb3()
    let [accounts] = await web3.eth.getAccounts();
    console.log('account in init: ',accounts);
    let lotteryContract = contract(lotteryStorageContract)
    lotteryContract.setProvider(web3.currentProvider)

    const Instance = await lotteryContract.deployed()
    //배포된 걸 가져와라!!!!!

    // let lotteryContract = new web3.eth.Contract(lotteryABI, lotteryAddress); 

    let actions = {
      type:'INIT',
      accounts,
      web3,
      Instance
    }

    dispatch(actions)
    let interval = setInterval(() => {
      getPot(web3,Instance)  
    }, 100000);
  }

  useEffect(()=>{
    init(); 
    // pollData()
    // getPot()
    // if (state.web3 != undefined && state.Instance != undefined ) {
      
    // }
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
