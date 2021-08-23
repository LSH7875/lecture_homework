import React, {useContext,useState} from 'react';
import Store from './store/context'

const CommentForm =()=>{
    return(
        <li className = "comment-form">
            <form onSubmit = {handleSubmit}>
                <span className = "px_box">
                    <input 
                    />
                </span>
            </form>
        </li>
    )
}
export default CommentForm