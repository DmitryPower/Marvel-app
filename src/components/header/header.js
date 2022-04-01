

import {Link, NavLink} from 'react-router-dom'
import './header.scss'


function Header() {

    return (
        <header className='Header'>
            <ul>
                <li><Link to = '/'><span>Marvel</span> information portal</Link></li>
                <li><NavLink end className={({ isActive }) => isActive ? " select" : ""}  to = '/' >Characters</NavLink> 
                 / 
                 <NavLink  className={({ isActive }) => isActive ? "select" : ""}  to = '/comics'
                 >Comics</NavLink></li>
            </ul>
        </header>
    )

}

export default Header