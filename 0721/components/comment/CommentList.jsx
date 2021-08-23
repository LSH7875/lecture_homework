import React,{useContext} from 'react'
import Store from './store/context'
import CommentItem from './CommentItem'

const CommentList =()=>{
    const {state,dispatch} = useContext(Store);
    const list = state.commentItem;
    const item = list.map((v,k)=>{
        return(
            <CommentItem
                    key ={k}
                    index = {k}
                    content = {v.content}
                    userid = {v.userid}
                    date = {v.date}
            />)
    })

    return(
        <li>
           {item}
        </li>
    )
}

export default CommentList