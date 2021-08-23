import React from 'react'

const reduce=(state,action)=>{
    switch(action.type){
        case "CREATE":
            return{...state,commentItem:[action.payload]}
        case "DELETE":
            return{}
        case "UPDATE":
            return{}
    }
}

export default reduce