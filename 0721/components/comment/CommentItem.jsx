import React,{useState,useContext} from 'react'
import Store from './store/context'

const CommentItem =({index,content,userid,date})=>{

    const {state,dispatch} = useContext(Store);
    const [input,setInput] = useState('');

    const handleClick=(e)=>{
        setInput(content)
    }

    const handleDelete=(e)=>{
        dispatch({type:"DELETE",payload:{index}})
        setInput('')
    }

    const handleKeyDown=(e)=>{
        if(e.key =="Enter"){
            dispatch({
                type:"UPDATE",
                payload:{index,content:input}    
            })
            setInput('')
        }
    }

    const handleChange=(e)=>{
        const {value} = {...e.target}
        setInput(value)
    }

    return (
        <ul className = "comment-row">
            <li className = "comment-id">
                {userid}
            </li>
            <li className = "comment-content">
                <span onClick={handleClick}>
                    {input? 
                    <input
                        className="comment-update-input"
                        onChange={handleChange}
                        onKeyDown = {handleKeyDown}
                        value = {input}
                        type = "text"
                    />
                    :content}
                </span>
                <span 
                    className = "comment-delete-btn" onClick = {handleDelete}
                >
                    x
                </span>
            </li>
            <li className = "comment-date">
                {date}
            </li>
        </ul>

    )


}

export default CommentItem