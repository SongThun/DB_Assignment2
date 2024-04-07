import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Court from './pages/Court'
import Login from './pages/Login'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Dashboard/></div>
  },
  {
    path: '/court',
    element: <div><Court/></div>
  },
  {
    path: '/login',
    element: <div><Login/></div>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
