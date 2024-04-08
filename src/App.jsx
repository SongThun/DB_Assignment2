import { useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashboard from './components/Pages/Dashboard.jsx'
import Login from './components/login/Login.jsx'
import Employee from './components/employee/employee.jsx'
import Facilitymanager from './components/facilitymanager/facilitymanager.jsx'
import Coach from './components/coach/coach.jsx'
import Receptionist from './components/receptionist/receptionist.jsx'
import Cleaningstaff from './components/cleaningstaff/cleaningstaff.jsx'
import logo from './assets/react.svg'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/login',
    element: <div><Login/></div>
  },
  {
    path:'/dashboard/employee',
    element: <div><Employee/></div>
  },
  {
    path:'/dashboard/employee/facility_manager',
    element: <div><Facilitymanager/></div>
  },
  {
    path:'/dashboard/employee/coach',
    element: <div><Coach/></div>
  },
  {
    path: '/dashboard/employee/receptionist',
    element: <div><Receptionist/></div>
  },
  {
    path: '/dashboard/employee/cleaning_staff',
    element: <div><Cleaningstaff/></div>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
