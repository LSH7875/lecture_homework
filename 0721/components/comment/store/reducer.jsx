import React from 'react'
import CommentItem from '../CommentItem'

//dispatch에서 바꿀 정보를 받아야 함=>action
//reducer는 결국 상태를 바꿔야하기 때문에 이전 상태값을 가져와야 함.
//결구구 얜 리턴을 해줘야함 >> 바뀐 state값
const reducer = (state,action) =>{
    switch(action.type){
   
        case "CREATE":
            return {...state,commentItem:[...state.commentItem,action.payload]}
        
        case "DELETE":
            let newArr=[];
            for(let i=0; i<state.commentItem.length; i++){
                if(i !==action.payload.index) newArr.push(state.commentItem[i])
            }
            return {commentItem:newArr}

        case "UPDATE":
            let content = action.payload.content;
            let index = action.payload.index;
            let commentItem = state.commentItem;

            commentItem[index].content = content

            return {commentItem}
        default:
            return state
    }
}


export default reducer//얘는 상태값 바꾸는게 목적임.