import { useState } from 'react'
import './App.css'
import {Header} from "./Component/Layouts/Header"
import { AppRouter } from './Routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <AppRouter />
      </div>
      
    </BrowserRouter>
  )
}

export default App
