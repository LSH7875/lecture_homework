import React from 'react'

const reducer = (state,action)=>{
    switch(action.type){
        case "CREATE":
            console.log(action.payload)
            return{commentItem:[...state.commentItem,action.payload]}
            // case "DELETE":
            //     let newArr=[];
            //     for(let i=0; i<state.commentItem.length; i++){
            //         if(i !==action.payload.index) newArr.push(state.commentItem[i])
            //     }
            //     return {commentItem:newArr}
    
            // case "UPDATE":
            //     let content = action.payload.content;
            //     let index = action.payload.index;
            //     let commentItem = state.commentItem;
    
            //     commentItem[index].content = content
    
            //     return {commentItem}
                
        case "DELETE":
            let newArr =[];
            const {commentItem}={...state}
            const index= action.payload.index;
            for (let i=0; i<commentItem.length; i++){
                if(i!==action.payload.index) newArr.push(state.commentItem[i])
            }
            console.log(newArr);
            console.log('----------')
            console.log([newArr]);
            return{commentItem:newArr} 
        case "UPDATE":
            // const {commentItem}={...state};
            // const index= action.payload.index;           
            console.log('aaa',action.payload.content)
            commentItem[index].content = action.payload.content
            return{commentItem}
        default: return state
    }
}

export default reducer

