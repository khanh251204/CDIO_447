import { useState } from 'react'
import './App.css'
import {Header} from "./Component/Layouts/Header"
import {Footer} from "./Component/Layouts/Footer"
import { AppRouter } from './Routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <AppRouter />
        <Footer/>
      </div>
      
    </BrowserRouter>
  )
}

export default App
