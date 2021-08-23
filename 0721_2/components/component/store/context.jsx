import React ,  {createContext} from 'react'

const initialState = {commentItem:[]}

const Store = createContext(initialState);

export default Store