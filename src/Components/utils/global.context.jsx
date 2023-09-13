import { createContext, useEffect,useReducer} from "react"
import { dentistsReducer, favReducer, themeReducer} from "./reducers"

export const ContextGlobal = createContext(undefined);

const initThemeState = () =>{
  const storedTheme = localStorage.getItem('theme')
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  :'ligth'
  const initialTheme = storedTheme || preferredTheme

  localStorage.setItem('theme',initialTheme)

  return {them: initialTheme}
}

const initDentistsState = {dentistsList: [], dentist: {}}

const  initFavState = JSON.parse(localStorage.getItem('favs')) || []

export const ContextProvider = ({ children }) => {

  // Cambio de estado
  const [themeState, themeDispatch] = useReducer(
    themeReducer,{},initThemeState
  )
    useEffect(()=>{
      const root = document.documentElement
      if (themeState.theme ==='light'){
        root.classList.remove('dark')
      }else{
        root.classList.add('dark')
      }
    },[themeState.theme])

  // Renderizar dentistas
    const[dentistsState, dentistsDispatch] = useReducer(
    dentistsReducer, initDentistsState
  )
  
    //llamamos a la api
  const fetchDentistsData = ()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then ((res)=>{res.json()})
    .then ((data)=>{
      dentistsDispatch({type:'GET-DENTISTS', payload: data})
    })
    .catch((error)=>{
      console.error('Hubo problema con la solicitud', error);
    })
  }

  useEffect(()=>{
    fetchDentistsData();
  },[])

  // Renderizamos los favoritos
  const[favState, favDispatch]=useReducer(favReducer,initFavState)

  useEffect(()=>{
    localStorage.setItem('fav',JSON.stringify(favState))
  },[favState])


  return (
    <ContextGlobal.Provider value={{dentistsState,dentistsDispatch,favState,favDispatch,themeState,themeDispatch}}>
      {children}
    </ContextGlobal.Provider>
  )
}
