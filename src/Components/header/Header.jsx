import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import './header.css'

export function Header() {
  return (
    <header>
      <div className='container'>
        <div>
          <NavLink to='/' end>
            <img className='img' src='/images/logo.png' alt='logo'/>
          </NavLink>
        </div>
        <Navbar/>
      </div>
    </header>
  )
}
