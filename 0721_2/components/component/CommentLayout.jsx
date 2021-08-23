import React,{useContext, useReducer} from 'react'
import Store from './store/context'
import reducer from './store/reducer'

const CommentLayout =({children}) =>{
    const globalStore = useContext(Store)
    const [state,dispatch] = useReducer(reducer,globalStore)

    return(
        <Store.Provider value ={{state,dispatch}}>
            <ul className = "comment">
                {children}
            </ul>
        </Store.Provider>
    )
}

export default CommentLayout