import React,{useContext,useReducer} from 'react'
import Store from './store/context'
import reduce from './store/reducer'

const CommentLayout =({children})=>{
    const globalStore = useContext(Store);
    const [state,dispatch]=useReducer(reduce,glabalStore)



    return (
        
            <Store.Provider value= {{state,dispatch}}>
            <ul className="comment">
                {children}
            </ul>
            </Store.Provider>
    
    )
}

export default CommentLayout
