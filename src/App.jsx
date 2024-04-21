import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Court from './pages/Court/Court.jsx';
import CourtRental from './pages/Court/CourtRental.jsx';
import CourtsManage from './pages/Court/CourtsManage.jsx';
import Staff from './pages/Employee/Staff.jsx';
import Program from './pages/Program/Program.jsx';
import Customer from './pages/Customer/Customer.jsx';
import CustomerNormal from './pages/Customer/CustomerNormal.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './pages/Product/Product.jsx';
import CourtMaintenance from './pages/Court/CourtMaintenance.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/court-manage' element={<Court/>}/>
            <Route path='/court-manage/add' element={<CourtRental/>}/>
            <Route path='/court-manage/edit' element={<CourtRental edit="true"/>}/>
            <Route path='/court-manage/court' element={<CourtsManage/>}/>
            <Route path='/court-manage/maintenance' element={<CourtMaintenance/>}/>
            <Route path='/employee' element={<Staff/>}/>
            <Route path='/customer' element={<Customer/>}/>
            <Route path='/customer/normal' element={<CustomerNormal/>}/>
            <Route path='/training-program' element={<Program/>}/>
            <Route path="/product-manage" element={<Product/>}/>
          </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
