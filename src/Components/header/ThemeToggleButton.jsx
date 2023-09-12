import { useContext } from "react";
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { ContextGlobal } from "../utils/global.context";

const themes = ['ligth','dark']

const ThemeToggleButton = () => {
    const {themeState,themeDispatch}=useContext(ContextGlobal)
    const toggleTheme =()=>{
        themeDispatch({type:'TOGGLE-THEME'})
    }

  return (
    <div className='theme-switch'>
  {themes.map(t => {
    const checked = t === themeState.theme
    return (
      <div key={t}>
        <button
          className={`${checked ? 'bg-white' : ''}`}
          onClick={toggleTheme}
          aria-label='Toggle theme'
        >
          {t === 'light' ? <BsFillSunFill /> : <BsFillMoonFill />}
        </button>
      </div>
    )
  })}
</div>
  )
}

export default ThemeToggleButton
