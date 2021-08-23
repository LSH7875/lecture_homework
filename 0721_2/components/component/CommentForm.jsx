import React, {useContext,useState} from 'react'
import Store from './store/context'


const CommentForm =()=>{

    const {state,dispatch}=useContext(Store)
    const [input, setInput] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch({type:"CREATE",payload:{userid:"web7722",content:input, date:"2021-07-21"}})
        setInput('')
    }

    const handleChange = (e)=>{
        const {value}={...e.target}
        setInput(value) 
    }

    return(
        <li>
            <form onSubmit = {handleSubmit}>
                <input 
                    type="text"
                    onChange={handleChange}
                    value = {input}   
                />
                <button type = "submit">
                    등록
                </button>
            </form>
        </li>
    )
}

export default CommentForm