import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import './header.css'

export function Header() {
  return (
    <header>
      <div className='container'>
          <NavLink to='/' end>
            <img src='/public/images/DH.png' alt='logo'/>
          </NavLink>        
        <Navbar />
      </div>
    </header>
  )
}
