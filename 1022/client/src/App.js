import React, { useEffect, useReducer,useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import axios from 'axios';

import "./App.css";
const reducer = (state,action)=>{
  switch(action.type){
    case "INIT":{
      let {web3,Instance,account}=action;
      return{
        ...state,web3,Instance,account
      }
    }
  }
}

const INIT_ACTIONS = 
const App = ()=>{

    const initialState={
      web3:null,
      Instance:null,
      account:null,
    }

    const [state,dispatch] = useReducer(reducer,initialState);
    const [value,setValue] = useState(0);
    const [storage,setStorage] = useState(0);
    const [loadding,setLoadding]= useState(false);

  const handleResult = (log,web3)=>{
    const params = [
      {type:'string',name:'message'},
      {type:'uint256',name:'newVal'}
    ]
    const returnValues= web3.eth.abi.decodeLog(params,log.data)
    //decodeLog의 첫번째 인자값은 데이터 형식, 두번째는 log.data
    //
    setStorage(returnValues.newVal);
    setLoadding(prev=>!prev);

  }
  const handleChange=(e)=>{
    let val = e.target.value;
    setValue(val);
  }


  async function send (){
    const {account,Instance}=state;

  }
  const init=async()=>{
    const contract = require('@truffle/contract');//왜 사용하는거지?
    const web3 = await getWeb3();//무슨뜻인가

    const [account] = await web3.eth.getAccounts();
    let simpleStorage = contract(SimpleStorageContract);//무슨뜻인가?
    simpleStorage.setProvider(web3.currentProvider);//무슨뜻?

    const Instance = await simpleStorage.deployed();//배포함.
    dispatch(INIT_ACTIONS(web3,Instance,account));
    web3.eth.subscribe("logs",{address:Instance.address})//address는 contract의 address이고,subscribe는 도대체 무어엇을 뜻하는 건지?
    .on('data',log=>{
      handleResult(log,web3);
    })
    .on('error',err=>console.log(err))
  }
  useEffect(()=>{
    init();
  },[])

  return(
    <div>
      <input type = "text" value = {value} onChange={handleChange}/>
      <div>
        <button onClick={send}>일반 서명</button>
        <button onClick={sendAPI}>Server거치고 서명</button>
        <button onClick={snedTx}>Server에서 바로 서명</button>
      </div>
      <div>
        {loading?`loading`:storage}
      </div>
    </div>
  )
}

export default App;