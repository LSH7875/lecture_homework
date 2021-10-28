
import 'bootstrap/dist/css/bootstrap.css';
import React,{useEffect,useReducer} from 'react';
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
        ...state,pot,
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
    case "GETBETEVENT":{
      let {records}=action;
      return{
        ...state,betRecords:records
      }
    }
    case "WINEVENT":{
      let {records} = action;
      return {
        ...state,winRecords:records,flag1:!state.flag1
      }
    }
    case "FAILEVENT":{
      let {records}=action;
      return{
        ...state,failRecords:records,flag2:!state.flag2
      }
    }
    case "FINALRECORD":{
      let {records}=action;
      return{
        ...state,finalRecords:records
      }
    }
  }
}



function App() {

  
  let lotteryAddress = '0x5eE960B277574C090212fA92fa7b19BBDc8B913A';
  let lotteryABI =[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "BET", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "DRAW", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "FAIL", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "REFUND", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "bettor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1" }, { "indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" } ], "name": "WIN", "type": "event" }, { "inputs": [], "name": "answerForTest", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPot", "outputs": [ { "internalType": "uint256", "name": "pot", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes1", "name": "challenges", "type": "bytes1" } ], "name": "betAndDistribute", "outputs": [ { "internalType": "bool", "name": "result", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "bytes1", "name": "challenges", "type": "bytes1" } ], "name": "bet", "outputs": [ { "internalType": "bool", "name": "result", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "distribute", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "answer", "type": "bytes32" } ], "name": "setAnswerForTest", "outputs": [ { "internalType": "bool", "name": "result", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes1", "name": "challenges", "type": "bytes1" }, { "internalType": "bytes32", "name": "answer", "type": "bytes32" } ], "name": "isMatch", "outputs": [ { "internalType": "enum Lottery.BettingResult", "name": "", "type": "uint8" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "getBetInfo", "outputs": [ { "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256" }, { "internalType": "address", "name": "bettor", "type": "address" }, { "internalType": "bytes1", "name": "challenges", "type": "bytes1" } ], "stateMutability": "view", "type": "function" } ];



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
    flag1:false,
    flag2:false,
  }
  const [state,dispatch]=useReducer(reducer,initialState);

  const bet = async()=>{
    let {challenges,web3,Instance,account}=state;
    let challenge = '0x'+challenges[0].toLowerCase()+challenges[1].toLowerCase();
    let nonce = await web3.eth.getTransactionCount(account[0]);
    Instance.methods.betAndDistribute(challenge).send({from:account[0], value:5000000000000000, gas:300000, nonce:nonce})
    .on('transactionHash',(hash)=>{
      console.log('HASH값 :',hash);//그냥 해시값 찾아봤다.
    });
  }

  const makeFinalRecords=()=>{
    let {web3}=state;
    console.log('makeFinal들어옴')
    //win이랑 Fail인 애들을 전부다 매칭시키는 것임
    let f=0, w=0;
    const records = [...state.betRecords];
    console.log('records다 ',records)
    for(let i=0; i<state.betRecords.length;i++){
      console.log("원래 인덱스");
      if(state.winRecords.length>0 && state.betRecords[i].index === state.winRecords[w].index){
        //이겼을때
        console.log('이긴거 들어옴')
        records[i].win = 'WIN';
        records[i].answer = records[i].challenges;
        records[i].pot = web3.utils.fromWei(state.winRecords[w].amount,'ether');
        if(state.winRecords.length-1>w){w++;}
      } else if(state.failRecords.length>0 && state.betRecords[i].index === state.failRecords[f].index){
        console.log("진짜 얜 왜 안되?")
        records[i].win = 'FAIL';
        records[i].answer = state.failRecords[f].answer;
        records[i].pot = 0;
        if(state.failRecords.length-1>f)f++;
      } else {
        records[i].answer = 'Not Revealed';
      }
    }
    console.log("FINAL",records);
    clearInterval();
    dispatch({type:"FINALRECORD",records})
  }


  const getBetEvents = async(Instance)=>{
    let records = [];
    let events = await Instance.getPastEvents('BET',{fromBlock:0, toBlock:'latest'});
    for(let i=0; i<events.length;i+=1){
      const record = {};
      record.index = parseInt(events[i].returnValues.index,10).toString();//hex값으로 오는 경우도 있기에 바꿔준다.
      record.bettor = events[i].returnValues.bettor.slice(0,4) + '...' + events[i].returnValues.bettor.slice(40,42);
      record.betBlockNumber = events[i].blockNumber;
      record.targetBlockNumber = events[i].returnValues.answerBlockNumber.toString();
      record.challenges = events[i].returnValues.challenges;
      record.win = 'Not Revealed';
      record.answer = '0x00';
      records.unshift(record);
    }
    console.log('getbetEvent',records);
    clearInterval();
    dispatch({type:"GETBETEVENT",records})
    //블록의 처음부터 끝까지 나온 BET을 가져와라
  }

  const getWinEvents = async(Instance)=>{
    let records = [];
    let events = await Instance.getPastEvents('WIN',{fromBlock:0, toBlock:'latest'});
    for(let i=0; i<events.length;i+=1){
      const record = {};
      record.index = parseInt(events[i].returnValues.index,10).toString();//hex값으로 오는 경우도 있기에 바꿔준다.
      record.amount = parseInt(events[i].returnValues.amount,10).toString();
      records.unshift(record);
    }
    console.log('winEvent',records);
    clearInterval();
    dispatch({type:"WINEVENT",records})
    //블록의 처음부터 끝까지 나온 BET을 가져와라
  }

  const getFailEvents = async(Instance)=>{
    let records = [];
    let events = await Instance.getPastEvents('FAIL',{fromBlock:0, toBlock:'latest'});
    for(let i=0; i<events.length;i+=1){
      const record = {};
      record.index = parseInt(events[i].returnValues.index,10).toString();//hex값으로 오는 경우도 있기에 바꿔준다.
      record.answer = events[i].returnValues.answer;
      records.unshift(record);
    }
    console.log('FailEvent',records);
    dispatch({type:"FAILEVENT",records})
    //블록의 처음부터 끝까지 나온 BET을 가져와라
  }
  

  async function dataPoll(web3,Instance){
    await getPot(web3,Instance);
    await getBetEvents(Instance);
    await getWinEvents(Instance);
    await getFailEvents(Instance);
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
   
    dispatch({ type: 'INIT', web3, account: accounts, Instance: lotteryContract })
    // await getPot();
    // await getPot();
    // await getPot();
    // await getBetEvents();
    let interval = setInterval(() => {
      dataPoll(web3,lotteryContract);
    }, 1000);
   



    // let interval = setInterval(() => {
    //   getPot(web3,lotteryContract);
    // }, 1000);
    // await getBetEvents(lotteryContract);
    // await getWinEvents(lotteryContract);
    // await getFailEvents(lotteryContract);
   
  }

  const onClickCard=(Character)=>{
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
    if(_Character === '0'){
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


    let pot = await Instance.methods.getPot().call();
    let potString = web3.utils.fromWei(pot.toString(),'ether');
    //eth단위로 변환시켜줌
    clearInterval()
    dispatch({type:"GETPOT",pot:potString});
  }

  const pollData = async()=>{
    await initWeb3(); 
    
  }

  useEffect(()=>{
    pollData(); 
  },[]);

  useEffect(()=>{
    makeFinalRecords();
  },[state.flag2])

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
          {getCard('0','dard bg-success')}
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
