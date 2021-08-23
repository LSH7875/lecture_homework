import React,{useContext,useState,useReducer} from 'react'
import Store from '../comment/store/context'

const CommentForm =()=>{

    const {dispatch,state} = useContext(Store);

    const [input,setInput] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch({type:"CREATE",payload:{userid : "web7722", content:input, date:"2021-07-21"}})
        setInput('');
    }

    const handleChange=(e)=>{
        const {value} = {...e.target}
        setInput(value)
    }
    return(
        <>
            <li className = "comment-form">
                <span className = "px_box">
                    <form onSubmit = {handleSubmit}>
                        <input 
                            type="text"
                            className="int"
                            placeholder="댓글을 입력해주세요"
                            onChange={handleChange}
                            value={input}
                        />
                        <button type = "submit" className = "btn"> 
                            등록
                        </button>    
                    </form>
                </span>
            </li>
        </>
    )
}

export default CommentForm

