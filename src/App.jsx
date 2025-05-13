import React from 'react'
import Layout from './Layout/Layout'
import './App.css'
import {Routes,Route} from 'react-router'
import Home from "./pages/home/Home"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  )
}

export default App
