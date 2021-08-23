import React from 'react'


const initialState = {
    commentItem:[],
    loadding:false,
    error:null
}
const Store = React.createContext(initialState)//이게 있어야지 context가 실행됨
//default값 입력 가능함.

export default Store