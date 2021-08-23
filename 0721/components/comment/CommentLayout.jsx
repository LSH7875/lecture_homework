import React,{useContext,useReducer} from 'react'

import Store from './store/context'
import reducer from './store/reducer'


// import getComment from './api/api'
const CommentLayout = ({children}) =>{

    const globalStore = useContext(Store)//initialstate에 있는 상태값이 여기에 넣어진다. 
    console.log('constext vlaue:',globalStore)


    const [state,dispatch] = useReducer(reducer,globalStore)//globalStore은 여기서 reducer의 default값임. 
    //const [state,dispatch] = useReducer(reducer,useContext(Store))
    //const [state,dispatch] = useReducer(reducer, React.createContext(initialState))
    //const [state,dispatch] = useReducer(reducer, commentItem:[{userid :'web7722',content:'안녕하세요',date: '2021-07-01'}])
    
    React.useEffect(async()=>{
        console.log('최초실행')
        // getComment(dispatch)
        // const response = await fetch('http://localhost:3000/api')
        // .then(aa=>{
        //     return aa.json()
        // }).then(json=>{
        //     console.log(json)
        //     dispatch({type:'INIT',payload:json})
        // })
    },[])//class의 didmount랑 똑같음. 두번째 인자값이 빈배열이면 처음만 실행됨
    console.log('state value :',state)
    return(//안의 {}는 객체를 보낼꺼다, 
        <Store.Provider value = {{state,dispatch}}>
            <ul className = "comment">
                {children}
            </ul>
        </Store.Provider>
    )
}

export default CommentLayout