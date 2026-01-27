import { useState } from 'react'
import './App.css'
import {Header} from "./Component/Layouts/Header"
import {Footer} from "./Component/Layouts/Footer"
import { AppRouter } from './Routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <AppRouter />
        <Footer/>

      </div>
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
