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
import Shift from './pages/Employee/Shift.jsx';
import ShiftCleaning from './pages/Employee/ShiftCleaning.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './pages/Product/Product.jsx';
import CourtMaintenance from './pages/Court/CourtMaintenance.jsx';
import ReceptionistForm from './pages/FormFolder/ReceptionistForm.jsx';
import Salary from './pages/Salary.jsx'
import Membership from './pages/Membership.jsx';

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
            <Route path='/formfolder/receptionist' element={<ReceptionistForm/>}/>
            <Route path='/employee/shift' element={<Shift/>}/>
            <Route path='/employee/shiftcleaning' element={<ShiftCleaning/>}/>
            <Route path='/customer' element={<Customer/>}/>
            <Route path='/customer/normal' element={<CustomerNormal/>}/>
            <Route path='/training-program' element={<Program/>}/>
            <Route path="/product-manage" element={<Product/>}/>
            <Route path='/salary' element={<Salary/>}/>
            <Route path='/membership' element={<Membership/>}/>
          </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
