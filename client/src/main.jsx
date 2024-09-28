import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {Toaster} from "react-hot-toast"
import App from './App.jsx'
import './index.css'


const Context = createContext({isAuthenticated:false})
const AppWrapper = ()=>{
  const[isAuthenticated , setIsAuthenticated]  = useState(false)
  const[user , setUser] = useState({})
  return(
    <Context.Provider value={{isAuthenticated , setIsAuthenticated , user , setUser }}>
       <App />
       <Toaster/>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AppWrapper/>
  </StrictMode>,
)
export default Context