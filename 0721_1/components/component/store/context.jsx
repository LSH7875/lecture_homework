import React,{createContext} from 'react'

const initialState = {CommentItem:[]}

const Store = createContext(initialState)

export default Store