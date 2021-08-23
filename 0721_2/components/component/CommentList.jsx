import React , {useContext} from 'react'
import CommentItem from './CommentItem'
import Store from './store/context'

const CommentList =()=>{
    const {state,dispatch}=useContext(Store)
    const list = state.commentItem
    console.log('list',list)
    const item = list.map((v,k)=>{
        return (
            <CommentItem 
                key={k}
                content={v.content}
                userid={v.userid}
                date = {v.date}
                index = {k}
            />
            )}
        
        )

    return (
        <>
            {item}
        </>
    )
}

export default CommentList