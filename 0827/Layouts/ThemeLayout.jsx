import React from 'react'
import Navigation from './Navigation'

const ThemeLayout =({children})=>{
    return (
        <>
            <Navigation/>
            {children}
        </>
    )
}

export default ThemeLayout