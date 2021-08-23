import React, {useContext,useState} from 'react'
import Store from './store/context'

const CommentItem =({userid,content,index,date})=>{
    const {state,dispatch}=useContext(Store)
    const [input,setInput] = useState('')

    const handleChange=(e)=>{
        const {value} = {...e.target}
        setInput(value)
    }
    const handleClick=(e)=>{
        setInput(content)
    }
    const handleKeyDown=(e)=>{
        if(e.key=="Enter"){
            console.log('index',index)
            dispatch({type:"UPDATE",payload:{index,content:input}})
            setInput('')
        }
    }

    const handleDelete =()=>{
        dispatch({type:"DELETE",payload:{index}})
    }
    return(
        <ul>
            <li>{userid}</li>
            <li>
                <span onClick={handleClick}>
                    {input?
                    <input 
                        type="text"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    :content}
                </span>
                <span onClick={handleDelete}>
                    x
                </span>
            </li>
            <li>{date}</li>
        </ul>
    )
}
export default CommentItem