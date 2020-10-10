import React from 'react'
import './Header.css'
function Header() {
    return (
        <div className='header'>
           <img key={1} alt='title logo' className='logo' src={require('../Assets/logo.svg')}></img>
        </div>
    )
}

export default Header
